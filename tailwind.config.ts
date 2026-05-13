import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1320px" },
    },
    extend: {
      colors: {
        // shadcn carry-over
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // v6 BARRY'S-INSPIRED palette — dark canvas, cream type, pure red energy
        night: {
          DEFAULT: "#0E0D0B",      // near-black canvas
          deep: "#000000",         // pure black sections
          soft: "#1A1815",         // softer black for elevation
          line: "#2A2622",         // borders/dividers on dark
        },
        cream: {
          DEFAULT: "#F1EAD7",      // primary text on dark
          deep: "#E6DDC5",         // dimmer body text
          dim: "#8E8779",          // muted captions
        },
        steeze: {
          // Pure red — primary energy color, Barry's-style
          red: "#E10A0A",
          "red-d": "#B30808",
          "red-bright": "#FF1F1F",
          // Carry-over warm/cool accents
          blue: "#2547F0",
          "blue-d": "#1A37CC",
          lime: "#D3F046",
          "lime-d": "#B5D028",
        },
        // Legacy v4/v5 aliases — kept so older components don't break.
        // Repointed to night/cream so dark-mode pages still render.
        sand: {
          DEFAULT: "#F1EAD7",
          deep: "#E6DDC5",
          warm: "#EDE3C9",
          light: "#F5EEDE",
        },
        sky: {
          DEFAULT: "#0E0D0B",
          deep: "#000000",
          light: "#1A1815",
        },
        sage: {
          DEFAULT: "#E10A0A",
          deep: "#B30808",
          light: "#FF4A4A",
        },
        sun: {
          DEFAULT: "#F5C25B",
          deep: "#E0A737",
          light: "#FBDC9A",
        },
        terracotta: {
          DEFAULT: "#E10A0A",
          deep: "#B30808",
          light: "#FF4A4A",
        },
        concrete: {
          DEFAULT: "#2A2622",
          deep: "#1A1815",
          light: "#4A4642",
        },
        ink: {
          DEFAULT: "#F1EAD7",
          soft: "#E6DDC5",
        },
        paper: {
          DEFAULT: "#0E0D0B",
          deep: "#000000",
          warm: "#1A1815",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-bebas)", "Impact", "sans-serif"],
        sticker: ["var(--font-bebas)", "Impact", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        ticker: { to: { transform: "translateX(-50%)" } },
        spin: { to: { transform: "rotate(360deg)" } },
        blink: { "50%": { opacity: "0" } },
        bob: {
          "0%, 100%": { transform: "translateY(0) rotate(-2deg)" },
          "50%": { transform: "translateY(-6px) rotate(2deg)" },
        },
        "pulse-dot": {
          "0%": { boxShadow: "0 0 0 0 rgba(225, 10, 10, 0.65)" },
          "70%": { boxShadow: "0 0 0 8px rgba(225, 10, 10, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(225, 10, 10, 0)" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.08) translate(-1%, -1%)" },
        },
        "sun-glow": {
          "0%, 100%": { opacity: "0.85", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" },
        },
        "leaf-sway": {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "ticker-fast": "ticker 30s linear infinite",
        "ticker-slow": "ticker 45s linear infinite",
        "ticker-status": "ticker 60s linear infinite",
        spin: "spin 12s linear infinite",
        "spin-fast": "spin 8s linear infinite",
        blink: "blink 1.2s step-end infinite",
        bob: "bob 5s ease-in-out infinite",
        "pulse-dot": "pulse-dot 2.4s infinite",
        "ken-burns": "ken-burns 14s ease-in-out infinite alternate",
        "sun-glow": "sun-glow 4.5s ease-in-out infinite",
        "leaf-sway": "leaf-sway 6s ease-in-out infinite",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.4), 0 8px 24px rgba(0, 0, 0, 0.3)",
        "soft-lg": "0 4px 16px rgba(0, 0, 0, 0.5), 0 16px 48px rgba(0, 0, 0, 0.4)",
        "soft-warm": "0 4px 16px rgba(225, 10, 10, 0.25), 0 12px 32px rgba(225, 10, 10, 0.15)",
        hard: "0 2px 8px rgba(0, 0, 0, 0.5)",
        "hard-r": "0 4px 16px rgba(225, 10, 10, 0.35)",
        "hard-b": "0 4px 16px rgba(225, 10, 10, 0.25)",
        "hard-l": "0 4px 16px rgba(245, 194, 91, 0.30)",
        "hard-lg": "0 8px 28px rgba(0, 0, 0, 0.5)",
        "hard-lg-r": "0 8px 28px rgba(225, 10, 10, 0.40)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
