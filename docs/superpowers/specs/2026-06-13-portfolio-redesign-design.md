# Portfolio Redesign — Design Spec

**Date:** 2026-06-13
**Owner:** Samuel Abera
**Goal:** Replace the aging Next 10 / Bootstrap portfolio with a fresh, distinctive single-page site that recreates the look and feel of the **Arpeggio** Framer template (dark, editorial, bold display type, smooth motion), adapted for a **hireable senior full-stack developer** showcasing **real work**.

Reference: https://arpeggio.framer.website/

---

## 1. Objective & positioning

- **Audience:** hiring managers, recruiters, and prospective clients.
- **Primary CTA:** start a conversation (email / contact).
- **Tone:** confident, senior, minimal. Let the work speak.
- **Not an agency:** Arpeggio's Membership/Pricing, Testimonials, Journal, and FAQ sections are **dropped**. We keep Hero, Selected Work, About + Skills, Stats, and a Contact CTA.

## 2. Tech stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15 (App Router), TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion (scroll reveal, hover, subtle parallax) |
| Fonts | `next/font` — bold grotesque display + clean sans body |
| Theme | `next-themes` — **dark-first with a working light/dark toggle** |
| Icons | `lucide-react` |
| Deploy | Vercel |

**Migration:** the existing Next 10 code in `projects/portfolio/src` is moved to `projects/portfolio/_legacy/` (kept, not deleted). The new app is built fresh in the project root. Real assets we reuse (the 9 client-site hero screenshots in `src/assets/image/jpg/sites/`) are copied into the new `public/` folder.

## 3. Design language

- **Dark mode (default):** near-black background (~`#0a0a0a`), off-white text (~`#f5f5f0`), muted gray for secondary text, **one bright accent** color for CTAs, links, and hover states.
- **Light mode:** warm off-white background, near-black text, same accent.
- **Accent:** **warm amber `#FF8A3D`** for v1. Exposed as a single CSS variable / Tailwind theme token (`--accent`) so it can be swapped/tuned in one place later. Single accent only.
- **Type:** large editorial display headlines (tight tracking, heavy weight), generous whitespace, high contrast, restrained color.
- **Motion:** elements fade/slide in on scroll; project cards lift and reveal on hover; light parallax on the hero. Respect `prefers-reduced-motion`.
- **Layout:** wide max-width container, asymmetric editorial spacing, numbered section labels (`{01}`, `{02}`…) like Arpeggio.

## 4. Page structure (top → bottom)

### 4.1 Header (sticky)
- Left: `SA` monogram / "Samuel Abera".
- Center/right: nav — **Work · About · Contact**.
- Right: **theme toggle** + **"Let's talk"** button (mailto / scroll to contact).
- Collapses to a mobile menu.

### 4.2 Hero
- Huge display headline. *Draft:* **"I build software that ships."**
- Subheading. *Draft:* "Senior full-stack developer in Toronto — React, Rails, and everything from e-commerce to native apps."
- Row of **3 featured project cards** below the headline (→ scroll/anchor to that project, or external link): **Caravan**, **Blackjack**, **Fitness Tracker**.
- Subtle background parallax.

### 4.3 Selected Work  `{01}`
- Section title: "Selected Work" + subheading "Products & client builds".
- **Filter tabs:** All · Products · Client Work (extensible to Games).
- Responsive masonry/grid of cards. Each card: thumbnail, project name, one-line description, stack tags, link (live URL or repo/case study). Hover lift + accent.
- **Products** (my own apps):
  - **Caravan** — iOS social driving app: live convoys, shared routes, trip history. *React Native, Supabase, MapKit.*
  - **BeamNG MapMaker** — generates real-world maps for BeamNG from OSM + DEM elevation, Blender-augmented. *Python, Blender, 3D.*
  - **Blackjack** — real-time multiplayer card game (live on Fly). *Node, WebSockets, web.*
  - **Fitness Tracker** — carb-cycle cut planner with AI photo macro-logging (live on Vercel). *Next.js, AI, Vercel Blob.*
  - *(compact "More" entries: Polymarket copy-trader, Trivia (Kahoot clone), Stretching 3D app.)*
- **Client Work** (real shipped e-commerce — screenshots on hand):
  - Cumbraes, Despana NYC, Manetained, Paramount Butchershop, Steak and Chops, Tavora Foods, The Butcher Son, The Meat Department, The Friendly Butcher. *Shopify / Liquid / React.*

### 4.4 About + Skills  `{02}`
- Short bio (left) + portrait (right): "Senior Full Stack Developer with 5+ years building scalable apps with Ruby on Rails and React. Currently at Grocer Box Inc., Toronto."
- **3-column capabilities** (adapted from Arpeggio "Services"):
  - **Full-Stack Web** `{01}` — React, Next.js, Ruby on Rails, TypeScript, Redux, REST APIs.
  - **E-commerce** `{02}` — Shopify, Liquid theme development, conversion-focused storefronts.
  - **Apps & Systems** `{03}` — React Native / iOS, Python & 3D pipelines, real-time multiplayer, AI/OpenAI integrations, Docker, CI/CD.

### 4.5 Stats  `{03}`
- Adapted from Arpeggio "Achievements". Solo-dev framed, grounded in real numbers:
  - **5+** years experience · **15+** projects shipped · **9** live client sites · **60%** traffic lift (Grocer Box, per resume).
- Animated count-up on scroll.

### 4.6 Contact CTA
- Big closing headline: *Draft:* **"Let's build something."**
- Email button (`samuel@abera.io`) + optional phone (647 391 4887).
- Links: **GitHub — [@itssamius](https://github.com/itssamius)** (primary). LinkedIn / X can be added later if Sam provides handles.

### 4.7 Footer
- Name, email, social links, "Built with Next.js" note, copyright.

## 5. Content sources (resolved)

| Need | Source | Status |
|---|---|---|
| Name, title, bio, skills, experience, stats | `job-interview-prep/Resume Samuel Abera.pdf` | ✅ have |
| Contact (email/phone) | resume | ✅ have |
| Client-site list + screenshots | old portfolio `src/data/devWorks1.js` + `src/assets/.../sites/` | ✅ have |
| Personal project details | prior context / project folders | ✅ draftable |
| Portrait headshot | old portfolio `src/assets/image/jpg/hero-image.jpeg` | ✅ have |
| Product screenshots | project folders / deployed apps | ⚠️ partial; placeholders meanwhile |
| GitHub handle | `@itssamius` → github.com/itssamius | ✅ have |
| LinkedIn / X handles | — | ⚠️ optional, add later |
| Accent color | warm amber `#FF8A3D` (tokenized) | ✅ resolved |

## 6. Out of scope (v1)

- CMS / blog / journal.
- Per-project detail/case-study pages (v1 cards link to live URLs/repos; deep case studies are a later phase).
- Contact form backend (use `mailto:` in v1; a form endpoint can come later).
- Multi-language, analytics dashboards.

## 7. Success criteria

- Visually reads as an Arpeggio-class site: dark, bold, editorial, smooth motion.
- Real content throughout (no Lorem / template placeholders like "Bruce Ryan").
- Responsive (mobile → desktop), accessible (keyboard nav, reduced-motion, contrast).
- Lighthouse: performance ≥ 90, accessibility ≥ 95.
- Builds and deploys clean on Vercel.
- Working dark/light toggle.

## 8. Decisions (resolved)

1. **Socials:** GitHub `@itssamius` (primary). LinkedIn / X optional, add later.
2. **Headshot:** reuse `hero-image.jpeg` from the old portfolio.
3. **Accent:** warm amber `#FF8A3D`, tokenized for easy tuning.
4. **Featured trio:** Caravan, Blackjack, Fitness Tracker. (BeamNG MapMaker stays in the full Work grid, just not in the hero.)

### Still helpful later (non-blocking)
- LinkedIn / X handles, if you want them linked.
- Real product screenshots for Caravan / Blackjack / Fitness Tracker / etc. (placeholders used meanwhile).
