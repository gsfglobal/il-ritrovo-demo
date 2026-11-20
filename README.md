# Il Ritrovo Mamoiada — sito demo

Sito Next.js 15 + React Three Fiber + GSAP + Tailwind. Esportazione statica (cartella `out/`), pubblicabile su Vercel, Netlify o qualsiasi hosting.

## Avvio in locale

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # genera out/
npm start          # serve out/ in locale
npm run typecheck && npm run lint
```

## Dove si modificano i contenuti

Tutto in **`src/content/site.ts`**:

| Cosa | Variabile |
|---|---|
| Indirizzo, telefono, email, social | `business` |
| Orari | `hours` (metti `verified: true` dopo la conferma) |
| Piatti in evidenza | `dishes` |
| Menu e prezzi | `menu` (campo `price`) |
| Menu del giorno | `dailyMenu.items` |
| Recensioni mostrate | `reviews` |
| Gallery | `gallery` (oggi segnaposto: sostituire con foto reali) |

Testi dell'interfaccia IT/EN: `src/content/i18n.ts`. Pagine: `src/components/HomePage.tsx` e `src/components/Pages.tsx`.

## Modalità demo → sito ufficiale

Variabili d'ambiente (su Vercel: Settings → Environment Variables):

| Variabile | Demo | Produzione |
|---|---|---|
| `NEXT_PUBLIC_DEMO_MODE` | (vuota) | `false` |
| `NEXT_PUBLIC_BOOKING_ENDPOINT` | (vuota) | URL Formspree o simile |
| `NEXT_PUBLIC_SITE_URL` | — | `https://dominio-scelto.it` |

In modalità demo: banner "Proposta demo", badge "da confermare", **nessuna richiesta inviata**, `noindex` su tutte le pagine, `robots.txt` blocca i motori.
In produzione: banner e badge spariscono, il modulo invia la richiesta all'endpoint (non conferma mai automaticamente: il ristorante ricontatta il cliente), sitemap e indicizzazione attive.

## Funzionalità

- Hero 3D procedurale (piatto in ceramica dipinta, malloreddus con purpuzza e porcini, tagliere su pietra), camera che segue mouse e scroll; fallback illustrato senza WebGL, con risparmio dati o `prefers-reduced-motion`
- Sezione "Signature" 3D a scorrimento: malloreddus → seadas al miele → tagliere
- 12 sezioni in homepage, 8 pagine interne + privacy/cookie, tutto anche in inglese (`/en/`)
- Modulo prenotazione con controlli (lunedì chiuso, date passate, gruppi > 12)
- Mappa Google caricata solo dopo consenso (GDPR)
- SEO: metadata, canonical, hreflang, Open Graph, Schema.org `Restaurant`, sitemap.xml, robots.txt
- Barra "Chiama / Prenota" fissa su mobile

## Prima della pubblicazione

Vedi `RESEARCH.md` §9: orari, menu e prezzi, foto autorizzate, logo, email, WhatsApp, P.IVA, consenso a usare le recensioni, dominio.
