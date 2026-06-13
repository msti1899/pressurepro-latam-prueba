import { Resend } from 'resend';
import { LRUCache } from 'lru-cache';

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'info@pressurepro-latam.com';

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60 * 1000;

const rateCache = new LRUCache({
  max: 1000,
  ttl: RATE_LIMIT_WINDOW,
});

function getClientIP(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers['x-real-ip'] || req.socket.remoteAddress || 'unknown';
}

function escapeHtml(str) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;' };
  return String(str).replace(/[&<>"']/g, (c) => map[c]);
}

function safeSubject(str) {
  return String(str).replace(/\r?\n/g, ' ').trim();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const ip = getClientIP(req);
  const count = (rateCache.get(ip) || 0) + 1;
  rateCache.set(ip, count);

  if (count > RATE_LIMIT_MAX) {
    return res.status(429).json({ message: 'Demasiados intentos. Intenta de nuevo en un minuto.' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ message: 'RESEND_API_KEY no configurado.' });
  }

  const { name, company, phone, email, message, subject: formType } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Faltan campos requeridos.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return res.status(400).json({ message: 'Email no válido.' });
  }

  const safeName = escapeHtml(name);
  const safeCompany = company ? escapeHtml(company) : null;
  const safePhone = phone ? escapeHtml(phone) : null;
  const safeMessage = escapeHtml(message);
  const safeEmail = escapeHtml(email);

  const typeLabels = { quote: 'Solicitud de Cotización', demo: 'Solicitud de Demo', contact: 'Contacto general' };
  const typeLabel = typeLabels[formType] || 'Contacto general';
  const accentColor = formType === 'demo' ? '#0077b9' : '#005f94';

  try {
    const { data, error } = await resend.emails.send({
      from: 'Formulario Web <formulario@pressurepro-latam.com>',
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `[${typeLabel}] ${safeSubject(name)}${company ? ` — ${safeSubject(company)}` : ''}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:32px;border-radius:8px;">
          <p style="display:inline-block;background:${accentColor};color:#fff;font-size:11px;font-weight:bold;padding:4px 10px;border-radius:20px;margin-bottom:16px;letter-spacing:0.05em;">${typeLabel.toUpperCase()}</p>
          <h2 style="color:#005f94;margin-bottom:24px;">Nuevo mensaje de contacto</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#555;font-weight:bold;width:130px;">Nombre</td><td style="padding:8px 0;color:#111;">${safeName}</td></tr>
            ${safeCompany ? `<tr><td style="padding:8px 0;color:#555;font-weight:bold;">Empresa</td><td style="padding:8px 0;color:#111;">${safeCompany}</td></tr>` : ''}
            ${safePhone ? `<tr><td style="padding:8px 0;color:#555;font-weight:bold;">Teléfono</td><td style="padding:8px 0;color:#111;">${safePhone}</td></tr>` : ''}
            <tr><td style="padding:8px 0;color:#555;font-weight:bold;">Email</td><td style="padding:8px 0;color:#111;"><a href="mailto:${safeEmail}" style="color:#005f94;">${safeEmail}</a></td></tr>
          </table>
          <hr style="margin:24px 0;border:none;border-top:1px solid #e0e0e0;" />
          <h3 style="color:#333;margin-bottom:12px;">Mensaje</h3>
          <p style="color:#444;line-height:1.6;white-space:pre-wrap;">${safeMessage}</p>
          <hr style="margin:24px 0;border:none;border-top:1px solid #e0e0e0;" />
          <p style="color:#aaa;font-size:12px;">Enviado desde el formulario de contacto de pressurepro-latam.com</p>
        </div>
      `,
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      return res.status(500).json({ message: error.message || 'Error de Resend.' });
    }

    return res.status(200).json({ message: 'ok' });
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return res.status(500).json({ message: err.message || 'Error al enviar el email.' });
  }
}

