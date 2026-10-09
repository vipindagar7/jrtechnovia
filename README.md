# Junior Technovia 2026 — Next.js + GSAP

Next.js 14 (App Router, static export) · GSAP 3.13 (ScrollTrigger, SplitText, Flip) · self-hosted fonts.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out — upload to any server / Nginx / Vercel
```

## Edit content
- `data/site.js` — date, venue, fee, prize pool, contact, **registerUrl**, socials (`PLACEHOLDER` = needs real value)
- `data/events.js` — zones + event cards (Innovation zone rules still TBA)
- `data/rulebook.js` — generated from the docx:
  `pandoc JT_2026.docx -t plain --wrap=none -o jt.txt && python3 scripts/parse_rulebook.py jt.txt data/rulebook.js`
- `components/Sponsors.jsx`, `components/Register.jsx` — sponsor logos, QR code

## Structure
- `app/` — layout (fonts, metadata) and the page
- `components/Motion.jsx` — global motion layer (progress bar, split headings, reveals, cursor, magnetic, tilt)
- `components/HeroOrbit.jsx` — hero visual
- `lib/store.js` — tiny shared state (filter + open event) between client islands
- Rules and Sponsors are server components (zero JS). The event modal + full rulebook load on first open.

## Animation classes you can reuse
`.reveal` fade-up · `.split-head` masked word rise · `.magnetic` · `.tilt` · `.drift` (scroll-scrubbed outline text)

All motion respects `prefers-reduced-motion`; pointer effects run only on desktop with a mouse.
