import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { services } from './src/data/services.js';
import { localLandingPages } from './src/data/localLandingPages.js';
import { company } from './src/data/siteContent.js';

const rootDir = fileURLToPath(new URL('.', import.meta.url));
const storageDir = path.join(rootDir, 'storage', 'contact-submissions');
const rateLimitDir = path.join(rootDir, 'storage', 'rate-limits');
const siteUrl = process.env.VITE_SITE_URL || 'https://www.logic-web.net';

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
    budget: sanitizeText(payload.budget, 80),
    timeline: sanitizeText(payload.timeline, 80),
    preferredContact: sanitizeText(payload.preferredContact || payload.preferred_contact, 80),
    message: sanitizeText(payload.message, 4000),
    diagnosticResult: sanitizeText(payload.diagnosticResult || payload.diagnostic_result, 6000),
    website: sanitizeText(payload.website || payload._honey, 120),
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
      const handleContact = async (req, res, next) => {
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
      };

      server.middlewares.use('/api/contact', handleContact);
      server.middlewares.use('/api/contact.php', handleContact);
    }
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function buildHomeSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: company.name,
    legalName: company.legalName,
    email: company.email,
    telephone: company.phone,
    description: company.description,
    address: {
      '@type': 'PostalAddress',
      ...company.address
    },
    areaServed: company.areaServed,
    url: siteUrl,
    priceRange: '$$'
  };
}

function buildServiceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.shortTitle,
    description: service.excerpt,
    provider: {
      '@type': 'LocalBusiness',
      name: company.name,
      email: company.email,
      telephone: company.phone,
      address: {
        '@type': 'PostalAddress',
        ...company.address
      }
    },
    areaServed: company.areaServed,
    url: `${siteUrl}${service.path}`
  };
}

function buildFaqSchema(items = []) {
  if (!items.length) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

function withMetadata(html, route) {
  const canonicalUrl = `${siteUrl}${route.path === '/' ? '/' : route.path}`;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const robots = route.robots || 'index, follow';
  const schema = route.schema?.filter(Boolean) || [];
  const schemaTag = schema.length
    ? `<script id="logic-web-schema" type="application/ld+json">${JSON.stringify(schema.length === 1 ? schema[0] : schema)}</script>`
    : '';

  let nextHtml = html
    .replace(/<title>.*?<\/title>/s, `<title>${title}</title>`)
    .replace(/<meta[^>]*name="description"[^>]*>/s, `<meta name="description" content="${description}" />`)
    .replace(/<meta[^>]*name="robots"[^>]*>/s, `<meta name="robots" content="${escapeHtml(robots)}" />`)
    .replace(/<meta[^>]*property="og:title"[^>]*>/s, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta[^>]*property="og:description"[^>]*>/s, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta[^>]*name="twitter:title"[^>]*>/s, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta[^>]*name="twitter:description"[^>]*>/s, `<meta name="twitter:description" content="${description}" />`)
    .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/s, `<link rel="canonical" href="${canonicalUrl}" />`);

  if (nextHtml.includes('property="og:url"')) {
    nextHtml = nextHtml.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/s, `<meta property="og:url" content="${canonicalUrl}" />`);
  } else {
    nextHtml = nextHtml.replace('</head>', `    <meta property="og:url" content="${canonicalUrl}" />\n${schemaTag ? `    ${schemaTag}\n` : ''}  </head>`);
    return nextHtml;
  }

  return nextHtml.replace('</head>', `${schemaTag ? `    ${schemaTag}\n` : ''}  </head>`);
}

function getStaticRoutes() {
  const serviceRoutes = services.map((service) => ({
    path: service.path,
    title: `${service.shortTitle} | ${company.name}`,
    description: service.excerpt,
    schema: [buildServiceSchema(service), buildFaqSchema(service.faq)]
  }));
  const localRoutes = localLandingPages.map((page) => ({
    path: page.path,
    title: `${page.label} | ${company.name}`,
    description: page.metaDescription,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: page.label,
        description: page.metaDescription,
        provider: {
          '@type': 'LocalBusiness',
          name: company.name,
          email: company.email,
          telephone: company.phone,
          address: {
            '@type': 'PostalAddress',
            ...company.address
          }
        },
        areaServed: company.areaServed,
        url: `${siteUrl}${page.path}`,
        keywords: page.keywords.join(', ')
      },
      buildFaqSchema(page.faq)
    ]
  }));

  return [
    {
      path: '/',
      title: `${company.name} | Solutions digitales & IT pour les entreprises locales`,
      description: 'Sites web, logiciels sur mesure, support IT et formation pour les entreprises du Havre et de Normandie.',
      schema: [buildHomeSchema()]
    },
    {
      path: '/services',
      title: `Services | ${company.name}`,
      description: 'Une offre structurée autour de la création de sites web, des logiciels sur mesure, du support IT et de la formation.'
    },
    ...serviceRoutes,
    ...localRoutes,
    {
      path: '/references',
      title: `Références | ${company.name}`,
      description: 'Exemples anonymisés de missions web, logiciel, support IT et formation menées pour des structures locales.'
    },
    {
      path: '/a-propos',
      title: `À propos | ${company.name}`,
      description: 'Logic Web accompagne les petites structures avec une approche locale, pragmatique et durable.'
    },
    {
      path: '/contact',
      title: `Contact | ${company.name}`,
      description: 'Premier échange gratuit et sans engagement pour cadrer un projet web, logiciel, IT ou formation.'
    },
    {
      path: '/mentions-legales',
      title: `Mentions légales | ${company.name}`,
      description: 'Informations légales, éditeur du site et cadre de publication du site Logic Web.'
    },
    {
      path: '/politique-confidentialite',
      title: `Politique de confidentialité | ${company.name}`,
      description: 'Cadre de traitement des données collectées via le formulaire de contact du site Logic Web.'
    },
    {
      path: '/merci',
      title: `Merci | ${company.name}`,
      description: 'Confirmation d’envoi du formulaire de contact Logic Web.',
      robots: 'noindex, nofollow'
    }
  ];
}

function staticRouteMetadataForDist() {
  return {
    name: 'logic-web-static-route-metadata',
    apply: 'build',
    async closeBundle() {
      const distIndex = path.join(rootDir, 'dist', 'index.html');

      try {
        await stat(distIndex);
      } catch {
        return;
      }

      const baseHtml = await readFile(distIndex, 'utf8');

      for (const route of getStaticRoutes()) {
        const routeHtml = withMetadata(baseHtml, route);

        if (route.path === '/') {
          await writeFile(distIndex, routeHtml, 'utf8');
          continue;
        }

        const routeDir = path.join(rootDir, 'dist', route.path.replace(/^\//, ''));
        await mkdir(routeDir, { recursive: true });
        await writeFile(path.join(routeDir, 'index.html'), routeHtml, 'utf8');
        await writeFile(path.join(rootDir, 'dist', `${route.path.replace(/^\//, '')}.html`), routeHtml, 'utf8');
      }
    }
  };
}

export default defineConfig({
  plugins: [react(), contactDevApi(), staticRouteMetadataForDist()],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['.trycloudflare.com']
  }
});
