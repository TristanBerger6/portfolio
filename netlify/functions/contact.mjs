// Contact form handler: receives the form as JSON and emails it through Resend.
// Required Netlify environment variables:
//   RESEND_API_KEY  - API key from https://resend.com/api-keys
//   CONTACT_TO      - inbox that receives the messages
//   CONTACT_FROM    - sender on a domain verified in Resend,
//                     e.g. "Portfolio <contact@tristan-berger.com>"

const MAX = { name: 100, email: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
  );

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'Method not allowed' });

  let data;
  try {
    data = await req.json();
  } catch {
    return json(400, { error: 'Invalid JSON' });
  }

  // Honeypot: real visitors never see or fill this field.
  if (data.website) return json(200, { ok: true });

  const name = String(data.name ?? '').trim();
  const email = String(data.email ?? '').trim();
  const message = String(data.message ?? '').trim();

  if (!name || !email || !message) return json(400, { error: 'Missing fields' });
  if (!EMAIL_RE.test(email)) return json(400, { error: 'Invalid email' });
  if (name.length > MAX.name || email.length > MAX.email || message.length > MAX.message) {
    return json(400, { error: 'Field too long' });
  }

  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO || !CONTACT_FROM) {
    console.error('Contact form is not configured: missing environment variables');
    return json(500, { error: 'Not configured' });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      reply_to: email,
      subject: `Portfolio message from ${name.replace(/[\r\n]+/g, ' ')}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html:
        `<p><strong>Name:</strong> ${escapeHtml(name)}<br>` +
        `<strong>Email:</strong> ${escapeHtml(email)}</p>` +
        `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    }),
  });

  if (!res.ok) {
    console.error('Resend error', res.status, await res.text());
    return json(502, { error: 'Email could not be sent' });
  }

  return json(200, { ok: true });
};

export const config = { path: '/api/contact' };
