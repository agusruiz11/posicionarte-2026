/**
 * Procesamiento de un lead. Lo comparten `/api/lead` y los dos endpoints
 * viejos, que quedaron como alias.
 *
 * Orden de importancia, y por qué importa el orden:
 *
 *   1. **El mail al equipo.** Es lo único que no puede fallar: si falla, el
 *      lead se perdió. Si esto rompe, el endpoint devuelve error y la persona
 *      ve que algo salió mal y puede reintentar.
 *   2. **La fila en la base.** Da historial y permite medir. Si falla, se
 *      registra en el log y se sigue: el lead ya está en el mail.
 *   3. **El alta en la audiencia.** Lo más prescindible. Nunca corta nada.
 *
 * Un fallo en 2 o 3 no le devuelve error a la persona. Mostrarle "hubo un
 * problema" a alguien cuyo mensaje sí llegó lo empuja a mandar el formulario
 * tres veces más, o a irse.
 */

import { Resend } from 'resend';
import { esc, fila, bloqueAtribucion, pareceBot } from '@/lib/lead-email';
import { FORMULARIOS, CAMPOS, etiquetaDe } from '@/data/formularios';
import { CONTACTO } from '@/data/marca';
import { consumir, ipDe } from '@/lib/rate-limit';
import { guardarLead } from '@/lib/crm';
import { sumarAAudiencia } from '@/lib/newsletter';

// Instanciación diferida: si se crea el cliente a nivel de módulo, `next build`
// lo evalúa durante "Collecting page data" y falla con "Missing API key" en
// cualquier entorno sin RESEND_API_KEY (clone limpio, CI, preview de rama).
let resend;
function getResend() {
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
}

const CLAVES_ATRIBUCION = [
  'gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid', 'ttclid',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'referrer', 'landing_page', 'ts',
  'first_touch_source', 'first_touch_campaign', 'first_touch_ts', 'dispositivo',
];

const RE_EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Valida contra `FORMULARIOS`, no contra lo que diga el cliente.
 * @returns {{ ok: true, datos: object } | { ok: false, error: string }}
 */
function validar(body) {
  const config = FORMULARIOS[body.form_id];
  if (!config) return { ok: false, error: 'Formulario desconocido.' };

  const permitidos = [...config.base, ...config.extra];
  const datos = {};

  for (const campo of permitidos) {
    const bruto = body[campo];
    if (bruto === undefined || bruto === null) continue;
    const valor = String(bruto).trim().slice(0, CAMPOS[campo].maximo);
    if (valor) datos[campo] = valor;
  }

  for (const campo of config.requeridos) {
    if (!datos[campo]) {
      return { ok: false, error: `Falta completar: ${CAMPOS[campo].etiqueta}.` };
    }
  }

  if (!RE_EMAIL.test(datos.email)) {
    return { ok: false, error: 'El email no parece válido.' };
  }

  // Los campos de opciones solo aceptan valores del catálogo. Sin esto, un POST
  // a mano mete texto arbitrario en el CRM.
  for (const campo of permitidos) {
    const def = CAMPOS[campo];
    if (def.opciones && datos[campo] && !def.opciones.some((o) => o.valor === datos[campo])) {
      return { ok: false, error: `Valor inválido en ${def.etiqueta}.` };
    }
  }

  return { ok: true, datos, config };
}

function atribucionDe(body) {
  const out = {};
  for (const k of CLAVES_ATRIBUCION) {
    if (body[k]) out[k] = String(body[k]).slice(0, 300);
  }
  return out;
}

function cuerpoDelMail({ datos, config, atribucion, body }) {
  const filas = [...config.base, ...config.extra]
    .filter((campo) => datos[campo])
    .map((campo) =>
      fila(CAMPOS[campo].etiqueta, etiquetaDe(campo, datos[campo]), {
        pre: CAMPOS[campo].tipo === 'textarea',
      }),
    )
    .join('');

  return `
    <h2 style="font-family:sans-serif;color:#3256D7;margin-bottom:4px">Nuevo lead</h2>
    <p style="font-family:sans-serif;font-size:13px;color:#777;margin:0 0 16px">
      Entró por el ${esc(config.origen, 60)}.
    </p>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;max-width:520px">
      ${filas}
    </table>
    ${bloqueAtribucion(atribucion)}
    <p style="font-family:sans-serif;font-size:12px;color:#999;margin-top:24px">
      posicionarte.online${body.page_path ? esc(body.page_path, 120) : ''}
    </p>
  `;
}

/**
 * @param {Request} request
 * @param {string} [formIdForzado] para los endpoints viejos, que no lo mandan
 */
export async function procesarLead(request, formIdForzado) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Pedido mal formado.' }, { status: 400 });
  }

  if (formIdForzado) body.form_id = formIdForzado;

  // Al bot se le responde 200 sin mandar nada: un 400 le confirma que el
  // honeypot existe y le sirve para calibrar el próximo intento.
  if (pareceBot(body)) return Response.json({ ok: true });

  const limite = consumir(ipDe(request));
  if (!limite.permitido) {
    return Response.json(
      {
        error: `Recibimos varios envíos desde tu conexión. Probá de nuevo en ${Math.ceil(
          limite.esperarSegundos / 60,
        )} minutos, o escribinos por WhatsApp.`,
      },
      { status: 429, headers: { 'Retry-After': String(limite.esperarSegundos) } },
    );
  }

  const v = validar(body);
  if (!v.ok) return Response.json({ error: v.error }, { status: 400 });

  const { datos, config } = v;
  const atribucion = atribucionDe(body);

  // 1 — el mail. Si esto falla, falla todo.
  try {
    await getResend().emails.send({
      from: `Leads Posicionarte <${CONTACTO.emailRemitente}>`,
      to: (process.env.LEAD_EMAIL || CONTACTO.email).split(',').map((e) => e.trim()),
      replyTo: datos.email,
      subject: `Nuevo lead (${config.id}): ${datos.name.slice(0, 60)}${
        datos.company ? ` — ${datos.company.slice(0, 60)}` : ''
      }`,
      html: cuerpoDelMail({ datos, config, atribucion, body }),
    });
  } catch (err) {
    console.error('[lead] falló el mail', err);
    return Response.json({ error: 'No pudimos enviar tu mensaje. Probá de nuevo.' }, { status: 500 });
  }

  // 2 — la base. Best effort.
  const guardado = await guardarLead({
    formId: config.id,
    name: datos.name,
    email: datos.email,
    phone: datos.phone,
    company: datos.company,
    message: datos.message,
    serviceInterest: datos.serviceInterest,
    investmentRange: datos.investmentRange,
    budget: datos.budget,
    objective: datos.objective,
    attribution: atribucion,
    pagePath: body.page_path,
    userAgent: request.headers.get('user-agent'),
  });
  if (!guardado.ok && guardado.error !== 'sin configurar') {
    console.error('[lead] no se guardó en el CRM:', guardado.error);
  }

  // 3 — la audiencia, solo si lo pidió explícitamente.
  if (config.newsletter && body.acepta_novedades === true) {
    const alta = await sumarAAudiencia(datos);
    if (!alta.ok && alta.error !== 'sin configurar') {
      console.error('[lead] no se sumó a la audiencia:', alta.error);
    }
  }

  return Response.json({ ok: true });
}
