// Illustrated zine-style map of Banjara Hills — roads, blocks, trees,
// labels, and a pulsing STEEZ pin at the bowl. Decorative; the real
// pin/address is shared via WhatsApp per the design.
export function MapArt() {
  return (
    <svg
      viewBox="0 0 1200 500"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="map-paper-grain"
          patternUnits="userSpaceOnUse"
          width="6"
          height="6"
        >
          <rect width="6" height="6" fill="#E6DDC5" />
          <circle cx="3" cy="3" r="0.5" fill="#B8AE9A" />
        </pattern>
      </defs>
      <rect width="1200" height="500" fill="url(#map-paper-grain)" />

      <g stroke="#0E0D0B" strokeWidth="2" fill="none">
        <path d="M 0 200 Q 200 180 400 220 T 800 240 T 1200 220" strokeWidth="14" stroke="#F1EAD7" />
        <path d="M 0 200 Q 200 180 400 220 T 800 240 T 1200 220" strokeWidth="2" strokeDasharray="8 8" />
        <path d="M 100 0 Q 120 200 80 350 T 120 500" strokeWidth="10" stroke="#F1EAD7" />
        <path d="M 100 0 Q 120 200 80 350 T 120 500" strokeWidth="1.5" strokeDasharray="6 6" />
        <path d="M 600 0 L 620 200 L 580 350 L 640 500" strokeWidth="12" stroke="#F1EAD7" />
        <path d="M 600 0 L 620 200 L 580 350 L 640 500" strokeWidth="1.5" strokeDasharray="6 6" />
        <path d="M 900 0 Q 920 100 880 200 T 920 400" strokeWidth="8" stroke="#F1EAD7" />
        <path d="M 900 0 Q 920 100 880 200 T 920 400" strokeWidth="1" strokeDasharray="4 4" />
      </g>

      <g fill="#D9CFB7" stroke="#0E0D0B" strokeWidth="1">
        <rect x="180" y="40" width="160" height="120" />
        <rect x="360" y="20" width="140" height="140" />
        <rect x="200" y="280" width="180" height="100" />
        <rect x="420" y="260" width="120" height="160" />
        <rect x="700" y="40" width="160" height="160" />
        <rect x="700" y="300" width="160" height="120" />
        <rect x="950" y="60" width="180" height="120" />
        <rect x="950" y="280" width="180" height="140" />
      </g>

      <g fill="#3F6B3D">
        <circle cx="160" cy="60" r="10" />
        <circle cx="160" cy="380" r="10" />
        <circle cx="540" cy="60" r="12" />
        <circle cx="900" cy="240" r="10" />
        <circle cx="940" cy="450" r="11" />
      </g>

      <g
        fontFamily="var(--font-jetbrains-mono, monospace)"
        fontWeight="700"
        fontSize="11"
        letterSpacing="2"
        fill="#0E0D0B"
      >
        <text x="250" y="100">BANJARA HILLS</text>
        <text x="780" y="120">RD NO. 12</text>
        <text x="20" y="180" transform="rotate(-2 20 180)">JUBILEE HILLS RD →</text>
        <text x="240" y="340">PARK</text>
        <text x="1000" y="350">HOSPITAL</text>
      </g>

      <g transform="translate(540 220)">
        <path
          d="M 0 -40 Q -24 -40 -24 -20 Q -24 0 0 20 Q 24 0 24 -20 Q 24 -40 0 -40 Z"
          fill="#FF2D2D"
          stroke="#0E0D0B"
          strokeWidth="3"
        />
        <circle cx="0" cy="-22" r="8" fill="#F1EAD7" stroke="#0E0D0B" strokeWidth="2" />
        <text
          x="0"
          y="-18"
          textAnchor="middle"
          fontFamily="var(--font-space-mono, monospace)"
          fontWeight="700"
          fontSize="9"
        >
          S
        </text>
        <circle cx="0" cy="-20" r="30" fill="none" stroke="#FF2D2D" strokeWidth="2">
          <animate attributeName="r" from="20" to="60" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.7" to="0" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="0" cy="-20" r="30" fill="none" stroke="#FF2D2D" strokeWidth="1.5">
          <animate attributeName="r" from="20" to="50" dur="2s" begin="1s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.5" to="0" dur="2s" begin="1s" repeatCount="indefinite" />
        </circle>
        <g transform="translate(30 -10)">
          <rect width="100" height="22" fill="#0E0D0B" />
          <text
            x="50"
            y="14"
            textAnchor="middle"
            fill="#F1EAD7"
            fontFamily="var(--font-jetbrains-mono, monospace)"
            fontWeight="700"
            fontSize="10"
            letterSpacing="2"
          >
            STEEZ · HYD
          </text>
        </g>
      </g>

      <g transform="translate(1100 60)">
        <circle r="22" fill="#F1EAD7" stroke="#0E0D0B" strokeWidth="2" />
        <path
          d="M 0 -16 L 4 0 L 0 16 L -4 0 Z"
          fill="#FF2D2D"
          stroke="#0E0D0B"
          strokeWidth="1"
        />
        <text
          y="-26"
          textAnchor="middle"
          fontFamily="var(--font-jetbrains-mono, monospace)"
          fontSize="9"
          fontWeight="700"
        >
          N
        </text>
      </g>
      <g transform="translate(40 460)">
        <line x1="0" y1="0" x2="80" y2="0" stroke="#0E0D0B" strokeWidth="2" />
        <line x1="0" y1="-4" x2="0" y2="4" stroke="#0E0D0B" strokeWidth="2" />
        <line x1="80" y1="-4" x2="80" y2="4" stroke="#0E0D0B" strokeWidth="2" />
        <text
          x="40"
          y="-8"
          textAnchor="middle"
          fontFamily="var(--font-jetbrains-mono, monospace)"
          fontSize="9"
          letterSpacing="1"
        >
          ~ 200 M
        </text>
      </g>
    </svg>
  );
}
