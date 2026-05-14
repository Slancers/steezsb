// Five-frame motion study of a skateboard being built up — sibling of
// OllieSequence + DropInSequence. Each frame ADDS an element to the board.
// Phases: DECK -> GRIP -> TRUCKS -> WHEELS -> READY.

export function BoardBuildSequence({
  className = "",
  color = "#C4622D",
}: {
  className?: string;
  color?: string;
}) {
  // Reusable deck outline path for any frame center (matches kicktail shape)
  const deckTop = (cx: number) =>
    `M ${cx - 44} 110 C ${cx - 36} 100, ${cx - 20} 96, ${cx} 96 C ${cx + 20} 96, ${cx + 36} 100, ${cx + 44} 110`;
  const deckBottom = (cx: number) =>
    `M ${cx - 44} 110 C ${cx - 36} 120, ${cx - 20} 124, ${cx} 124 C ${cx + 20} 124, ${cx + 36} 120, ${cx + 44} 110`;
  const tailLeft = (cx: number) =>
    `M ${cx - 44} 110 L ${cx - 52} 102 L ${cx - 48} 118 Z`;
  const tailRight = (cx: number) =>
    `M ${cx + 44} 110 L ${cx + 52} 102 L ${cx + 48} 118 Z`;

  return (
    <div className={`build-sequence w-full ${className}`}>
      <div className="build-sequence__scroll -mx-4 overflow-x-auto md:mx-0 md:overflow-visible">
        <div className="min-w-[720px] px-4 md:min-w-0 md:px-0">
      <svg
        viewBox="0 60 800 110"
        fill="none"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className="build-sequence__svg w-full"
      >
        {/* ===== FRAME 1 — DECK — bare plank with kicktails ===== */}
        <g className="build-sequence__frame build-sequence__frame--1">
          <path d={deckTop(80)} />
          <path d={deckBottom(80)} />
          <path d={tailLeft(80)} />
          <path d={tailRight(80)} />
          {/* Wood grain hint */}
          <path d="M 45 110 L 115 110" strokeOpacity="0.35" />
        </g>

        {/* ===== FRAME 2 — GRIP — deck + grip-tape dots on top ===== */}
        <g className="build-sequence__frame build-sequence__frame--2">
          <path d={deckTop(240)} />
          <path d={deckBottom(240)} />
          <path d={tailLeft(240)} />
          <path d={tailRight(240)} />
          <path d="M 205 110 L 275 110" strokeOpacity="0.35" />
          {/* Grip tape — small dots across the top of the deck */}
          {[208, 218, 228, 238, 248, 258, 268].map((x) => (
            <circle key={x} cx={x} cy="100" r="1.4" fill={color} stroke="none" />
          ))}
        </g>

        {/* ===== FRAME 3 — TRUCKS — deck + grip + trucks underneath ===== */}
        <g className="build-sequence__frame build-sequence__frame--3">
          <path d={deckTop(400)} />
          <path d={deckBottom(400)} />
          <path d={tailLeft(400)} />
          <path d={tailRight(400)} />
          <path d="M 365 110 L 435 110" strokeOpacity="0.35" />
          {[368, 378, 388, 398, 408, 418, 428].map((x) => (
            <circle key={x} cx={x} cy="100" r="1.4" fill={color} stroke="none" />
          ))}
          {/* Left truck — baseplate, stem, axle */}
          <path d="M 366 124 L 386 124" />
          <path d="M 376 124 L 376 138" />
          <path d="M 360 138 L 392 138" />
          {/* Right truck */}
          <path d="M 414 124 L 434 124" />
          <path d="M 424 124 L 424 138" />
          <path d="M 408 138 L 440 138" />
        </g>

        {/* ===== FRAME 4 — WHEELS — wheels on the axles ===== */}
        <g className="build-sequence__frame build-sequence__frame--4">
          <path d={deckTop(560)} />
          <path d={deckBottom(560)} />
          <path d={tailLeft(560)} />
          <path d={tailRight(560)} />
          <path d="M 525 110 L 595 110" strokeOpacity="0.35" />
          {[528, 538, 548, 558, 568, 578, 588].map((x) => (
            <circle key={x} cx={x} cy="100" r="1.4" fill={color} stroke="none" />
          ))}
          {/* Trucks */}
          <path d="M 526 124 L 546 124" />
          <path d="M 536 124 L 536 138" />
          <path d="M 520 138 L 552 138" />
          <path d="M 574 124 L 594 124" />
          <path d="M 584 124 L 584 138" />
          <path d="M 568 138 L 600 138" />
          {/* Wheels at axle ends */}
          <circle cx="520" cy="138" r="5" />
          <circle cx="552" cy="138" r="5" />
          <circle cx="568" cy="138" r="5" />
          <circle cx="600" cy="138" r="5" />
        </g>

        {/* ===== FRAME 5 — READY — complete board + deck graphic + motion ===== */}
        <g className="build-sequence__frame build-sequence__frame--5">
          <path d={deckTop(720)} />
          <path d={deckBottom(720)} />
          <path d={tailLeft(720)} />
          <path d={tailRight(720)} />
          <path d="M 685 110 L 755 110" strokeOpacity="0.35" />
          {[688, 698, 708, 718, 728, 738, 748].map((x) => (
            <circle key={x} cx={x} cy="100" r="1.4" fill={color} stroke="none" />
          ))}
          {/* Trucks */}
          <path d="M 686 124 L 706 124" />
          <path d="M 696 124 L 696 138" />
          <path d="M 680 138 L 712 138" />
          <path d="M 734 124 L 754 124" />
          <path d="M 744 124 L 744 138" />
          <path d="M 728 138 L 760 138" />
          {/* Wheels */}
          <circle cx="680" cy="138" r="5" />
          <circle cx="712" cy="138" r="5" />
          <circle cx="728" cy="138" r="5" />
          <circle cx="760" cy="138" r="5" />
          {/* Deck graphic — small star centered on board top */}
          <path d="M 720 86 L 722 92 L 728 92 L 723 96 L 725 102 L 720 98 L 715 102 L 717 96 L 712 92 L 718 92 Z" />
          {/* Motion lines — "ready to roll" energy */}
          <path d="M 776 108 L 794 108" strokeOpacity="0.55" />
          <path d="M 776 116 L 790 116" strokeOpacity="0.4" />
          <path d="M 776 124 L 792 124" strokeOpacity="0.45" />
        </g>
      </svg>

      {/* HTML phase labels */}
      <div className="mt-3 grid grid-cols-5 gap-2 text-center font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface-variant">
        <span>Deck</span>
        <span>Grip</span>
        <span>Trucks</span>
        <span>Wheels</span>
        <span>Ready</span>
      </div>
        </div>
      </div>

      <style>{`
        /* Hide scrollbar on mobile horizontal scroll */
        .build-sequence__scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .build-sequence__scroll::-webkit-scrollbar {
          display: none;
        }

        .build-sequence__frame path,
        .build-sequence__frame circle {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: build-draw 900ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        /* Filled grip-dot circles (no stroke) skip the dasharray animation */
        .build-sequence__frame circle[fill="${"#C4622D"}"],
        .build-sequence__frame circle[fill]:not([fill="none"]) {
          stroke-dasharray: none;
          stroke-dashoffset: 0;
          animation: build-fade 600ms ease-out forwards;
          opacity: 0;
        }

        .build-sequence__frame--1 path,
        .build-sequence__frame--1 circle { animation-delay: 0ms; }
        .build-sequence__frame--2 path,
        .build-sequence__frame--2 circle { animation-delay: 300ms; }
        .build-sequence__frame--3 path,
        .build-sequence__frame--3 circle { animation-delay: 600ms; }
        .build-sequence__frame--4 path,
        .build-sequence__frame--4 circle { animation-delay: 900ms; }
        .build-sequence__frame--5 path,
        .build-sequence__frame--5 circle { animation-delay: 1200ms; }

        @keyframes build-draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes build-fade {
          to { opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .build-sequence__frame path,
          .build-sequence__frame circle {
            animation: none;
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
