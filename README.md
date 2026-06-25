# Logic Web

Production upgrade of the original static prototype into a routed `React + Vite` business website.

## Stack

- React 19
- Vite 8
- React Router
- Existing premium visual system preserved from the prototype CSS
- Contact submission flow with:
  - client-side validation
  - success/error states
  - thank-you route
  - honeypot + minimum-delay anti-spam
  - local JSON storage in development and PHP runtime

## Project structure

```bash
logic-web/
├─ api/
│  └─ contact.js
├─ server/
│  └─ contact.php
├─ public/
│  ├─ branding/
│  │  └─ logic-web/
│  │     ├─ icons/
│  │     └─ logos/
│  ├─ robots.txt
│  ├─ site.webmanifest
│  └─ sitemap.xml
├─ src/
│  ├─ components/
│  ├─ data/
│  ├─ hooks/
│  ├─ pages/
│  ├─ router/
│  ├─ styles/
│  ├─ App.jsx
│  └─ main.jsx
├─ storage/
│  ├─ contact-submissions/
│  └─ rate-limits/
├─ index.html
├─ router.php
└─ vite.config.js
```

## Routes

- `/`
- `/services`
- `/creation-sites-web`
- `/logiciels-sur-mesure`
- `/support-it-securite`
- `/formation`
- `/references`
- `/a-propos`
- `/contact`
- `/mentions-legales`
- `/politique-confidentialite`
- `/merci`

## Development

Install dependencies:

```bash
npm install
```

Start the Vite dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the built site with Vite:

```bash
npm run preview
```

Preview the built site with PHP routing:

```bash
npm run build
npm run preview:php
```

## Contact handling

The contact form posts to the first-party `/api/contact` endpoint.

- On Vercel, `api/contact.js` validates, rate-limits and relays the lead by email.
- On PHP hosting, `server/contact.php` keeps the same validation contract and stores a local JSON copy.
- In Vite development, `vite.config.js` provides a matching local `/api/contact` middleware.

Optional environment variables:

```bash
cp .env.example .env
```

- `VITE_SITE_URL`: canonical URL used for metadata
- `CONTACT_RECIPIENT_EMAIL`: recipient used by the default Vercel email relay
- `CONTACT_WEBHOOK_URL`: optional custom relay/webhook endpoint for production lead delivery

## Notes

- The build writes route-specific static HTML metadata for SEO and social previews.
- The legal page uses Vercel hosting details for the current deployment target.
