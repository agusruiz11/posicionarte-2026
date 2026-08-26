import { Resend } from 'resend';
import { esc, fila, bloqueAtribucion, pareceBot } from '@/lib/lead-email';
import { CONTACTO } from '@/data/marca';

// Instanciación diferida: si se crea el cliente a nivel de módulo, `next build`
// lo evalúa durante "Collecting page data" y falla con "Missing API key" en
// cualquier entorno sin RESEND_API_KEY (clone limpio, CI, preview de rama).
let resend;
function getResend() {
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return Response.json({ error: 'Todos los campos son requeridos.' }, { status: 400 });
    }

    // A los bots se les responde OK para no darles señal de que fallaron, pero
    // no se manda nada.
    if (pareceBot(body)) return Response.json({ ok: true });

    await getResend().emails.send({
      from: `Contacto Web <${CONTACTO.emailRemitente}>`,
      to: process.env.LEAD_EMAIL.split(',').map((e) => e.trim()),
      replyTo: String(email).slice(0, 320),
      subject: `Nuevo mensaje de contacto: ${String(name).slice(0, 80)}`,
      html: `
        <h2 style="font-family:sans-serif;color:#3256D7;margin-bottom:16px">
          Nuevo mensaje de contacto
        </h2>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;max-width:480px">
          ${fila('Nombre', name)}
          ${fila('Email', email)}
          ${fila('Mensaje', message, { pre: true })}
          ${fila('Formulario', body.form_id || 'contacto')}
        </table>
        ${bloqueAtribucion(body)}
        <p style="font-family:sans-serif;font-size:12px;color:#999;margin-top:24px">
          Enviado desde posicionarte.online${body.landing_page ? esc(body.landing_page, 120) : ''}
        </p>
      `,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error('[/api/contact]', err);
    return Response.json({ error: 'Error al procesar la solicitud.' }, { status: 500 });
  }
}
