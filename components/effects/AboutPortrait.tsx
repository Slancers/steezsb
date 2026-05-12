// Mid-air skater silhouette in front of a red sun with radiating lines.
// Sticker name tag and graffiti accent. Pure decorative SVG.
export function AboutPortrait() {
  return (
    <svg
      viewBox="0 0 400 500"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="500" fill="#0E0D0B" />
      <circle cx="200" cy="220" r="180" fill="#FF2D2D" />
      <circle
        cx="200"
        cy="220"
        r="180"
        fill="none"
        stroke="#F1EAD7"
        strokeWidth="2"
        strokeDasharray="4 6"
      />
      <g stroke="#F1EAD7" strokeWidth="1.5" opacity="0.4">
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          const x1 = 200 + Math.cos(a) * 180;
          const y1 = 220 + Math.sin(a) * 180;
          const x2 = 200 + Math.cos(a) * 220;
          const y2 = 220 + Math.sin(a) * 220;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
      <g fill="#0E0D0B">
        <ellipse cx="240" cy="160" rx="22" ry="26" />
        <path
          d="M 220 150 Q 220 130 240 128 Q 262 130 262 150 L 262 158 L 220 158 Z"
          fill="#D3F046"
        />
        <rect x="220" y="156" width="42" height="6" fill="#0E0D0B" />
        <path d="M 220 180 L 260 180 L 270 260 L 240 290 L 215 270 L 200 220 Z" />
        <path d="M 230 195 L 180 175 L 165 195 L 215 210 Z" />
        <path d="M 260 195 L 310 165 L 320 180 L 270 210 Z" />
        <path d="M 235 285 L 200 350 L 215 360 L 245 295 Z" />
        <path d="M 250 290 L 285 340 L 305 335 L 270 285 Z" />
      </g>
      <g transform="translate(170 360) rotate(-15)">
        <rect
          x="0"
          y="0"
          width="200"
          height="14"
          rx="7"
          fill="#F1EAD7"
          stroke="#0E0D0B"
          strokeWidth="3"
        />
        <circle cx="30" cy="22" r="6" fill="#F1EAD7" stroke="#0E0D0B" strokeWidth="2" />
        <circle cx="170" cy="22" r="6" fill="#F1EAD7" stroke="#0E0D0B" strokeWidth="2" />
      </g>
      <g stroke="#F1EAD7" strokeWidth="3" strokeLinecap="round">
        <line x1="50" y1="280" x2="120" y2="280" />
        <line x1="60" y1="300" x2="100" y2="300" />
        <line x1="40" y1="320" x2="110" y2="320" />
      </g>
      <g transform="translate(60 60) rotate(-6)">
        <rect width="160" height="40" fill="#F1EAD7" stroke="#0E0D0B" strokeWidth="2" />
        <text
          x="80"
          y="20"
          textAnchor="middle"
          fontFamily="var(--font-jetbrains-mono, monospace)"
          fontWeight="700"
          fontSize="11"
          letterSpacing="2"
        >
          HARI · COACH
        </text>
        <text
          x="80"
          y="32"
          textAnchor="middle"
          fontFamily="var(--font-jetbrains-mono, monospace)"
          fontSize="9"
          letterSpacing="2"
        >
          SINCE 2009 · HYD
        </text>
      </g>
      <text
        x="80"
        y="450"
        fontFamily="Permanent Marker, cursive"
        fontSize="28"
        fill="#D3F046"
        transform="rotate(-4 80 450)"
      >
        steezsb
      </text>
    </svg>
  );
}
