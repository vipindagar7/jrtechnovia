# Junior Technovia 2026 — Next.js + GSAP

Next.js 14 (App Router, static export) · GSAP 3.13 (ScrollTrigger, SplitText, Flip) · self-hosted fonts.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out — upload to any server / Nginx / Vercel
```

## Edit content
- `data/site.js` — dates, venue, fee, registration link, coordinators, email, partner logos, sponsor contact
- `data/events.js` — the 8 events: name, zone, day, card highlights
- `data/eventDetails.js` — full specs, rules, penalties and judging criteria (from the official rule book PDF)
- `data/rulebook.js` — General Rules, Section 1
- `components/Sponsors.jsx` — sponsorship packages
- `public/` — rule book + sponsorship PDFs, registration QR (`qr-register.svg`), event photos, posters, logos

If the registration link changes, regenerate the QR:
`npx qrcode -t svg -o public/qr-register.svg "NEW_LINK"`

## Structure
- `app/` — layout (fonts, metadata) and the page
- `components/Motion.jsx` — global motion layer (progress bar, split headings, reveals, cursor, magnetic, tilt)
- `components/HeroOrbit.jsx` — hero visual
- `lib/store.js` — tiny shared state (filter + open event) between client islands
- Rules and Sponsors are server components (zero JS). The event modal + full rulebook load on first open.

## Animation classes you can reuse
`.reveal` fade-up · `.split-head` masked word rise · `.magnetic` · `.tilt` · `.drift` (scroll-scrubbed outline text)

All motion respects `prefers-reduced-motion`; pointer effects run only on desktop with a mouse.
