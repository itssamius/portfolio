export interface CaseStudy {
  intro: string;
  stack: string[];
  sections: { title: string; body: string[] }[];
}

// Every statement here comes from the project's own README, notes or test run.
// Keep it that way: no numbers that cannot be pointed at.
export const caseStudies: Record<string, CaseStudy> = {
  journey: {
    intro:
      "Journey is a trip planner for trips that cover more than one city. Each city, stay and move sits on a single route with a map, and a trip can be shared with the people coming along.",
    stack: ["React 18", "Vite", "TypeScript", "Tailwind", "Mapbox GL", "Clerk", "Node", "SQLite", "WebSockets", "Fly.io"],
    sections: [
      {
        title: "The problem",
        body: [
          "The first version ran on Convex, a hosted backend. I wanted the whole app on one small machine with a local database, without giving up the live updates the screens depend on.",
        ],
      },
      {
        title: "What I built",
        body: [
          "A Node server with SQLite and a WebSocket on one port, using Node's built-in HTTP module instead of a web framework. It reimplements the part of the Convex API the app used, so the 117 query and mutation calls in the frontend did not change and 15 server modules moved over with only their imports edited. Keeping those modules intact also kept the sharing and permission rules exactly as they were.",
          "It runs on a single Fly.io machine that stops when nobody has the app open and starts again in about five seconds. The server has more than 100 tests on Node's built-in test runner.",
        ],
      },
      {
        title: "One bug worth describing",
        body: [
          "An empty database path in an env file made the SQLite driver open an in-memory database. The server booted, accepted writes, and lost all of them on restart. The cause was a default that replaced a missing value but not an empty one. The fix was a blank check.",
        ],
      },
      {
        title: "Limits today",
        body: [
          "You need to sign in to plan your own trip. Invites are links you copy and send yourself; the app does not email them.",
        ],
      },
    ],
  },
  blackjack: {
    intro:
      "Blackjack for a group of friends in the browser. One person sets up a table and picks the rules, shares the room code, and everyone joins with a nickname. There are no accounts and the chips are play money.",
    stack: ["React 18", "Vite", "zustand", "Node", "Express", "socket.io", "Vitest", "Playwright", "Fly.io"],
    sections: [
      {
        title: "What I built",
        body: [
          "A monorepo with the game rules in their own engine package, a socket.io server that owns every table's state, and a React client. The host chooses the table rules: number of decks, whether the dealer hits soft 17, the blackjack payout, splits, surrender, insurance, bet limits and the turn timer.",
          "The suite has 347 tests: 156 for the engine, 108 for the server and 83 for the web client. The server accepts a seeded random source, so splits, doubles and insurance can be played through the same way every time in a test.",
          "A full two-player test against the live site covered payouts, a refresh in the middle of a hand that reconnects to the same seat, the host removing a player, and chat.",
        ],
      },
      {
        title: "One bug worth describing",
        body: [
          "While testing on the live site, a half-built bet kept disappearing. When nobody bet for 30 seconds the server reopened the betting window with a new round number, and the client cleared the chip stack every time the round number changed. The fix was to clear it only when the betting phase ends. Two regression tests cover it, and I checked the fix on the live site.",
        ],
      },
      {
        title: "Hosting",
        body: [
          "One small Fly.io machine that suspends when idle. A deploy check refuses a second machine, because two machines would split players across two lobbies.",
        ],
      },
      {
        title: "Limits today",
        body: [
          "Tables live in server memory, so a deploy or restart ends every game in progress. Nothing is saved between visits.",
        ],
      },
    ],
  },
  folio: {
    intro:
      "Folio is a site builder for designers, photographers and small studios. You build pages from sections in a block editor, pick a theme, and publish.",
    stack: ["Next.js 16", "React 19", "Payload CMS 3", "SQLite", "Tailwind 4", "Fly.io"],
    sections: [
      {
        title: "The problem",
        body: [
          "Folio is a rewrite of an older version built on Clerk, Convex and Vercel. The new version keeps its data in SQLite, which needs a disk that survives deploys, so it moved to Payload CMS on a Fly.io machine with a volume.",
        ],
      },
      {
        title: "What I built",
        body: [
          "A block editor with about 31 section types and 82 layouts. Adding a section type takes one content module, one component and one CSS file, with no database schema change.",
          "Publishing creates a release that never changes afterwards. Each release is parsed again and checked against its hash every time it is read.",
          "The app runs on a single machine on purpose, because SQLite has one writer. It stops when idle and takes about seven seconds to start again.",
        ],
      },
      {
        title: "Two bugs worth describing",
        body: [
          "Uploads and publishing passed in tests and failed in the real build. Next.js bundles each route separately but shares one Payload instance, so a marker created with Symbol() in one bundle did not match the same marker in another. Switching to Symbol.for() fixed it.",
          "Every POST failed in production behind Fly's proxy because the origin check compared against the request URL, which the proxy rewrites. The check now compares the Origin header with the Host header.",
        ],
      },
      {
        title: "Limits today",
        body: [
          "Billing and custom domains are built but not switched on, so the paid plans on the pricing page are marked as coming soon.",
        ],
      },
    ],
  },
};
