# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Samuel Abera's portfolio as a fresh Next.js 15 single-page site that recreates the Arpeggio Framer template's dark editorial look (warm-amber accent, smooth motion, light/dark toggle), populated with his real projects and client work.

**Architecture:** New Next.js 15 (App Router, TypeScript) app at the root of `projects/portfolio/`, with the old Next 10 code archived to `_legacy/`. Tailwind CSS supplies a tokenized design system (single `--accent` variable). Section components compose a single `app/page.tsx`. Content lives in typed data modules (`lib/site.ts`, `lib/projects.ts`). Theme handled by `next-themes`; motion by `framer-motion`. Vitest + React Testing Library drive component tests.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 3, framer-motion, next-themes, lucide-react, Vitest, @testing-library/react, jsdom.

Reference spec: `docs/superpowers/specs/2026-06-13-portfolio-redesign-design.md`

---

## File structure

```
projects/portfolio/
  _legacy/                         # old Next 10 app (archived, untouched)
  app/
    layout.tsx                     # root layout: fonts, ThemeProvider, metadata
    page.tsx                       # composes all sections
    globals.css                    # tailwind layers + design tokens (--accent etc.)
  components/
    providers/ThemeProvider.tsx    # next-themes wrapper ("use client")
    ui/
      ThemeToggle.tsx              # light/dark button ("use client")
      Button.tsx                   # link-styled button (primary/ghost)
      SectionLabel.tsx             # numbered "{01}" label + title
      Reveal.tsx                   # framer-motion scroll-reveal wrapper ("use client")
      CountUp.tsx                  # animated number ("use client")
    layout/
      Header.tsx                   # sticky nav + toggle + CTA ("use client")
      Footer.tsx
    sections/
      Hero.tsx                     # headline + featured trio
      Work.tsx                     # filter tabs + grid ("use client")
      WorkCard.tsx                 # single project card
      About.tsx                    # bio + headshot
      Skills.tsx                   # 3-column capabilities
      Stats.tsx                    # animated metrics
      Contact.tsx                  # closing CTA
  lib/
    site.ts                        # name, role, email, github, nav, stats, skills
    projects.ts                    # Project type + data + helpers
  public/
    headshot.jpg                   # copied from old portfolio
    work/                          # client screenshots + product placeholders
  tests/                           # Vitest specs mirror component paths
  tailwind.config.ts
  postcss.config.mjs
  next.config.mjs
  tsconfig.json
  package.json
  vitest.config.ts
  vitest.setup.ts
```

---

## Task 1: Archive legacy code and scaffold Next.js 15 skeleton

**Files:**
- Move: everything currently in `projects/portfolio/` (except `.git`, `docs/`, `README.md`) → `projects/portfolio/_legacy/`
- Create: `package.json`, `next.config.mjs`, `tsconfig.json`, `postcss.config.mjs`, `next-env.d.ts` (auto), `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `.gitignore`

- [ ] **Step 1: Archive the old app**

```bash
cd projects/portfolio
mkdir -p _legacy
# move old app files out of the way (keep .git, docs, README, _legacy)
for f in src pages next.config.js package.json yarn.lock .eslintrc.json .gitignore; do
  [ -e "$f" ] && git mv "$f" "_legacy/" 2>/dev/null || { [ -e "$f" ] && mv "$f" "_legacy/"; }
done
ls -A
```
Expected: `_legacy/`, `docs/`, `README.md`, `.git` remain at root; old `src`/`pages`/configs now under `_legacy/`.

- [ ] **Step 2: Create `package.json`**

```json
{
  "name": "portfolio",
  "version": "2.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "framer-motion": "^11.5.0",
    "lucide-react": "^0.454.0",
    "next": "^15.0.0",
    "next-themes": "^0.4.3",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.5.0",
    "@testing-library/react": "^16.0.1",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.2",
    "autoprefixer": "^10.4.20",
    "jsdom": "^25.0.1",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14",
    "typescript": "^5.6.0",
    "vitest": "^2.1.3"
  }
}
```

- [ ] **Step 3: Create configs**

`next.config.mjs`:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
export default nextConfig;
```

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "_legacy"]
}
```

`postcss.config.mjs`:
```js
export default {
  plugins: { tailwindcss: {}, autoprefixer: {} },
};
```

`.gitignore`:
```
/node_modules
/.next
/out
.DS_Store
*.tsbuildinfo
next-env.d.ts
.vercel
```

- [ ] **Step 4: Create a minimal app so it boots**

`app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Samuel Abera",
  description: "Senior Full Stack Developer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

`app/page.tsx`:
```tsx
export default function Home() {
  return <main>Portfolio</main>;
}
```

`tailwind.config.ts` (placeholder — fleshed out in Task 2):
```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
export default config;
```

- [ ] **Step 5: Install and verify build**

Run:
```bash
cd projects/portfolio && npm install && npm run build
```
Expected: install succeeds; `next build` completes with "Compiled successfully" and a static `/` route. No type errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore(portfolio): archive legacy app, scaffold Next.js 15 skeleton"
```

---

## Task 2: Design tokens, fonts, Tailwind theme, dark/light

**Files:**
- Modify: `app/globals.css`, `tailwind.config.ts`, `app/layout.tsx`
- Create: `components/providers/ThemeProvider.tsx`, `components/ui/ThemeToggle.tsx`, `tests/ThemeToggle.test.tsx`

- [ ] **Step 1: Define design tokens in `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: 250 250 248;          /* warm off-white */
  --bg-elev: 255 255 255;
  --fg: 10 10 10;             /* near-black */
  --muted: 90 90 88;
  --border: 225 225 220;
  --accent: 255 138 61;       /* warm amber #FF8A3D */
  --accent-fg: 10 10 10;
}

.dark {
  --bg: 10 10 10;             /* near-black */
  --bg-elev: 22 22 22;
  --fg: 245 245 240;          /* off-white */
  --muted: 150 150 145;
  --border: 38 38 36;
  --accent: 255 138 61;
  --accent-fg: 10 10 10;
}

@layer base {
  html { scroll-behavior: smooth; }
  body {
    background-color: rgb(var(--bg));
    color: rgb(var(--fg));
    font-feature-settings: "ss01", "cv01";
    -webkit-font-smoothing: antialiased;
  }
  ::selection { background: rgb(var(--accent)); color: rgb(var(--accent-fg)); }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

- [ ] **Step 2: Wire tokens into `tailwind.config.ts`**

```ts
import type { Config } from "tailwindcss";

const withAlpha = (v: string) => `rgb(var(${v}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: withAlpha("--bg"),
        "bg-elev": withAlpha("--bg-elev"),
        fg: withAlpha("--fg"),
        muted: withAlpha("--muted"),
        border: withAlpha("--border"),
        accent: withAlpha("--accent"),
        "accent-fg": withAlpha("--accent-fg"),
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: { container: "1280px" },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 3: Load fonts + ThemeProvider in `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Samuel Abera — Senior Full Stack Developer",
  description: "Senior full-stack developer in Toronto building e-commerce, apps, and products with React, Rails, and TypeScript.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Create `components/providers/ThemeProvider.tsx`**

```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  );
}
```

- [ ] **Step 5: Write the failing test for ThemeToggle**

`tests/ThemeToggle.test.tsx`:
```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const setTheme = vi.fn();
vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "dark", setTheme, resolvedTheme: "dark" }),
}));

describe("ThemeToggle", () => {
  it("renders an accessible toggle button", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: /theme/i })).toBeInTheDocument();
  });

  it("switches theme on click", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: /theme/i }));
    expect(setTheme).toHaveBeenCalledWith("light");
  });
});
```

- [ ] **Step 6: Run test to verify it fails**

Run: `npm run test -- tests/ThemeToggle.test.tsx`
Expected: FAIL — cannot resolve `@/components/ui/ThemeToggle` (not yet created). *(Vitest config lands in Task 1's stack? No — add it now if missing; see Step 8.)*

- [ ] **Step 7: Implement `components/ui/ThemeToggle.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="grid h-9 w-9 place-items-center rounded-full border border-border text-fg transition hover:border-accent hover:text-accent"
    >
      {mounted && isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
```

- [ ] **Step 8: Add Vitest config + setup (if not present)**

`vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
});
```

`vitest.setup.ts`:
```ts
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// next/image -> plain img in tests
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const { fill, priority, ...rest } = props as any;
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...rest} />;
  },
}));
```

- [ ] **Step 9: Run test to verify it passes**

Run: `npm run test -- tests/ThemeToggle.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat(portfolio): design tokens, fonts, dark/light theme + toggle"
```

---

## Task 3: Site config and project data

**Files:**
- Create: `lib/site.ts`, `lib/projects.ts`, `tests/projects.test.ts`

- [ ] **Step 1: Create `lib/site.ts`**

```ts
export const site = {
  name: "Samuel Abera",
  role: "Senior Full Stack Developer",
  location: "Toronto, Canada",
  email: "samuel@abera.io",
  phone: "647 391 4887",
  github: "https://github.com/itssamius",
  heroHeadline: "I build software that ships.",
  heroSub:
    "Senior full-stack developer in Toronto — React, Rails, and everything from e-commerce storefronts to native apps.",
  bio: "Senior Full Stack Developer with 5+ years building scalable applications with Ruby on Rails and React. Currently at Grocer Box Inc. in Toronto, I ship everything from conversion-focused e-commerce to native apps and experimental products.",
  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  stats: [
    { value: 5, suffix: "+", label: "Years experience" },
    { value: 15, suffix: "+", label: "Projects shipped" },
    { value: 9, suffix: "", label: "Live client sites" },
    { value: 60, suffix: "%", label: "Traffic lift at Grocer Box" },
  ],
  skills: [
    {
      no: "01",
      title: "Full-Stack Web",
      items: ["React", "Next.js", "Ruby on Rails", "TypeScript", "Redux", "REST APIs"],
    },
    {
      no: "02",
      title: "E-commerce",
      items: ["Shopify", "Liquid themes", "Conversion-focused storefronts", "SASS"],
    },
    {
      no: "03",
      title: "Apps & Systems",
      items: ["React Native / iOS", "Python & 3D pipelines", "Real-time multiplayer", "AI / OpenAI", "Docker", "CI/CD"],
    },
  ],
} as const;
```

- [ ] **Step 2: Write the failing test for project data**

`tests/projects.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { projects, featuredProjects, projectsByCategory } from "@/lib/projects";

describe("projects data", () => {
  it("has exactly 3 featured projects", () => {
    expect(featuredProjects).toHaveLength(3);
    expect(featuredProjects.map((p) => p.slug).sort()).toEqual(
      ["blackjack", "caravan", "fitness-tracker"].sort()
    );
  });

  it("has 9 client-work projects", () => {
    expect(projectsByCategory("client")).toHaveLength(9);
  });

  it("every project has required fields and unique slug", () => {
    const slugs = new Set<string>();
    for (const p of projects) {
      expect(p.name).toBeTruthy();
      expect(p.tagline).toBeTruthy();
      expect(p.href).toBeTruthy();
      expect(p.image).toMatch(/^\/work\//);
      expect(p.tags.length).toBeGreaterThan(0);
      expect(slugs.has(p.slug)).toBe(false);
      slugs.add(p.slug);
    }
  });

  it('"all" returns every project', () => {
    expect(projectsByCategory("all")).toHaveLength(projects.length);
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm run test -- tests/projects.test.ts`
Expected: FAIL — `@/lib/projects` not found.

- [ ] **Step 4: Implement `lib/projects.ts`**

```ts
export type ProjectCategory = "product" | "client";

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  category: ProjectCategory;
  tags: string[];
  href: string;
  image: string;
  featured?: boolean;
}

export const projects: Project[] = [
  // ---- Products ----
  {
    slug: "caravan",
    name: "Caravan",
    tagline: "iOS social driving app — live convoys, shared routes, and trip history.",
    category: "product",
    tags: ["React Native", "Supabase", "MapKit"],
    href: "https://github.com/itssamius",
    image: "/work/caravan.svg",
    featured: true,
  },
  {
    slug: "blackjack",
    name: "Blackjack",
    tagline: "Real-time multiplayer blackjack with a casino-style table UI.",
    category: "product",
    tags: ["Node", "WebSockets", "Fly.io"],
    href: "https://blackjack-sam.fly.dev",
    image: "/work/blackjack.svg",
    featured: true,
  },
  {
    slug: "fitness-tracker",
    name: "Fitness Tracker",
    tagline: "Carb-cycle cut planner with AI photo macro-logging.",
    category: "product",
    tags: ["Next.js", "AI", "Vercel"],
    href: "https://fitness-tracker-orpin-nu.vercel.app",
    image: "/work/fitness-tracker.svg",
    featured: true,
  },
  {
    slug: "beamng-mapmaker",
    name: "BeamNG MapMaker",
    tagline: "Generates real-world drivable maps for BeamNG from OSM + DEM elevation.",
    category: "product",
    tags: ["Python", "Blender", "3D"],
    href: "https://github.com/itssamius",
    image: "/work/beamng.svg",
  },
  {
    slug: "polymarket-copytrader",
    name: "Polymarket Copy-Trader",
    tagline: "Autonomous paper copy-trading bot for prediction markets.",
    category: "product",
    tags: ["Convex", "TypeScript"],
    href: "https://github.com/itssamius",
    image: "/work/polymarket.svg",
  },
  {
    slug: "trivia",
    name: "Trivia Live",
    tagline: "Real-time Kahoot-style multiplayer trivia.",
    category: "product",
    tags: ["React", "WebSockets"],
    href: "https://github.com/itssamius",
    image: "/work/trivia.svg",
  },
  // ---- Client work ----
  {
    slug: "cumbraes",
    name: "Cumbrae's",
    tagline: "E-commerce storefront for a top Toronto butcher shop.",
    category: "client",
    tags: ["Shopify", "Liquid"],
    href: "https://cumbraes.com/",
    image: "/work/cumbraes-hero.jpg",
  },
  {
    slug: "despana-nyc",
    name: "Despaña NYC",
    tagline: "Spanish gourmet food retailer storefront.",
    category: "client",
    tags: ["Shopify", "Liquid"],
    href: "https://despananyc.com/?loc=nyc",
    image: "/work/despananyc-hero.jpg",
  },
  {
    slug: "manetained",
    name: "Manetained",
    tagline: "Customizable beard-care e-commerce store.",
    category: "client",
    tags: ["Shopify", "Liquid"],
    href: "https://manetained.com/",
    image: "/work/manetained-hero.jpg",
  },
  {
    slug: "paramount-butchershop",
    name: "Paramount Butcher Shop",
    tagline: "Online ordering for a Toronto butcher shop.",
    category: "client",
    tags: ["Shopify", "Liquid"],
    href: "https://paramountbutchershop.com/",
    image: "/work/paramountbutchershop-hero.jpg",
  },
  {
    slug: "steak-and-chops",
    name: "Steak and Chops",
    tagline: "Premium meat delivery storefront.",
    category: "client",
    tags: ["Shopify", "Liquid"],
    href: "https://steakandchops.ca/",
    image: "/work/steakandchops-hero.jpg",
  },
  {
    slug: "tavora-foods",
    name: "Tavora Foods",
    tagline: "Grocery delivery storefront.",
    category: "client",
    tags: ["Shopify", "Liquid"],
    href: "https://shop.tavora.ca/",
    image: "/work/tavora-foods-hero.jpg",
  },
  {
    slug: "the-butcher-son",
    name: "The Butcher Son",
    tagline: "Butcher shop e-commerce storefront.",
    category: "client",
    tags: ["Shopify", "Liquid"],
    href: "https://thebutchersson.ca/",
    image: "/work/thebutchersson-hero.jpg",
  },
  {
    slug: "the-meat-department",
    name: "The Meat Department",
    tagline: "Online butcher storefront and ordering.",
    category: "client",
    tags: ["Shopify", "Liquid"],
    href: "https://themeatdepartment.ca/",
    image: "/work/themeatdepartment-hero.jpg",
  },
  {
    slug: "the-friendly-butcher",
    name: "The Friendly Butcher",
    tagline: "Neighbourhood butcher e-commerce storefront.",
    category: "client",
    tags: ["Shopify", "Liquid"],
    href: "https://thefriendlybutcher.com/",
    image: "/work/friendlybutchershop-hero.jpg",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export type FilterKey = "all" | ProjectCategory;

export function projectsByCategory(filter: FilterKey): Project[] {
  if (filter === "all") return projects;
  return projects.filter((p) => p.category === filter);
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm run test -- tests/projects.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(portfolio): site config and typed project data"
```

---

## Task 4: Shared UI primitives (Reveal, SectionLabel, Button, CountUp)

**Files:**
- Create: `components/ui/Reveal.tsx`, `components/ui/SectionLabel.tsx`, `components/ui/Button.tsx`, `components/ui/CountUp.tsx`, `tests/CountUp.test.tsx`, `tests/SectionLabel.test.tsx`

- [ ] **Step 1: Implement `components/ui/Reveal.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Implement `components/ui/Button.tsx`**

```tsx
import Link from "next/link";
import { clsx } from "@/lib/clsx";

type Variant = "primary" | "ghost";

export function Button({
  href,
  children,
  variant = "primary",
  className,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-accent text-accent-fg hover:opacity-90"
      : "border border-border text-fg hover:border-accent hover:text-accent";
  return (
    <Link href={href} className={clsx(base, styles, className)} {...rest}>
      {children}
    </Link>
  );
}
```

- [ ] **Step 3: Add tiny `lib/clsx.ts` helper**

`lib/clsx.ts`:
```ts
export function clsx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
```

- [ ] **Step 4: Write failing test for SectionLabel**

`tests/SectionLabel.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SectionLabel } from "@/components/ui/SectionLabel";

describe("SectionLabel", () => {
  it("renders the number and title", () => {
    render(<SectionLabel no="01" title="Selected Work" subtitle="Products & client builds" />);
    expect(screen.getByText("{01}")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Selected Work" })).toBeInTheDocument();
    expect(screen.getByText("Products & client builds")).toBeInTheDocument();
  });
});
```

- [ ] **Step 5: Run test to verify it fails**

Run: `npm run test -- tests/SectionLabel.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 6: Implement `components/ui/SectionLabel.tsx`**

```tsx
export function SectionLabel({
  no,
  title,
  subtitle,
}: {
  no: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-10 md:mb-16">
      <span className="font-mono text-sm text-accent">{`{${no}}`}</span>
      <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">{title}</h2>
      {subtitle && <p className="mt-3 text-muted">{subtitle}</p>}
    </div>
  );
}
```

- [ ] **Step 7: Write failing test for CountUp**

`tests/CountUp.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CountUp } from "@/components/ui/CountUp";

describe("CountUp", () => {
  it("renders the final value and suffix immediately when reduced motion", () => {
    render(<CountUp value={60} suffix="%" />);
    expect(screen.getByText(/60%/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 8: Run test to verify it fails**

Run: `npm run test -- tests/CountUp.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 9: Implement `components/ui/CountUp.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1200;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}
```

Note: the test relies on `useReducedMotion` returning truthy in jsdom (no matchMedia). Add to `vitest.setup.ts`:
```ts
// jsdom has no matchMedia; default to reduced motion in tests
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: query.includes("reduce"),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }),
});
```

- [ ] **Step 10: Run tests to verify they pass**

Run: `npm run test -- tests/CountUp.test.tsx tests/SectionLabel.test.tsx`
Expected: PASS.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat(portfolio): shared UI primitives (Reveal, SectionLabel, Button, CountUp)"
```

---

## Task 5: Header (sticky nav + toggle + CTA)

**Files:**
- Create: `components/layout/Header.tsx`, `tests/Header.test.tsx`

- [ ] **Step 1: Write the failing test**

`tests/Header.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Header } from "@/components/layout/Header";

vi.mock("next-themes", () => ({ useTheme: () => ({ resolvedTheme: "dark", setTheme: vi.fn() }) }));

describe("Header", () => {
  it("renders the name mark and nav links", () => {
    render(<Header />);
    expect(screen.getByText("Samuel Abera")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("href", "#work");
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- tests/Header.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `components/layout/Header.tsx`**

```tsx
"use client";

import Link from "next/link";
import { site } from "@/lib/site";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-container items-center justify-between px-6 py-4">
        <Link href="#top" className="font-display text-lg font-bold tracking-tight">
          {site.name}
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-muted transition-colors hover:text-fg">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button href="#contact" className="hidden sm:inline-flex">Let&apos;s talk</Button>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- tests/Header.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(portfolio): sticky header with nav, theme toggle, CTA"
```

---

## Task 6: Hero section

**Files:**
- Create: `components/sections/Hero.tsx`, `tests/Hero.test.tsx`

- [ ] **Step 1: Write the failing test**

`tests/Hero.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Hero } from "@/components/sections/Hero";

describe("Hero", () => {
  it("renders the headline and the three featured projects", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("I build software that ships.");
    expect(screen.getByText("Caravan")).toBeInTheDocument();
    expect(screen.getByText("Blackjack")).toBeInTheDocument();
    expect(screen.getByText("Fitness Tracker")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- tests/Hero.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `components/sections/Hero.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { featuredProjects } from "@/lib/projects";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-container px-6 pb-16 pt-20 md:pb-24 md:pt-32">
      <Reveal>
        <h1 className="max-w-4xl font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-8xl">
          {site.heroHeadline}
        </h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-6 max-w-xl text-lg text-muted">{site.heroSub}</p>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((p, i) => (
          <Reveal key={p.slug} delay={0.15 + i * 0.08}>
            <Link
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-2xl border border-border bg-bg-elev transition-colors hover:border-accent"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex items-center justify-between p-5">
                <span className="font-display text-lg font-semibold">{p.name}</span>
                <ArrowUpRight size={18} className="text-muted transition-colors group-hover:text-accent" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- tests/Hero.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(portfolio): hero with headline and featured project trio"
```

---

## Task 7: Work section with filter + WorkCard

**Files:**
- Create: `components/sections/WorkCard.tsx`, `components/sections/Work.tsx`, `tests/Work.test.tsx`

- [ ] **Step 1: Implement `components/sections/WorkCard.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

export function WorkCard({ project }: { project: Project }) {
  return (
    <Link
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-bg-elev transition-colors hover:border-accent"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl font-semibold">{project.name}</h3>
          <ArrowUpRight size={18} className="mt-1 shrink-0 text-muted transition-colors group-hover:text-accent" />
        </div>
        <p className="mt-2 text-sm text-muted">{project.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="rounded-full border border-border px-3 py-1 text-xs text-muted">
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Write the failing test for Work filtering**

`tests/Work.test.tsx`:
```tsx
import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Work } from "@/components/sections/Work";

describe("Work", () => {
  it("shows all projects by default and filters by category", () => {
    render(<Work />);
    const grid = screen.getByTestId("work-grid");

    // default: all 15 projects (6 products + 9 client)
    expect(within(grid).getAllByRole("link")).toHaveLength(15);

    fireEvent.click(screen.getByRole("button", { name: "Client Work" }));
    expect(within(grid).getAllByRole("link")).toHaveLength(9);

    fireEvent.click(screen.getByRole("button", { name: "Products" }));
    expect(within(grid).getAllByRole("link")).toHaveLength(6);

    fireEvent.click(screen.getByRole("button", { name: "All" }));
    expect(within(grid).getAllByRole("link")).toHaveLength(15);
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm run test -- tests/Work.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 4: Implement `components/sections/Work.tsx`**

```tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projectsByCategory, type FilterKey } from "@/lib/projects";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WorkCard } from "@/components/sections/WorkCard";
import { clsx } from "@/lib/clsx";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "product", label: "Products" },
  { key: "client", label: "Client Work" },
];

export function Work() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const items = projectsByCategory(filter);

  return (
    <section id="work" className="mx-auto max-w-container px-6 py-20 md:py-28">
      <SectionLabel no="01" title="Selected Work" subtitle="Products & client builds" />

      <div className="mb-10 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={clsx(
              "rounded-full px-4 py-2 text-sm transition-colors",
              filter === f.key
                ? "bg-accent text-accent-fg"
                : "border border-border text-muted hover:text-fg"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div data-testid="work-grid" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              <WorkCard project={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm run test -- tests/Work.test.tsx`
Expected: PASS. *(If AnimatePresence exit timing flakes in jsdom, the assertions check post-click state which framer-motion applies synchronously enough; if flaky, wrap assertions in `await screen.findAllByRole`.)*

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(portfolio): work section with category filter and cards"
```

---

## Task 8: About + Skills

**Files:**
- Create: `components/sections/About.tsx`, `components/sections/Skills.tsx`, `tests/About.test.tsx`

- [ ] **Step 1: Write the failing test**

`tests/About.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { About } from "@/components/sections/About";

describe("About", () => {
  it("renders bio and the three capability columns", () => {
    render(<About />);
    expect(screen.getByText(/5\+ years/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Full-Stack Web" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "E-commerce" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Apps & Systems" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- tests/About.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `components/sections/Skills.tsx`**

```tsx
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

export function Skills() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {site.skills.map((col, i) => (
        <Reveal key={col.title} delay={i * 0.08}>
          <div className="rounded-2xl border border-border bg-bg-elev p-6">
            <span className="font-mono text-sm text-accent">{`{${col.no}}`}</span>
            <h3 className="mt-3 font-display text-xl font-semibold">{col.title}</h3>
            <ul className="mt-4 space-y-2">
              {col.items.map((item) => (
                <li key={item} className="text-sm text-muted">{item}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Implement `components/sections/About.tsx`**

```tsx
import Image from "next/image";
import { site } from "@/lib/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Skills } from "@/components/sections/Skills";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-container px-6 py-20 md:py-28">
      <SectionLabel no="02" title="About" />
      <div className="mb-16 grid items-center gap-10 md:grid-cols-[280px_1fr]">
        <Reveal>
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border">
            <Image src="/headshot.jpg" alt={site.name} fill className="object-cover" sizes="280px" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-2xl text-2xl leading-relaxed md:text-3xl">{site.bio}</p>
          <p className="mt-6 text-muted">{site.role} · {site.location}</p>
        </Reveal>
      </div>
      <Skills />
    </section>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm run test -- tests/About.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(portfolio): about bio + 3-column skills"
```

---

## Task 9: Stats section

**Files:**
- Create: `components/sections/Stats.tsx`, `tests/Stats.test.tsx`

- [ ] **Step 1: Write the failing test**

`tests/Stats.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Stats } from "@/components/sections/Stats";

describe("Stats", () => {
  it("renders all stat labels and values", () => {
    render(<Stats />);
    expect(screen.getByText("Years experience")).toBeInTheDocument();
    expect(screen.getByText("Projects shipped")).toBeInTheDocument();
    expect(screen.getByText(/60%/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- tests/Stats.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `components/sections/Stats.tsx`**

```tsx
import { site } from "@/lib/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";

export function Stats() {
  return (
    <section className="mx-auto max-w-container px-6 py-20 md:py-28">
      <SectionLabel no="03" title="By the numbers" />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {site.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="border-t border-border pt-6">
              <div className="font-display text-5xl font-bold md:text-6xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-3 text-sm text-muted">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- tests/Stats.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(portfolio): animated stats section"
```

---

## Task 10: Contact + Footer

**Files:**
- Create: `components/sections/Contact.tsx`, `components/layout/Footer.tsx`, `tests/Contact.test.tsx`

- [ ] **Step 1: Write the failing test**

`tests/Contact.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Contact } from "@/components/sections/Contact";

describe("Contact", () => {
  it("renders the closing CTA with a mailto link", () => {
    render(<Contact />);
    expect(screen.getByRole("heading", { name: /let's build something/i })).toBeInTheDocument();
    const mail = screen.getByRole("link", { name: /samuel@abera\.io/i });
    expect(mail).toHaveAttribute("href", "mailto:samuel@abera.io");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- tests/Contact.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `components/sections/Contact.tsx`**

```tsx
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-container px-6 py-24 md:py-36">
      <Reveal>
        <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-8xl">
          Let&apos;s build something.
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-lg">
          <a href={`mailto:${site.email}`} className="text-accent underline-offset-4 hover:underline">
            {site.email}
          </a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg">
            GitHub ↗
          </a>
          <span className="text-muted">{site.phone}</span>
        </div>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 4: Implement `components/layout/Footer.tsx`**

```tsx
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-container flex-col items-start justify-between gap-4 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <div className="flex gap-6">
          <a href={`mailto:${site.email}`} className="hover:text-fg">Email</a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-fg">GitHub</a>
        </div>
        <span>Built with Next.js</span>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm run test -- tests/Contact.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(portfolio): contact CTA and footer"
```

---

## Task 11: Compose page, assets, SEO

**Files:**
- Modify: `app/page.tsx`, `app/layout.tsx`
- Copy: real images into `public/`
- Create: product placeholder SVGs in `public/work/`, `app/icon.svg` (favicon)

- [ ] **Step 1: Copy real assets from the archived app**

```bash
cd projects/portfolio
mkdir -p public/work
cp _legacy/src/assets/image/jpg/hero-image.jpeg public/headshot.jpg
cp _legacy/src/assets/image/jpg/sites/*.jpg public/work/
ls public public/work
```
Expected: `public/headshot.jpg` plus the 9 `*-hero.jpg` client screenshots in `public/work/`.

- [ ] **Step 2: Create product placeholder images**

For each product slug without a real screenshot, create a branded gradient SVG so `next/image` has a valid source. Create `public/work/_placeholder.mjs` is unnecessary — instead create the SVGs directly. Example `public/work/caravan.svg`:
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1a1a1a"/>
      <stop offset="1" stop-color="#2a2118"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <text x="40" y="320" font-family="sans-serif" font-size="56" font-weight="700" fill="#FF8A3D">Caravan</text>
</svg>
```
Repeat for: `blackjack.svg`, `fitness-tracker.svg`, `beamng.svg`, `polymarket.svg`, `trivia.svg` (change the `<text>` label each time). Verify every `image` path in `lib/projects.ts` now resolves to a file in `public/`.

- [ ] **Step 3: Compose `app/page.tsx`**

```tsx
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { Stats } from "@/components/sections/Stats";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Work />
        <About />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Add favicon + Open Graph metadata in `app/layout.tsx`**

Add to the existing `metadata` export:
```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://samuelabera.com"),
  title: "Samuel Abera — Senior Full Stack Developer",
  description:
    "Senior full-stack developer in Toronto building e-commerce, apps, and products with React, Rails, and TypeScript.",
  openGraph: {
    title: "Samuel Abera — Senior Full Stack Developer",
    description: "Senior full-stack developer in Toronto. React · Rails · TypeScript.",
    type: "website",
  },
};
```
Create `app/icon.svg`:
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0a0a0a"/>
  <text x="32" y="44" text-anchor="middle" font-family="sans-serif" font-size="34" font-weight="800" fill="#FF8A3D">SA</text>
</svg>
```

- [ ] **Step 5: Run the full test suite**

Run: `npm run test`
Expected: all suites PASS.

- [ ] **Step 6: Build and verify**

Run: `npm run build`
Expected: "Compiled successfully"; `/` prerendered; no type or lint errors; no missing-image warnings.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(portfolio): compose homepage, real assets, SEO + favicon"
```

---

## Task 12: Manual visual QA + reduced-motion + responsive

**Files:** none (verification task); fixes land in the relevant component files.

- [ ] **Step 1: Run dev server and walk the page**

Run: `npm run dev` then open `http://localhost:3000`.
Check: dark loads by default; toggle switches to light and persists on reload; hero type is large/editorial; featured trio shows real screenshots/placeholders; Work filter swaps grids smoothly; About shows the headshot; Stats count up on scroll; Contact mailto works.

- [ ] **Step 2: Responsive check**

In devtools, verify 375px (mobile), 768px (tablet), 1280px (desktop): nav collapses CTA on small screens, grids reflow to 1/2/3 columns, no horizontal scroll.

- [ ] **Step 3: Reduced-motion check**

Enable "Reduce motion" in OS/devtools; reload. Reveals should appear without large translate animation; count-up shows final values immediately.

- [ ] **Step 4: Accessibility pass**

Tab through the page: header links, theme toggle, all cards, contact links are reachable and show a visible focus ring (add `focus-visible:ring-2 focus-visible:ring-accent` to interactive elements if missing). Confirm contrast of amber accent on both backgrounds is legible.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix(portfolio): visual QA, responsive, a11y, reduced-motion polish"
```

---

## Task 13: Deploy to Vercel (optional, when Sam is ready)

**Files:** none.

- [ ] **Step 1: Build locally one more time** — `npm run build` passes.
- [ ] **Step 2: Deploy** — from `projects/portfolio`, run `npx vercel` (preview) then `npx vercel --prod`, or push the branch and import in the Vercel dashboard. **Confirm with Sam before deploying** (publishing public content).
- [ ] **Step 3: Set the production domain** if Sam has one; update `metadataBase` accordingly.

---

## Self-review

**Spec coverage:**
- Tech stack (Next 15 + Tailwind + Framer Motion + next-themes) → Tasks 1–2 ✓
- Dark-first + light toggle, tokenized amber accent → Task 2 ✓
- Archive old code to `_legacy/` → Task 1 ✓
- Header / Hero (featured trio Caravan·Blackjack·Fitness Tracker) → Tasks 5–6 ✓
- Selected Work with Products/Client filter, 9 real client sites → Tasks 3, 7 ✓
- About + 3-col Skills from resume, real headshot → Task 8, 11 ✓
- Stats (5+/15+/9/60%) → Tasks 3, 9 ✓
- Contact CTA (email + GitHub @itssamius) + Footer → Task 10 ✓
- SEO/favicon, assets → Task 11 ✓
- Responsive / a11y / reduced-motion / Lighthouse → Tasks 2, 12 ✓
- Deploy → Task 13 ✓

**Placeholder scan:** Product screenshots are intentionally generated SVG placeholders (spec §5 marks them partial); every other step contains concrete code. No "TBD"/"TODO" steps.

**Type consistency:** `Project`, `ProjectCategory`, `FilterKey`, `projectsByCategory`, `featuredProjects` are defined in Task 3 and used identically in Tasks 6–7. `site.stats`/`site.skills`/`site.nav` shapes defined in Task 3 match their consumers in Tasks 5, 8, 9. `clsx` defined in Task 4 (Step 3) before use. `CountUp` props (`value`, `suffix`) consistent between Tasks 4 and 9.
