import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const rootDir = fileURLToPath(new URL('.', import.meta.url));
const storageDir = path.join(rootDir, 'storage', 'contact-submissions');
const rateLimitDir = path.join(rootDir, 'storage', 'rate-limits');

function jsonResponse(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function parseJsonSafely(input) {
  try {
    return JSON.parse(input);
  } catch {
    return null;
  }
}

async function parseRequestBody(req) {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(Buffer.from(chunk));
  }

  const rawBody = Buffer.concat(chunks).toString('utf8');
  const contentType = req.headers['content-type'] || '';

  if (contentType.includes('application/json')) {
    return parseJsonSafely(rawBody) || {};
  }

  if (contentType.includes('application/x-www-form-urlencoded')) {
    return Object.fromEntries(new URLSearchParams(rawBody));
  }

  return parseJsonSafely(rawBody) || {};
}

function sanitizeText(value, maxLength = 1000) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function validateSubmission(payload) {
  const clean = {
    name: sanitizeText(payload.name, 120),
    company: sanitizeText(payload.company, 160),
    email: sanitizeText(payload.email, 160).toLowerCase(),
    phone: sanitizeText(payload.phone, 40),
    projectType: sanitizeText(payload.projectType || payload.project_type, 120),
    message: sanitizeText(payload.message, 4000),
    website: sanitizeText(payload.website, 120),
    formStartedAt: Number.parseInt(payload.formStartedAt, 10) || 0
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

  if (clean.website) {
    errors.website = 'Le message a été bloqué.';
  }

  if (!clean.formStartedAt || Date.now() - clean.formStartedAt < 3000) {
    errors.form = 'L’envoi a été bloqué. Merci de réessayer dans quelques secondes.';
  }

  return { clean, errors };
}

async function enforceRateLimit(ipAddress) {
  const safeIp = ipAddress || 'unknown';
  const fileName = `${safeIp.replace(/[^a-z0-9_.:-]/gi, '_')}.json`;
  const filePath = path.join(rateLimitDir, fileName);
  const now = Date.now();

  await mkdir(rateLimitDir, { recursive: true });

  try {
    const raw = await readFile(filePath, 'utf8');
    const previous = parseJsonSafely(raw);

    if (previous?.ts && now - previous.ts < 60_000) {
      return false;
    }
  } catch {
    // No previous limit file.
  }

  await writeFile(filePath, JSON.stringify({ ts: now }), 'utf8');
  return true;
}

async function persistSubmission(clean, meta) {
  await mkdir(storageDir, { recursive: true });

  const fileName = `${new Date().toISOString().replace(/[:.]/g, '-')}-${Math.random()
    .toString(36)
    .slice(2, 10)}.json`;
  const filePath = path.join(storageDir, fileName);

  await writeFile(
    filePath,
    JSON.stringify(
      {
        submittedAt: new Date().toISOString(),
        ip: meta.ip,
        userAgent: meta.userAgent,
        source: 'vite-dev',
        ...clean
      },
      null,
      2
    ),
    'utf8'
  );
}

function contactDevApi() {
  return {
    name: 'logic-web-contact-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/contact.php', async (req, res, next) => {
        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method !== 'POST') {
          next();
          return;
        }

        try {
          const payload = await parseRequestBody(req);
          const { clean, errors } = validateSubmission(payload);

          if (Object.keys(errors).length > 0) {
            jsonResponse(res, 422, {
              ok: false,
              message: 'Le formulaire contient des erreurs.',
              errors
            });
            return;
          }

          const ip =
            req.headers['x-forwarded-for']?.toString().split(',')[0].trim() ||
            req.socket.remoteAddress ||
            'unknown';
          const allowed = await enforceRateLimit(ip);

          if (!allowed) {
            jsonResponse(res, 429, {
              ok: false,
              message: 'Une demande vient déjà d’être envoyée. Merci de patienter une minute.'
            });
            return;
          }

          await persistSubmission(clean, {
            ip,
            userAgent: req.headers['user-agent'] || 'unknown'
          });

          jsonResponse(res, 200, {
            ok: true,
            message: 'Votre message a bien été enregistré.'
          });
        } catch (error) {
          jsonResponse(res, 500, {
            ok: false,
            message: 'Une erreur est survenue lors de l’envoi du message.'
          });
        }
      });
    }
  };
}

function spaFallbackForDist() {
  return {
    name: 'logic-web-spa-fallback',
    apply: 'build',
    async closeBundle() {
      const distIndex = path.join(rootDir, 'dist', 'index.html');

      try {
        await stat(distIndex);
      } catch {
        return;
      }
    }
  };
}

export default defineConfig({
  plugins: [react(), contactDevApi(), spaFallbackForDist()],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['.trycloudflare.com']
  }
});
