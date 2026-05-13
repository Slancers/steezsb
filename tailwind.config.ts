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
      padding: { DEFAULT: "16px", md: "48px" },
      screens: { "2xl": "1280px" },
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
          DEFAULT: "#99420d",
          foreground: "#ffffff",
          container: "#b95925",
          fixed: "#ffdbcc",
          "fixed-dim": "#ffb693",
        },
        secondary: {
          DEFAULT: "#5f5e5e",
          foreground: "#ffffff",
          container: "#e2dfde",
          fixed: "#e5e2e1",
          "fixed-dim": "#c8c6c5",
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
          DEFAULT: "#C4622D",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#f9f9f9",
          foreground: "#1a1c1c",
        },
        card: {
          DEFAULT: "#f9f9f9",
          foreground: "#1a1c1c",
        },

        // v8 STITCH "Skate Editorial" tokens (Material Design 3 naming)
        surface: {
          DEFAULT: "#f9f9f9",
          bright: "#f9f9f9",
          dim: "#dadada",
          tint: "#9c440f",
          variant: "#e2e2e2",
          container: "#eeeeee",
          "container-low": "#f3f3f4",
          "container-lowest": "#ffffff",
          "container-high": "#e8e8e8",
          "container-highest": "#e2e2e2",
        },
        "on-surface": {
          DEFAULT: "#1a1c1c",
          variant: "#56433a",
        },
        "inverse-surface": "#2f3131",
        "inverse-on-surface": "#f0f1f1",
        "inverse-primary": "#ffb693",
        outline: {
          DEFAULT: "#897268",
          variant: "#dcc1b5",
        },
        // STEEZ brand accent — Stitch's terracotta
        terracotta: {
          DEFAULT: "#C4622D",
          deep: "#99420d",
          light: "#ffb693",
        },

        // Legacy v3/v4/v5/v7 aliases — repointed to Stitch tokens so older
        // pages don't break during the v8 reskin. Most points to surface/ink.
        sand: {
          DEFAULT: "#f9f9f9",
          deep: "#eeeeee",
          warm: "#f3f3f4",
          light: "#ffffff",
        },
        sky: {
          DEFAULT: "#f9f9f9",
          deep: "#eeeeee",
          light: "#ffffff",
        },
        sage: {
          DEFAULT: "#1a1c1c",
          deep: "#1a1c1c",
          light: "#56433a",
        },
        sun: {
          DEFAULT: "#C4622D",
          deep: "#99420d",
          light: "#ffb693",
        },
        concrete: {
          DEFAULT: "#dcc1b5",
          deep: "#897268",
          light: "#e2e2e2",
        },
        ink: {
          DEFAULT: "#1a1c1c",
          soft: "#56433a",
        },
        paper: {
          DEFAULT: "#f9f9f9",
          deep: "#eeeeee",
          warm: "#f3f3f4",
        },
        steeze: {
          red: "#C4622D",
          "red-d": "#99420d",
          blue: "#1a1c1c",
          "blue-d": "#1a1c1c",
          lime: "#C4622D",
          "lime-d": "#99420d",
        },
      },
      fontFamily: {
        sans: ["var(--font-hanken)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-bebas)", "Impact", "sans-serif"],
        sticker: ["var(--font-bebas)", "Impact", "sans-serif"],
        body: ["var(--font-hanken)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Stitch typographic scale
        "display-lg": [
          "80px",
          { lineHeight: "80px", letterSpacing: "0.02em", fontWeight: "400" },
        ],
        "display-sm": [
          "48px",
          { lineHeight: "48px", letterSpacing: "0.02em", fontWeight: "400" },
        ],
        "headline-lg": [
          "32px",
          { lineHeight: "32px", letterSpacing: "0.02em", fontWeight: "400" },
        ],
        "headline-lg-mobile": [
          "28px",
          { lineHeight: "28px", letterSpacing: "0.02em", fontWeight: "400" },
        ],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "label-bold": [
          "14px",
          { lineHeight: "20px", letterSpacing: "0.05em", fontWeight: "700" },
        ],
      },
      spacing: {
        // Stitch spacing tokens
        "stack-sm": "8px",
        "stack-md": "16px",
        "stack-lg": "32px",
        gutter: "24px",
        "margin-mobile": "16px",
        "margin-desktop": "48px",
        "section-gap": "120px",
        "container-max": "1280px",
      },
      maxWidth: {
        "container-max": "1280px",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
        // shadcn carry-over
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
          "0%": { boxShadow: "0 0 0 0 rgba(196, 98, 45, 0.65)" },
          "70%": { boxShadow: "0 0 0 8px rgba(196, 98, 45, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(196, 98, 45, 0)" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.06) translate(-1%, -1%)" },
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
        "ticker-status": "ticker 30s linear infinite",
        spin: "spin 12s linear infinite",
        "spin-fast": "spin 8s linear infinite",
        blink: "blink 1.4s step-end infinite",
        bob: "bob 5s ease-in-out infinite",
        "pulse-dot": "pulse-dot 2.4s infinite",
        "ken-burns": "ken-burns 18s ease-in-out infinite alternate",
        "sun-glow": "sun-glow 4.5s ease-in-out infinite",
        "leaf-sway": "leaf-sway 6s ease-in-out infinite",
      },
      boxShadow: {
        // Stitch design = flat, no shadows. These are kept only for legacy
        // pages that haven't been v8-reskinned yet.
        soft: "none",
        "soft-lg": "none",
        "soft-warm": "none",
        hard: "none",
        "hard-r": "none",
        "hard-b": "none",
        "hard-l": "none",
        "hard-lg": "none",
        "hard-lg-r": "none",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
