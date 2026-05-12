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
        // shadcn carry-over (consumed by existing UI components)
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
        // v3 brutalist skate-zine palette (raw — no HSL var dance)
        paper: {
          DEFAULT: "#F1EAD7",
          deep: "#E6DDC5",
          warm: "#EDE3C9",
        },
        ink: {
          DEFAULT: "#0E0D0B",
          soft: "#2A2722",
        },
        steeze: {
          red: "#FF2D2D",
          "red-d": "#D9201A",
          blue: "#2547F0",
          "blue-d": "#1A37CC",
          lime: "#D3F046",
          "lime-d": "#B5D028",
        },
      },
      fontFamily: {
        sans: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-space-mono)", "var(--font-jetbrains-mono)", "monospace"],
        sticker: ["var(--font-permanent-marker)", "cursive"],
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
        ticker: {
          to: { transform: "translateX(-50%)" },
        },
        spin: {
          to: { transform: "rotate(360deg)" },
        },
        blink: {
          "50%": { opacity: "0" },
        },
        bob: {
          "0%, 100%": { transform: "translateY(0) rotate(-8deg)" },
          "50%": { transform: "translateY(-8px) rotate(-4deg)" },
        },
        "pulse-dot": {
          "0%": { boxShadow: "0 0 0 0 rgba(211, 240, 70, 0.7)" },
          "70%": { boxShadow: "0 0 0 8px rgba(211, 240, 70, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(211, 240, 70, 0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "ticker-fast": "ticker 30s linear infinite",
        "ticker-slow": "ticker 45s linear infinite",
        "ticker-status": "ticker 60s linear infinite",
        spin: "spin 8s linear infinite",
        "spin-fast": "spin 6s linear infinite",
        blink: "blink 0.9s step-end infinite",
        bob: "bob 4s ease-in-out infinite",
        "pulse-dot": "pulse-dot 1.8s infinite",
      },
      boxShadow: {
        hard: "4px 4px 0 #0E0D0B",
        "hard-r": "4px 4px 0 #FF2D2D",
        "hard-b": "4px 4px 0 #2547F0",
        "hard-l": "4px 4px 0 #D3F046",
        "hard-lg": "6px 6px 0 #0E0D0B",
        "hard-lg-r": "6px 6px 0 #FF2D2D",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
