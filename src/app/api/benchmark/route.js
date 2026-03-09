import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    await resend.emails.send({
      from: 'Benchmark Inmobiliario <benchmark@posicionarte.online>',
      to: process.env.LEAD_EMAIL.split(',').map((e) => e.trim()),
      subject: `Nuevo lead benchmark: ${name} — ${company}`,
      html: `
        <h2 style="font-family:sans-serif;color:#3256D7;margin-bottom:16px">
          Nuevo lead — Benchmark Inmobiliario 2025
        </h2>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;max-width:480px">
          <tr>
            <td style="padding:10px 12px;font-weight:600;color:#555;background:#f9f9f9;width:40%">Nombre</td>
            <td style="padding:10px 12px">${name}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px;font-weight:600;color:#555;background:#f9f9f9">Inmobiliaria</td>
            <td style="padding:10px 12px">${company}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px;font-weight:600;color:#555;background:#f9f9f9">Email</td>
            <td style="padding:10px 12px"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding:10px 12px;font-weight:600;color:#555;background:#f9f9f9">Teléfono</td>
            <td style="padding:10px 12px">${phone || '—'}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px;font-weight:600;color:#555;background:#f9f9f9">Inversión digital</td>
            <td style="padding:10px 12px">${INVERSION_LABELS[inversion] || inversion || '—'}</td>
          </tr>
        </table>
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
