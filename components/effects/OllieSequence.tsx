// Five-frame motion study of an ollie — reads like a skate manual diagram.
// Each frame draws in stroke-by-stroke with a left-to-right stagger so the
// sequence feels like a flipbook unfolding. Pure SVG + CSS, no JS.
// Phases: SETUP -> POP -> LIFT -> PEAK -> LAND.

export function OllieSequence({
  className = "",
  color = "#C4622D",
  groundColor = "#1A1A1A",
}: {
  className?: string;
  color?: string;
  groundColor?: string;
}) {
  return (
    <div className={`ollie-sequence w-full ${className}`}>
      <svg
        viewBox="0 30 800 190"
        fill="none"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className="ollie-sequence__svg w-full"
      >
        {/* ===== FRAME 1 — SETUP — standing on board on the ground ===== */}
        <g className="ollie-sequence__frame ollie-sequence__frame--1">
          {/* Helmet */}
          <path d="M 70 64 C 70 50, 75 42, 80 42 C 85 42, 90 50, 90 64 Z" />
          <path d="M 67 64 L 93 64" />
          {/* Torso */}
          <path d="M 80 68 L 80 128" />
          {/* Arms */}
          <path d="M 80 86 L 100 118" />
          <path d="M 80 86 L 60 118" />
          {/* Legs */}
          <path d="M 80 128 L 92 168" />
          <path d="M 80 128 L 68 168" />
          {/* Board */}
          <path d="M 56 172 L 104 172" />
          <path d="M 56 178 L 104 178" />
          {/* Wheels touching the ground line at y=190 */}
          <circle cx="64" cy="186" r="4" />
          <circle cx="96" cy="186" r="4" />
        </g>

        {/* ===== FRAME 2 — POP — crouched, tail stomps, nose lifts ===== */}
        <g className="ollie-sequence__frame ollie-sequence__frame--2">
          {/* Helmet (lower, crouching) */}
          <path d="M 230 80 C 230 66, 235 58, 240 58 C 245 58, 250 66, 250 80 Z" />
          <path d="M 227 80 L 253 80" />
          {/* Torso — leaning slightly forward */}
          <path d="M 240 84 L 236 130" />
          {/* Arms — front out for balance, back trailing */}
          <path d="M 240 100 L 262 96" />
          <path d="M 240 102 L 218 114" />
          {/* Legs — deeply bent, knee bends visible */}
          <path d="M 236 130 L 228 150" />
          <path d="M 228 150 L 224 174" />
          <path d="M 236 130 L 252 152" />
          <path d="M 252 152 L 260 168" />
          {/* Board — tilted, tail touching ground at left, nose lifted right */}
          <path d="M 218 178 L 266 156" />
          <path d="M 219 184 L 267 162" />
          {/* Wheels — back wheel on ground, front wheel lifted */}
          <circle cx="224" cy="186" r="4" />
          <circle cx="262" cy="165" r="4" />
        </g>

        {/* ===== FRAME 3 — LIFT — body rising, board fully airborne ===== */}
        <g className="ollie-sequence__frame ollie-sequence__frame--3">
          {/* Helmet (higher than frame 1) */}
          <path d="M 390 56 C 390 42, 395 34, 400 34 C 405 34, 410 42, 410 56 Z" />
          <path d="M 387 56 L 413 56" />
          {/* Torso */}
          <path d="M 400 60 L 396 116" />
          {/* Arms — extended for balance */}
          <path d="M 400 78 L 426 72" />
          <path d="M 400 82 L 376 92" />
          {/* Legs — bent up, pulling board with them */}
          <path d="M 396 116 L 384 140" />
          <path d="M 396 116 L 414 142" />
          {/* Board — tilted, airborne */}
          <path d="M 372 152 L 426 138" />
          <path d="M 373 158 L 427 144" />
          {/* Wheels — clearly above ground */}
          <circle cx="380" cy="161" r="4" />
          <circle cx="420" cy="147" r="4" />
        </g>

        {/* ===== FRAME 4 — PEAK — highest point, board level under feet ===== */}
        <g className="ollie-sequence__frame ollie-sequence__frame--4">
          {/* Helmet — highest position */}
          <path d="M 550 44 C 550 30, 555 22, 560 22 C 565 22, 570 30, 570 44 Z" />
          <path d="M 547 44 L 573 44" />
          {/* Torso — compact */}
          <path d="M 560 48 L 560 96" />
          {/* Arms — wide for balance */}
          <path d="M 560 62 L 588 56" />
          <path d="M 560 64 L 532 62" />
          {/* Knees pulled up high under body */}
          <path d="M 560 96 L 546 124" />
          <path d="M 560 96 L 574 124" />
          {/* Board — perfectly level under the feet */}
          <path d="M 540 132 L 580 132" />
          <path d="M 540 138 L 580 138" />
          {/* Wheels */}
          <circle cx="546" cy="145" r="4" />
          <circle cx="574" cy="145" r="4" />
        </g>

        {/* ===== FRAME 5 — LAND — coming down, knees deeply bent to absorb ===== */}
        <g className="ollie-sequence__frame ollie-sequence__frame--5">
          {/* Helmet — lower, crouched for landing */}
          <path d="M 710 78 C 710 64, 715 56, 720 56 C 725 56, 730 64, 730 78 Z" />
          <path d="M 707 78 L 733 78" />
          {/* Torso — slight forward lean */}
          <path d="M 720 82 L 718 130" />
          {/* Arms — out for stability */}
          <path d="M 720 100 L 744 112" />
          <path d="M 720 102 L 696 116" />
          {/* Legs — deeply bent absorbing impact */}
          <path d="M 718 130 L 704 154" />
          <path d="M 704 154 L 706 178" />
          <path d="M 718 130 L 734 154" />
          <path d="M 734 154 L 730 178" />
          {/* Board — flat on ground */}
          <path d="M 696 172 L 744 172" />
          <path d="M 696 178 L 744 178" />
          {/* Wheels — touching ground */}
          <circle cx="704" cy="186" r="4" />
          <circle cx="736" cy="186" r="4" />
        </g>

        {/* ===== GROUND LINE — runs the full width, drawn first ===== */}
        <line
          x1="20"
          y1="190"
          x2="780"
          y2="190"
          stroke={groundColor}
          strokeWidth="1.5"
          className="ollie-sequence__ground"
        />
      </svg>

      {/* HTML labels under the SVG, aligned to a 5-col grid that mirrors
          the frame centers. Easier to keep accessible + responsive than
          rendering text inside the SVG at small scales. */}
      <div className="mt-2 grid grid-cols-5 gap-1 text-center font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-on-surface-variant">
        <span>Setup</span>
        <span>Pop</span>
        <span>Lift</span>
        <span>Peak</span>
        <span>Land</span>
      </div>

      <style>{`
        .ollie-sequence__ground,
        .ollie-sequence__frame path,
        .ollie-sequence__frame circle {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: ollie-draw 900ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Ground draws first */
        .ollie-sequence__ground { animation-delay: 0ms; }

        /* Each frame staggered ~280ms apart */
        .ollie-sequence__frame--1 path,
        .ollie-sequence__frame--1 circle { animation-delay: 300ms; }
        .ollie-sequence__frame--2 path,
        .ollie-sequence__frame--2 circle { animation-delay: 600ms; }
        .ollie-sequence__frame--3 path,
        .ollie-sequence__frame--3 circle { animation-delay: 900ms; }
        .ollie-sequence__frame--4 path,
        .ollie-sequence__frame--4 circle { animation-delay: 1200ms; }
        .ollie-sequence__frame--5 path,
        .ollie-sequence__frame--5 circle { animation-delay: 1500ms; }

        @keyframes ollie-draw {
          to { stroke-dashoffset: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ollie-sequence__ground,
          .ollie-sequence__frame path,
          .ollie-sequence__frame circle {
            animation: none;
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
