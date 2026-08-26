import { Resend } from 'resend';
import { BENCHMARK } from '@/data/benchmark';
import { fila, bloqueAtribucion, pareceBot } from '@/lib/lead-email';
import { CONTACTO } from '@/data/marca';

// Instanciación diferida: si se crea el cliente a nivel de módulo, `next build`
// lo evalúa durante "Collecting page data" y falla con "Missing API key" en
// cualquier entorno sin RESEND_API_KEY (clone limpio, CI, preview de rama).
let resend;
function getResend() {
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
}

const INVERSION_LABELS = {
  si_menos_500: 'Sí, menos de 500 USD',
  si_500_1000:  'Sí, entre 500 y 1.000 USD',
  si_mas_1000:  'Sí, más de 1.000 USD',
  no:           'No, nada',
  no_contesta:  'Prefiero no contestar',
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, inversion } = body;

    if (!name || !email || !company) {
      return Response.json({ error: 'Nombre, inmobiliaria y email son requeridos.' }, { status: 400 });
    }

    // A los bots se les responde OK para no darles señal de que fallaron, pero
    // no se manda nada.
    if (pareceBot(body)) return Response.json({ ok: true });

    await getResend().emails.send({
      from: `${BENCHMARK.titulo} <benchmark@posicionarte.online>`,
      to: process.env.LEAD_EMAIL.split(',').map((e) => e.trim()),
      replyTo: String(email).slice(0, 320),
      subject: `Nuevo lead benchmark: ${String(name).slice(0, 60)} — ${String(company).slice(0, 60)}`,
      html: `
        <h2 style="font-family:sans-serif;color:#3256D7;margin-bottom:16px">
          Nuevo lead — ${BENCHMARK.tituloCompleto}
        </h2>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;max-width:480px">
          ${fila('Nombre', name)}
          ${fila('Inmobiliaria', company)}
          ${fila('Email', email)}
          ${fila('Teléfono', phone)}
          ${fila('Inversión digital', INVERSION_LABELS[inversion] || inversion)}
        </table>
        ${bloqueAtribucion(body)}
        <p style="font-family:sans-serif;font-size:12px;color:#999;margin-top:24px">
          Enviado desde posicionarte.online/inmobiliarias
        </p>
      `,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error('[/api/benchmark]', err);
    return Response.json({ error: 'Error al procesar la solicitud.' }, { status: 500 });
  }
}
