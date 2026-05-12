// Skate-zine icon set — used across nav, marquees, offer cards, footer.
// All SVGs use currentColor so they inherit Tailwind text-* utilities.

export function StarBurst({
  size = 28,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      fill="currentColor"
      className={`shrink-0 animate-spin-fast ${className}`}
    >
      <path d="M20 0 L23 14 L37 17 L23 21 L20 40 L17 21 L3 17 L17 14 Z" />
    </svg>
  );
}

export function Arrow({
  size = 16,
  dir = "ne",
  className = "",
}: {
  size?: number;
  dir?: "e" | "ne" | "n" | "nw" | "w" | "sw" | "s" | "se";
  className?: string;
}) {
  const rotMap = { e: 0, ne: -45, n: -90, nw: -135, w: 180, sw: 135, s: 90, se: 45 };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ transform: `rotate(${rotMap[dir]}deg)` }}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function GlyphHelmet({ size = 80 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 60 Q15 30 50 30 Q85 30 85 60 L85 70 L15 70 Z" />
      <path d="M15 65 L85 65" />
      <path d="M30 30 L30 20 L70 20 L70 30" />
      <circle cx="35" cy="50" r="2" fill="currentColor" />
      <circle cx="50" cy="50" r="2" fill="currentColor" />
      <circle cx="65" cy="50" r="2" fill="currentColor" />
    </svg>
  );
}

export function GlyphBowl({ size = 80 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="50" cy="40" rx="40" ry="8" />
      <path d="M10 40 Q10 80 50 80 Q90 80 90 40" />
      <ellipse cx="50" cy="70" rx="20" ry="4" strokeDasharray="3 3" />
    </svg>
  );
}

export function GlyphDeck({ size = 80 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 30 Q10 18 25 18 L95 18 Q110 18 110 30 Q110 42 95 42 L25 42 Q10 42 10 30 Z" />
      <circle cx="28" cy="48" r="5" />
      <circle cx="92" cy="48" r="5" />
      <path d="M40 25 L80 25 M40 35 L80 35" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-.3-.1-1.2-.4-2.3-1.4-.8-.8-1.4-1.7-1.5-2-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5-.2 0-.4 0-.6 0-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3.1 5 4.4 1.7.7 2.4.8 3.3.7.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.3C8.7 21.5 10.3 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z" />
    </svg>
  );
}

// Stylized SVG portrait of Hari — zine illustration in the design's style.
export function CoachPortraitSVG() {
  return (
    <svg
      viewBox="0 0 400 500"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="500" fill="#0E0D0B" />
      <g stroke="#FF2D2D" strokeWidth="1" fill="none" opacity="0.6">
        <circle cx="200" cy="220" r="160" />
        <circle cx="200" cy="220" r="130" strokeDasharray="3 6" />
        <circle cx="200" cy="220" r="100" />
      </g>
      <g fill="#F1EAD7">
        <path d="M 180 130 Q 160 130 160 150 L 160 170 Q 160 200 200 200 Q 240 200 240 170 L 240 150 Q 240 130 220 130 Z" />
        <rect x="160" y="120" width="80" height="20" />
        <rect x="170" y="105" width="60" height="20" />
        <circle cx="200" cy="105" r="6" fill="#FF2D2D" />
      </g>
      <g fill="#2547F0">
        <path d="M 170 200 L 230 200 L 250 290 L 230 360 L 170 360 L 150 290 Z" />
      </g>
      <g fill="#2547F0">
        <path d="M 150 220 L 100 280 L 110 300 L 160 240 Z" />
        <path d="M 250 220 L 320 200 L 310 220 L 240 250 Z" />
      </g>
      <g fill="#0E0D0B" stroke="#F1EAD7" strokeWidth="2">
        <path d="M 170 350 L 150 440 L 175 445 L 195 360 Z" />
        <path d="M 205 360 L 235 440 L 260 435 L 230 350 Z" />
      </g>
      <g fill="#F1EAD7">
        <ellipse cx="160" cy="442" rx="22" ry="8" />
        <ellipse cx="248" cy="438" rx="22" ry="8" />
      </g>
      <g transform="translate(60 430) rotate(-12)">
        <rect
          x="0"
          y="0"
          width="240"
          height="14"
          fill="#D3F046"
          stroke="#0E0D0B"
          strokeWidth="2"
          rx="7"
        />
        <circle cx="40" cy="20" r="6" fill="#F1EAD7" stroke="#0E0D0B" strokeWidth="2" />
        <circle cx="200" cy="20" r="6" fill="#F1EAD7" stroke="#0E0D0B" strokeWidth="2" />
      </g>
      <g stroke="#D3F046" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M 90 380 Q 110 370 105 360 Q 100 350 120 345" />
      </g>
      <g fill="#FF2D2D">
        <circle cx="60" cy="80" r="3" />
        <circle cx="80" cy="70" r="2" />
        <circle cx="50" cy="100" r="2" />
        <circle cx="340" cy="60" r="3" />
        <circle cx="350" cy="90" r="2" />
        <circle cx="320" cy="70" r="2" />
      </g>
      <text
        x="200"
        y="480"
        textAnchor="middle"
        fill="#F1EAD7"
        fontFamily="Permanent Marker, cursive"
        fontSize="18"
      >
        — hari, coach
      </text>
    </svg>
  );
}
