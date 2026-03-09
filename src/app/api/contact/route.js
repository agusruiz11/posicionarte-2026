import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return Response.json({ error: 'Todos los campos son requeridos.' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'Contacto Web <contacto@posicionarte.online>',
      to: process.env.LEAD_EMAIL.split(',').map((e) => e.trim()),
      subject: `Nuevo mensaje de contacto: ${name}`,
      html: `
        <h2 style="font-family:sans-serif;color:#3256D7;margin-bottom:16px">
          Nuevo mensaje de contacto
        </h2>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;max-width:480px">
          <tr>
            <td style="padding:10px 12px;font-weight:600;color:#555;background:#f9f9f9;width:30%">Nombre</td>
            <td style="padding:10px 12px">${name}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px;font-weight:600;color:#555;background:#f9f9f9">Email</td>
            <td style="padding:10px 12px"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding:10px 12px;font-weight:600;color:#555;background:#f9f9f9">Mensaje</td>
            <td style="padding:10px 12px;white-space:pre-wrap">${message}</td>
          </tr>
        </table>
        <p style="font-family:sans-serif;font-size:12px;color:#999;margin-top:24px">
          Enviado desde posicionarte.online
        </p>
      `,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error('[/api/contact]', err);
    return Response.json({ error: 'Error al procesar la solicitud.' }, { status: 500 });
  }
}
