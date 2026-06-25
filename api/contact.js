const contactRecipient = process.env.CONTACT_RECIPIENT_EMAIL || 'contact@logic-web.net';
const formSubmitEndpoint = process.env.CONTACT_WEBHOOK_URL || `https://formsubmit.co/ajax/${encodeURIComponent(contactRecipient)}`;
const rateLimits = new Map();

function cleanText(value, maxLength = 1000) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function validate(payload) {
  const clean = {
    name: cleanText(payload.name, 120),
    company: cleanText(payload.company, 160),
    email: cleanText(payload.email, 160).toLowerCase(),
    phone: cleanText(payload.phone, 40),
    projectType: cleanText(payload.projectType || payload.project_type, 120),
    budget: cleanText(payload.budget, 80),
    timeline: cleanText(payload.timeline, 80),
    preferredContact: cleanText(payload.preferredContact || payload.preferred_contact, 80),
    message: cleanText(payload.message, 4000),
    diagnosticResult: cleanText(payload.diagnosticResult || payload.diagnostic_result, 6000),
    website: cleanText(payload.website || payload._honey, 120),
    formStartedAt: Number.parseInt(payload.formStartedAt, 10) || 0,
    consent: payload.consent === true || payload.consent === 'true' || payload.consent === 'on'
  };
  const errors = {};

  if (!clean.name) {
    errors.name = 'Merci de renseigner votre nom.';
  }

  if (!clean.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)) {
    errors.email = 'Merci de renseigner une adresse email valide.';
  }

  if (!clean.message || clean.message.length < 20) {
    errors.message = 'Merci de préciser votre besoin en quelques phrases.';
  }

  if (!clean.consent) {
    errors.consent = 'Merci de confirmer le consentement de contact.';
  }

  if (clean.website) {
    errors.website = 'Le message a été bloqué.';
  }

  if (!clean.formStartedAt || Date.now() - clean.formStartedAt < 3000) {
    errors.form = 'L’envoi a été bloqué. Merci de réessayer dans quelques secondes.';
  }

  return { clean, errors };
}

function parsePayload(body) {
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return Object.fromEntries(new URLSearchParams(body));
    }
  }

  return typeof body === 'object' && body !== null ? body : {};
}

function getClientIp(req) {
  const forwardedFor = req.headers['x-forwarded-for'];
  return Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : String(forwardedFor || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
}

function rateLimit(ip) {
  const now = Date.now();
  const previous = rateLimits.get(ip) || 0;

  if (now - previous < 60_000) {
    return false;
  }

  rateLimits.set(ip, now);
  return true;
}

async function sendLead(clean, req) {
  const body = new URLSearchParams({
    _subject: 'Nouvelle demande depuis le site Logic Web',
    _template: 'table',
    _captcha: 'false',
    name: clean.name,
    company: clean.company,
    email: clean.email,
    phone: clean.phone,
    projectType: clean.projectType,
    budget: clean.budget,
    timeline: clean.timeline,
    preferredContact: clean.preferredContact,
    message: clean.message,
    diagnosticResult: clean.diagnosticResult,
    source: 'logic-web-vercel-api',
    userAgent: req.headers['user-agent'] || ''
  });

  const response = await fetch(formSubmitEndpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  });

  if (!response.ok) {
    throw new Error(`Contact relay failed with ${response.status}`);
  }
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, message: 'Méthode non autorisée.' });
    return;
  }

  const payload = parsePayload(req.body);
  const { clean, errors } = validate(payload);

  if (Object.keys(errors).length) {
    res.status(422).json({ ok: false, message: 'Le formulaire contient des erreurs.', errors });
    return;
  }

  const ip = getClientIp(req);

  if (!rateLimit(ip)) {
    res.status(429).json({ ok: false, message: 'Une demande vient déjà d’être envoyée. Merci de patienter une minute.' });
    return;
  }

  try {
    await sendLead(clean, req);
    res.status(200).json({ ok: true, message: 'Votre message a bien été envoyé.' });
  } catch {
    res.status(502).json({
      ok: false,
      message: 'Le message est validé mais le relais email est indisponible. Merci d’écrire directement à contact@logic-web.net.'
    });
  }
}
