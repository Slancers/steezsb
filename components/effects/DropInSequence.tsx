// Five-frame motion study of dropping into a bowl — sibling of OllieSequence.
// Phases: LIP -> TIP -> DROP -> CARVE -> PUMP.
// Same craft pattern: terracotta single-line stroke, stagger-draws on mount,
// HTML labels beneath, hidden on mobile, prefers-reduced-motion honored.

export function DropInSequence({
  className = "",
  color = "#C4622D",
  groundColor = "#1A1A1A",
}: {
  className?: string;
  color?: string;
  groundColor?: string;
}) {
  return (
    <div className={`dropin-sequence w-full ${className}`}>
      <div className="dropin-sequence__scroll -mx-4 overflow-x-auto md:mx-0 md:overflow-visible">
        <div className="min-w-[720px] px-4 md:min-w-0 md:px-0">
      <svg
        viewBox="0 14 800 220"
        fill="none"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className="dropin-sequence__svg w-full"
      >
        {/* ===== FRAME 1 — LIP — standing on coping, board hooked on edge ===== */}
        <g className="dropin-sequence__frame dropin-sequence__frame--1">
          {/* Helmet */}
          <path d="M 70 84 C 70 70, 75 62, 80 62 C 85 62, 90 70, 90 84 Z" />
          <path d="M 67 84 L 93 84" />
          {/* Torso */}
          <path d="M 80 88 L 80 148" />
          {/* Arms */}
          <path d="M 80 106 L 100 136" />
          <path d="M 80 106 L 60 136" />
          {/* Legs */}
          <path d="M 80 148 L 92 178" />
          <path d="M 80 148 L 68 178" />
          {/* Board on the coping */}
          <path d="M 56 182 L 104 182" />
          <path d="M 56 188 L 104 188" />
          {/* Wheels */}
          <circle cx="64" cy="196" r="4" />
          <circle cx="96" cy="196" r="4" />
          {/* Coping / deck edge */}
          <path
            d="M 20 200 L 110 200"
            stroke={groundColor}
            strokeWidth="1.6"
          />
          {/* Drop-off edge */}
          <path
            d="M 110 200 L 110 232"
            stroke={groundColor}
            strokeWidth="1.6"
          />
        </g>

        {/* ===== FRAME 2 — TIP — body forward, board nose dipping ===== */}
        <g className="dropin-sequence__frame dropin-sequence__frame--2">
          {/* Helmet (forward) */}
          <path d="M 226 86 C 226 72, 231 64, 236 64 C 241 64, 246 72, 246 86 Z" />
          <path d="M 223 86 L 249 86" />
          {/* Torso — leaning forward */}
          <path d="M 236 90 L 246 144" />
          {/* Arms — front extended forward */}
          <path d="M 242 108 L 268 100" />
          <path d="M 240 110 L 220 122" />
          {/* Legs — front leg forward over the lip */}
          <path d="M 246 144 L 260 172" />
          <path d="M 246 144 L 232 172" />
          {/* Board — tilted, nose dipping into bowl */}
          <path d="M 218 178 L 268 196" />
          <path d="M 218 184 L 268 202" />
          {/* Wheels — back wheel still on coping, front on curve */}
          <circle cx="224" cy="190" r="4" />
          <circle cx="262" cy="210" r="4" />
          {/* Coping (left side) */}
          <path
            d="M 200 200 L 240 200"
            stroke={groundColor}
            strokeWidth="1.6"
          />
          {/* Transition curve (bowl going in) */}
          <path
            d="M 240 200 Q 260 215, 280 226"
            stroke={groundColor}
            strokeWidth="1.6"
          />
        </g>

        {/* ===== FRAME 3 — DROP — riding the transition curve ===== */}
        <g className="dropin-sequence__frame dropin-sequence__frame--3">
          {/* Helmet */}
          <path d="M 388 78 C 388 64, 393 56, 398 56 C 403 56, 408 64, 408 78 Z" />
          <path d="M 385 78 L 411 78" />
          {/* Torso — angled to match the wall, slight forward lean */}
          <path d="M 398 82 L 410 132" />
          {/* Arms — out for balance */}
          <path d="M 404 100 L 430 96" />
          <path d="M 400 102 L 378 110" />
          {/* Legs — bent, following the curve */}
          <path d="M 410 132 L 426 160" />
          <path d="M 410 132 L 398 160" />
          {/* Board — angled with the transition */}
          <path d="M 382 168 L 432 184" />
          <path d="M 382 174 L 432 190" />
          {/* Wheels along the curve */}
          <circle cx="388" cy="180" r="4" />
          <circle cx="426" cy="196" r="4" />
          {/* Transition curve background */}
          <path
            d="M 360 154 Q 370 184, 400 210 Q 420 224, 444 232"
            stroke={groundColor}
            strokeWidth="1.6"
          />
        </g>

        {/* ===== FRAME 4 — CARVE — at the flat bottom, board flat ===== */}
        <g className="dropin-sequence__frame dropin-sequence__frame--4">
          {/* Helmet — upright */}
          <path d="M 550 92 C 550 78, 555 70, 560 70 C 565 70, 570 78, 570 92 Z" />
          <path d="M 547 92 L 573 92" />
          {/* Torso — straight */}
          <path d="M 560 96 L 560 152 " />
          {/* Arms — out for balance through the carve */}
          <path d="M 560 114 L 584 136" />
          <path d="M 560 114 L 536 136" />
          {/* Legs */}
          <path d="M 560 152 L 572 184" />
          <path d="M 560 152 L 548 184" />
          {/* Board flat */}
          <path d="M 536 190 L 584 190" />
          <path d="M 536 196 L 584 196" />
          {/* Wheels on flat bottom */}
          <circle cx="544" cy="204" r="4" />
          <circle cx="576" cy="204" r="4" />
          {/* Flat bowl bottom + slight curve up on right */}
          <path
            d="M 520 208 L 600 208 Q 614 207, 620 200"
            stroke={groundColor}
            strokeWidth="1.6"
          />
        </g>

        {/* ===== FRAME 5 — PUMP — rising up the opposite wall ===== */}
        <g className="dropin-sequence__frame dropin-sequence__frame--5">
          {/* Helmet — leaned into the wall direction */}
          <path d="M 706 76 C 706 62, 711 54, 716 54 C 721 54, 726 62, 726 76 Z" />
          <path d="M 703 76 L 729 76" />
          {/* Torso — angled into wall */}
          <path d="M 716 80 L 728 130" />
          {/* Arms — leading arm up the wall */}
          <path d="M 722 96 L 748 88" />
          <path d="M 720 100 L 698 116" />
          {/* Legs — bent, pumping */}
          <path d="M 728 130 L 744 158" />
          <path d="M 728 130 L 716 158" />
          {/* Board — tilted up the wall */}
          <path d="M 702 168 L 752 152" />
          <path d="M 702 174 L 752 158" />
          {/* Wheels on the rising curve */}
          <circle cx="708" cy="178" r="4" />
          <circle cx="746" cy="162" r="4" />
          {/* Rising transition curve on right */}
          <path
            d="M 680 220 Q 716 212, 740 188 Q 758 170, 762 144"
            stroke={groundColor}
            strokeWidth="1.6"
          />
        </g>
      </svg>

      {/* HTML phase labels — 5-col grid mirrors frame centers */}
      <div className="mt-3 grid grid-cols-5 gap-2 text-center font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface-variant">
        <span>Lip</span>
        <span>Tip</span>
        <span>Drop</span>
        <span>Carve</span>
        <span>Pump</span>
      </div>
        </div>
      </div>

      <style>{`
        /* Hide scrollbar on mobile horizontal scroll */
        .dropin-sequence__scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .dropin-sequence__scroll::-webkit-scrollbar {
          display: none;
        }

        .dropin-sequence__frame path,
        .dropin-sequence__frame circle {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: dropin-draw 900ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .dropin-sequence__frame--1 path,
        .dropin-sequence__frame--1 circle { animation-delay: 0ms; }
        .dropin-sequence__frame--2 path,
        .dropin-sequence__frame--2 circle { animation-delay: 300ms; }
        .dropin-sequence__frame--3 path,
        .dropin-sequence__frame--3 circle { animation-delay: 600ms; }
        .dropin-sequence__frame--4 path,
        .dropin-sequence__frame--4 circle { animation-delay: 900ms; }
        .dropin-sequence__frame--5 path,
        .dropin-sequence__frame--5 circle { animation-delay: 1200ms; }

        @keyframes dropin-draw {
          to { stroke-dashoffset: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .dropin-sequence__frame path,
          .dropin-sequence__frame circle {
            animation: none;
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
