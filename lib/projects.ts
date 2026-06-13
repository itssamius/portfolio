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
