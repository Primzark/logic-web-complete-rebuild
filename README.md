# Logic Web

Production upgrade of the original static prototype into a routed `React + Vite` business website.

## Stack

- React 19
- Vite 5
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

The contact form posts directly to FormSubmit at `https://formsubmit.co/nicolaslivapro@gmail.com`.
FormSubmit may require confirmation from that recipient email address on the first successful submission.

Optional environment variables:

```bash
cp .env.example .env
```

- `VITE_SITE_URL`: canonical URL used for metadata

## Notes

- The old prototype CSS is still reused to preserve the current UX direction and visual identity during the migration.
- The legal page includes the available company data, but the final hosting provider field still needs to be completed before launch if it changes.
