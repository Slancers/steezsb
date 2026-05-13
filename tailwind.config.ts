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
        // shadcn carry-over (HSL components consumed by existing UI)
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

        // v4 SKATE GARDEN palette — sun-drenched, calm, photo-led
        sky: {
          DEFAULT: "#C8DDEE",
          deep: "#A8C5E0",
          light: "#E2EDF6",
        },
        sand: {
          DEFAULT: "#F5EBDA",
          deep: "#E9DCC1",
          warm: "#F2E2C6",
        },
        sage: {
          DEFAULT: "#7FA46B",
          deep: "#5E8550",
          light: "#A8C496",
        },
        sun: {
          DEFAULT: "#F5C25B",
          deep: "#E0A737",
          light: "#FBDC9A",
        },
        terracotta: {
          DEFAULT: "#D67A52",
          deep: "#B25D38",
          light: "#E6A082",
        },
        concrete: {
          DEFAULT: "#B5B0A8",
          deep: "#8F8B83",
          light: "#D4D0C8",
        },
        ink: {
          DEFAULT: "#2A2826",
          soft: "#4A4642",
        },

        // v3 carry-over aliases (kept so old code doesn't break during reskin)
        paper: {
          DEFAULT: "#F5EBDA",
          deep: "#E9DCC1",
          warm: "#F2E2C6",
        },
        steeze: {
          red: "#D67A52",
          "red-d": "#B25D38",
          blue: "#7FA46B",
          "blue-d": "#5E8550",
          lime: "#F5C25B",
          "lime-d": "#E0A737",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sticker: ["var(--font-fraunces)", "Georgia", "serif"],
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
          "0%, 100%": { transform: "translateY(0) rotate(-2deg)" },
          "50%": { transform: "translateY(-6px) rotate(2deg)" },
        },
        "pulse-dot": {
          "0%": { boxShadow: "0 0 0 0 rgba(127, 164, 107, 0.6)" },
          "70%": { boxShadow: "0 0 0 8px rgba(127, 164, 107, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(127, 164, 107, 0)" },
        },
        // v4: slow Ken Burns zoom on hero photos
        "ken-burns": {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.08) translate(-1%, -1%)" },
        },
        // v4: soft glow on sun mark
        "sun-glow": {
          "0%, 100%": { opacity: "0.85", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" },
        },
        // v4: subtle leaf sway
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
        blink: "blink 1.4s step-end infinite",
        bob: "bob 5s ease-in-out infinite",
        "pulse-dot": "pulse-dot 2.4s infinite",
        "ken-burns": "ken-burns 14s ease-in-out infinite alternate",
        "sun-glow": "sun-glow 4.5s ease-in-out infinite",
        "leaf-sway": "leaf-sway 6s ease-in-out infinite",
      },
      boxShadow: {
        // v4: soft natural drop shadows replace v3 hard offset shadows
        soft: "0 2px 8px rgba(42, 40, 38, 0.06), 0 8px 24px rgba(42, 40, 38, 0.08)",
        "soft-lg": "0 4px 16px rgba(42, 40, 38, 0.08), 0 16px 48px rgba(42, 40, 38, 0.12)",
        "soft-warm": "0 4px 16px rgba(214, 122, 82, 0.15), 0 12px 32px rgba(214, 122, 82, 0.08)",
        // v3 carry-over (still used by old chips/buttons until reskinned)
        hard: "0 2px 8px rgba(42, 40, 38, 0.08)",
        "hard-r": "0 4px 16px rgba(214, 122, 82, 0.18)",
        "hard-b": "0 4px 16px rgba(127, 164, 107, 0.18)",
        "hard-l": "0 4px 16px rgba(245, 194, 91, 0.22)",
        "hard-lg": "0 6px 24px rgba(42, 40, 38, 0.10)",
        "hard-lg-r": "0 6px 24px rgba(214, 122, 82, 0.22)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
