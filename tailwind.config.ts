import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#faf7f2",
        card: "#ffffff",
        ink: "#1a1a1a",
        muted: "#6b6b6b",
        line: "#ebe5d9",
        accent: "#c0492a",
        "accent-soft": "#fce8df",
        soft: "#f4ede0",
        ok: "#2d7a3d",
        rami: "#c0492a",
        tomi: "#4a6b8a",
        nati: "#a855a8",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
