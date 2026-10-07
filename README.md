# FINA Consultancy — Website Prototype

PRD-aligned marketing site prototype for **FINA Consultancy** (talent & HR across Manufacturing, Banking, Insurance). Static frontend only — no database or backend. Forms validate in the browser and show demo success states.

## Pages

| Route | Content |
| --- | --- |
| `/` | Full homepage (hero, pathways, services, industries, processes, FAQ, forms) |
| `/about` | About FINA and entity summary |
| `/services` | Employer & candidate services |
| `/industries` | Manufacturing, Banking, Insurance |
| `/candidates` | Candidate journey + resume form |
| `/contact` | Contact details + forms |

## Development

```bash
npm ci
npm run dev
```

Open http://localhost:5173

## Production build & preview

```bash
npm run build
npm run preview
```

## Deploy (static)

Build output is in `dist/`. Config included for:

- **Netlify** — `netlify.toml`
- **Vercel** — `vercel.json`

Any static host works; configure SPA fallback so all routes serve `index.html`.

## Demo limitations

- Forms do not POST to a server (wire to your API, Formspree, or serverless handler for production).
- Resume files are validated locally only.
- Replace founder portrait placeholder and connect approved logo assets before launch.
- Update `hello@finaconsultancy.in` when the domain is registered.

## Analytics

`data-track` attributes and `track()` in `src/utils/analytics.js` fire `fina:analytics` events (and log in dev). Swap for Google Analytics / Plausible in production.
