// Side-view skateboard, terracotta single-line stroke. Stroke-draws in
// over ~2s on mount. Matches the v8 Stitch editorial style — sharp,
// restrained, terracotta accent on off-white.
export function SkateboardIllustration({
  className = "",
  color = "#C4622D",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 300 180"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={`skateboard-illustration ${className}`}
    >
      {/* Deck — side view with kicktails both ends */}
      <path d="M 32 80 C 38 64, 64 56, 100 56 L 200 56 C 236 56, 262 64, 268 80" />
      <path d="M 32 80 C 38 96, 64 102, 100 102 L 200 102 C 236 102, 262 96, 268 80" />
      <path d="M 32 80 L 18 70" />
      <path d="M 18 70 L 22 86" />
      <path d="M 268 80 L 282 70" />
      <path d="M 282 70 L 278 86" />

      {/* Trucks */}
      <path d="M 78 102 L 78 122" />
      <path d="M 60 122 L 96 122" />
      <path d="M 222 102 L 222 122" />
      <path d="M 204 122 L 240 122" />

      {/* Wheels (side view — one visible at each truck) */}
      <circle cx="78" cy="138" r="14" />
      <circle cx="222" cy="138" r="14" />

      {/* Deck graphic — a single stripe + star, on-brand */}
      <path d="M 110 79 L 190 79" strokeOpacity="0.5" />
      <path d="M 150 71 L 152 79 L 160 79 L 154 84 L 156 92 L 150 87 L 144 92 L 146 84 L 140 79 L 148 79 Z" />

      <style>{`
        .skateboard-illustration {
          --draw-len: 600;
        }
        .skateboard-illustration path,
        .skateboard-illustration circle {
          stroke-dasharray: var(--draw-len);
          stroke-dashoffset: var(--draw-len);
          animation: sk-draw 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .skateboard-illustration path:nth-child(1) { animation-delay: 0ms; }
        .skateboard-illustration path:nth-child(2) { animation-delay: 120ms; }
        .skateboard-illustration path:nth-child(3),
        .skateboard-illustration path:nth-child(4),
        .skateboard-illustration path:nth-child(5),
        .skateboard-illustration path:nth-child(6) { animation-delay: 280ms; }
        .skateboard-illustration path:nth-child(7),
        .skateboard-illustration path:nth-child(8),
        .skateboard-illustration path:nth-child(9),
        .skateboard-illustration path:nth-child(10) { animation-delay: 480ms; }
        .skateboard-illustration circle { animation-delay: 720ms; }
        .skateboard-illustration path:nth-child(13),
        .skateboard-illustration path:nth-child(14) { animation-delay: 980ms; }

        @keyframes sk-draw {
          to { stroke-dashoffset: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .skateboard-illustration path,
          .skateboard-illustration circle {
            animation: none;
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </svg>
  );
}
