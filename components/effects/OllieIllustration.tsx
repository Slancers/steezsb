// Stylized kid mid-ollie — pictogram-style figure with skateboard tilted
// up beneath the feet. Single-line terracotta stroke, stroke-draws in on
// mount. Matches v8 Stitch editorial style.
export function OllieIllustration({
  className = "",
  color = "#C4622D",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      stroke={color}
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={`ollie-illustration ${className}`}
    >
      {/* Head (helmet — slightly squared on top for a helmet feel) */}
      <path d="M 95 32 C 95 22, 103 16, 113 16 C 124 16, 132 22, 132 32 L 132 44 L 95 44 Z" />
      <path d="M 92 44 L 135 44" />
      {/* Helmet strap */}
      <path d="M 103 44 L 108 52" strokeOpacity="0.55" />
      <path d="M 124 44 L 120 52" strokeOpacity="0.55" />

      {/* Torso — leaning slightly forward, dynamic */}
      <path d="M 114 48 L 106 110" />

      {/* Front arm — extended forward for balance, fist almost forward */}
      <path d="M 110 64 L 152 56" />
      <path d="M 152 56 L 160 60" />

      {/* Back arm — bent, trailing behind */}
      <path d="M 110 70 L 78 92" />
      <path d="M 78 92 L 72 102" />

      {/* Front leg — pushing the board nose up */}
      <path d="M 106 110 L 96 152" />
      <path d="M 96 152 L 78 174" />

      {/* Back leg — popped down on the tail */}
      <path d="M 106 110 L 130 144" />
      <path d="M 130 144 L 148 170" />

      {/* Skateboard — tilted up at the front (mid-ollie) */}
      <path d="M 60 184 L 175 158" />
      <path d="M 62 192 L 177 166" />
      {/* Wheels */}
      <circle cx="74" cy="195" r="5" />
      <circle cx="164" cy="174" r="5" />

      {/* Motion lines — sparingly */}
      <path d="M 20 156 L 38 152" strokeOpacity="0.6" />
      <path d="M 22 168 L 36 165" strokeOpacity="0.5" />
      <path d="M 18 142 L 32 140" strokeOpacity="0.45" />

      <style>{`
        .ollie-illustration {
          --draw-len: 400;
        }
        .ollie-illustration path,
        .ollie-illustration circle {
          stroke-dasharray: var(--draw-len);
          stroke-dashoffset: var(--draw-len);
          animation: ol-draw 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        /* Stagger by limb groups — head, body, arms, legs, board, wheels, motion */
        .ollie-illustration path:nth-child(1),
        .ollie-illustration path:nth-child(2) { animation-delay: 0ms; }
        .ollie-illustration path:nth-child(3),
        .ollie-illustration path:nth-child(4) { animation-delay: 120ms; }
        .ollie-illustration path:nth-child(5) { animation-delay: 240ms; }
        .ollie-illustration path:nth-child(6),
        .ollie-illustration path:nth-child(7),
        .ollie-illustration path:nth-child(8),
        .ollie-illustration path:nth-child(9) { animation-delay: 360ms; }
        .ollie-illustration path:nth-child(10),
        .ollie-illustration path:nth-child(11),
        .ollie-illustration path:nth-child(12),
        .ollie-illustration path:nth-child(13) { animation-delay: 580ms; }
        .ollie-illustration path:nth-child(14),
        .ollie-illustration path:nth-child(15) { animation-delay: 820ms; }
        .ollie-illustration circle { animation-delay: 1000ms; }
        .ollie-illustration path:nth-child(18),
        .ollie-illustration path:nth-child(19),
        .ollie-illustration path:nth-child(20) { animation-delay: 1200ms; }

        @keyframes ol-draw {
          to { stroke-dashoffset: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ollie-illustration path,
          .ollie-illustration circle {
            animation: none;
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </svg>
  );
}
