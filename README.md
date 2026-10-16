# Nexus AI Technologies Ltd — Investor Pitch Deck

An interactive, animated investor pitch deck for **Nexus AI Technologies Ltd** (Nova Scotia, Canada), built as a single-page web experience. Every figure comes from the company's business plan (October 2026 draft) or cited Canadian market statistics.

## Live site

**https://lois4801.github.io/nexus-ai-technologies-ltd/**

[![Nexus AI Technologies Ltd — investor pitch deck preview](https://www.kimi.com/apiv2-files/sign-obj/kimi-fs%2Ffiles%2Fblob%2F190acec323acc5e724782d3becd9ec3236db8ad21375356f51231c11c291872d?filename=readme-preview.jpg&sig=Fy-aMnh3JNZdYO_kBwH0kDsaIa7Eedz1yr_24_RbsTU=&t=o)](https://lois4801.github.io/nexus-ai-technologies-ltd/)

Click the image above to open the live deck.

## What's inside

| Section | Highlights |
| --- | --- |
| Intro | Cinematic 4K hero, animated headline, key funding numbers strip |
| The Problem | Four pain points of small-business operations, cinematic band |
| The Opportunity | Animated counters — 1.10M Canadian employer businesses, 98.2% small, 12.5% AI adoption gap bar |
| The Model | Interactive dual-engine switcher (services now / platform next) |
| Services & Pricing | 12 priced offerings across 3 tabs with animated range bars |
| The Platform | 4K concept render, 6 platform features, 5-step R&D de-risking program |
| Financials | Animated grouped bar chart + cash-flow line chart with hover tooltips |
| The Ask | Interactive $40K use-of-proceeds donut, 5 evidence-gated milestones |
| Roadmap | Year 1–3: Validate → Systematize → Scale |
| Why Nexus | Differentiators + honest risks accordion |
| Contact | 4K finale, downloadable business plan PDF |

## Interaction guide

- **Scroll** — sections reveal with staggered motion; the red bar under the header tracks progress
- **ArrowDown / ArrowUp / PageUp / PageDown** — move between deck sections like slides
- **Hover / tap the charts** — exact dollar values on every bar, point, and donut segment
- **Tabs** — pricing layers, financial chart views, and business engines all switch live
- **Mobile** — hamburger menu, touch targets ≥ 44px, fully responsive down to 375px

## Tech stack

- **React 19 + TypeScript + Vite 7**
- **Tailwind CSS 3** with a custom dark editorial design system
- **framer-motion** for scroll reveals, counters, chart and path animations
- Custom SVG charts (no chart library) — bars, line, donut, range bars
- 4K (3840×2160) AI-generated imagery, optimized to JPEG
- Fonts: Archivo (display) + IBM Plex Mono

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Build for production:

```bash
npm run build    # outputs to dist/
npm run preview
```

> The four images in `public/img/` and `public/nexus-ai-business-plan.pdf` are fetched automatically during the CI build (see the workflow). For local development, place any images you like at `public/img/hero-bg.jpg`, `problem.jpg`, `platform.jpg`, `cta.jpg` and the plan at `public/nexus-ai-business-plan.pdf`.

## Deployment

`.github/workflows/deploy.yml` runs on every push to `main`:

1. Installs dependencies (Node 22)
2. Downloads the 4K imagery and the business-plan PDF
3. Builds the site with Vite
4. Publishes `dist/` to the `gh-pages` branch, which GitHub Pages serves at the live URL above

The site uses a relative asset base (`base: './'` in `vite.config.ts`), so it works under the project subpath and at any domain root.

## Project structure

```
├── index.html
├── vite.config.ts / tailwind.config.js / postcss.config.js
├── .github/workflows/deploy.yml
└── src/
    ├── main.tsx / App.tsx
    ├── index.css            # design tokens + utilities
    ├── data.ts              # all deck content and figures
    ├── pages/Home.tsx
    ├── components/
    │   ├── Nav.tsx          # header, progress bar, dots, mobile menu
    │   ├── bits.tsx         # Reveal, Counter, SectionHead, Ticker, Asterisk
    │   └── charts.tsx       # FinancialBars, CashLine, ProceedsDonut, RangeBar
    └── sections/
        ├── intro.tsx        # Hero, Problem, Opportunity
        ├── model.tsx        # Model, Services, Innovation
        └── close.tsx        # Financials, Ask, Roadmap, Edge, Contact
```

## Data sources & disclaimer

- Financial projections are **founder-supplied, unaudited** figures from the Nexus AI Technologies Ltd business plan (October 2026 draft).
- Market statistics: Statistics Canada Business Register (Dec 2024) and ISED Canada SME AI Adoption Blueprint (2025).
- This repository contains a confidential planning document intended for funding discussions.
