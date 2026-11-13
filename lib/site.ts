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
    { label: "Work", href: "/#work" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
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
