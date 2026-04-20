import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["'Cabinet Grotesk'", "'Plus Jakarta Sans'", "sans-serif"],
        body: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      colors: {
        ye: {
          blue:    "#044ead",
          dark:    "#033d94",
          deeper:  "#022d6e",
          ink:     "#04102b",
          light:   "#e8f0fb",
          mid:     "#1a5fc0",
          muted:   "#6b7ea8",
          border:  "#dbe5f5",
          off:     "#f4f7fe",
          accent:  "#ff6b35",
        },
      },
      boxShadow: {
        "blue-sm":  "0 4px 20px rgba(4,78,173,0.15)",
        "blue-md":  "0 8px 40px rgba(4,78,173,0.22)",
        "blue-lg":  "0 16px 60px rgba(4,78,173,0.30)",
        "white-glow": "0 0 60px rgba(255,255,255,0.15)",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #044ead 0%, #022d6e 60%, #04102b 100%)",
        "blue-glow": "radial-gradient(ellipse at center, rgba(4,78,173,0.4) 0%, transparent 70%)",
        "card-shine": "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)",
      },
      keyframes: {
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.08)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "floatY 6s ease-in-out infinite",
        shimmer: "shimmer 4s linear infinite",
        "glow-pulse": "glowPulse 4s ease-in-out infinite",
        "fade-up": "fadeUp 0.7s ease forwards",
      },
    },
  },
  plugins: [],
};
export default config;

