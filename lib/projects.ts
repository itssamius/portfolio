import { caseStudies } from "@/lib/caseStudies";

export type ProjectCategory = "product" | "client";

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  category: ProjectCategory;
  tags: string[];
  /** Live URL. Omitted when the site no longer loads. */
  href?: string;
  image: string;
  featured?: boolean;
}

export const projects: Project[] = [
  // ---- Products ----
  // Only products with a live URL and a real screenshot belong here.
  {
    slug: "journey",
    name: "Journey",
    tagline: "Trip planner that lays a multi-city trip out as one route.",
    category: "product",
    tags: ["React", "SQLite", "WebSockets"],
    href: "https://journey-abera.fly.dev",
    image: "/work/journey.jpg",
    featured: true,
  },
  {
    slug: "blackjack",
    name: "Blackjack",
    tagline: "Multiplayer blackjack for friends. Share a room code, no sign-up.",
    category: "product",
    tags: ["Node", "socket.io", "Fly.io"],
    href: "https://blackjack-sam.fly.dev",
    image: "/work/blackjack.jpg",
    featured: true,
  },
  {
    slug: "folio",
    name: "Folio",
    tagline: "Site builder for designers, photographers and small studios.",
    category: "product",
    tags: ["Next.js", "Payload CMS", "SQLite"],
    href: "https://makerfol.com",
    image: "/work/folio.jpg",
    featured: true,
  },
  {
    slug: "plot-locator",
    name: "Plot Locator",
    tagline: "Parcel map for parts of Ontario: boundary, lot area and zoning.",
    category: "product",
    tags: ["React", "MapLibre", "PostGIS"],
    href: "https://plot-locator-abera.fly.dev",
    image: "/work/plot-locator.jpg",
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
    image: "/work/manetained-hero.jpg",
  },
  {
    slug: "paramount-butchershop",
    name: "Paramount Butcher Shop",
    tagline: "Online ordering for a Toronto butcher shop.",
    category: "client",
    tags: ["Shopify", "Liquid"],
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
    href: "https://friendlybutchershop.com/",
    image: "/work/friendlybutchershop-hero.jpg",
  },
];

/** Where a card goes: its case study if it has one, else the live site, else nowhere. */
export function projectLink(p: Project): { href: string; external: boolean } | null {
  if (p.slug in caseStudies) return { href: `/work/${p.slug}`, external: false };
  if (p.href) return { href: p.href, external: true };
  return null;
}

export const featuredProjects = projects.filter((p) => p.featured);

export type FilterKey = "all" | ProjectCategory;

export function projectsByCategory(filter: FilterKey): Project[] {
  if (filter === "all") return projects;
  return projects.filter((p) => p.category === filter);
}
