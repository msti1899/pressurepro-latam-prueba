import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'info@pressurepro-latam.com';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, company, phone, email, message, subject: formType } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Faltan campos requeridos.' });
  }

  const typeLabels = { quote: 'Solicitud de Cotización', demo: 'Solicitud de Demo', contact: 'Contacto general' };
  const typeLabel = typeLabels[formType] || 'Contacto general';
  const accentColor = formType === 'demo' ? '#0077b9' : '#005f94';

  try {
    await resend.emails.send({
      from: 'Formulario Web <onboarding@resend.dev>',
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `[${typeLabel}] ${name}${company ? ` — ${company}` : ''}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:32px;border-radius:8px;">
          <p style="display:inline-block;background:${accentColor};color:#fff;font-size:11px;font-weight:bold;padding:4px 10px;border-radius:20px;margin-bottom:16px;letter-spacing:0.05em;">${typeLabel.toUpperCase()}</p>
          <h2 style="color:#005f94;margin-bottom:24px;">Nuevo mensaje de contacto</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#555;font-weight:bold;width:130px;">Nombre</td><td style="padding:8px 0;color:#111;">${name}</td></tr>
            ${company ? `<tr><td style="padding:8px 0;color:#555;font-weight:bold;">Empresa</td><td style="padding:8px 0;color:#111;">${company}</td></tr>` : ''}
            ${phone ? `<tr><td style="padding:8px 0;color:#555;font-weight:bold;">Teléfono</td><td style="padding:8px 0;color:#111;">${phone}</td></tr>` : ''}
            <tr><td style="padding:8px 0;color:#555;font-weight:bold;">Email</td><td style="padding:8px 0;color:#111;"><a href="mailto:${email}" style="color:#005f94;">${email}</a></td></tr>
          </table>
          <hr style="margin:24px 0;border:none;border-top:1px solid #e0e0e0;" />
          <h3 style="color:#333;margin-bottom:12px;">Mensaje</h3>
          <p style="color:#444;line-height:1.6;white-space:pre-wrap;">${message}</p>
          <hr style="margin:24px 0;border:none;border-top:1px solid #e0e0e0;" />
          <p style="color:#aaa;font-size:12px;">Enviado desde el formulario de contacto de pressurepro-latam.com</p>
        </div>
      `,
    });

    return res.status(200).json({ message: 'ok' });
  } catch (err) {
    console.error('[contact] Resend error:', err);
    return res.status(500).json({ message: 'Error al enviar el email.' });
  }
}

