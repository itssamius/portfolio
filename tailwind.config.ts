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
