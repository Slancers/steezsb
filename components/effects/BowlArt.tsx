"use client";

import { useEffect, useRef } from "react";

// Interactive 3D-tilting bowl illustration. Mouse position over the
// container drives rotateX/rotateY via RAF (eased). Inside the stage is a
// hand-drawn SVG of a kidney-shaped concrete bowl with two animated skaters
// carving the rim (SMIL animateMotion along a shared path), pulsing coping
// marks, speed lines, a rotating compass, and annotation callouts.
// Honors prefers-reduced-motion.
export function BowlArt() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    if (!wrap || !stage) return;
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      target.x = Math.max(-1, Math.min(1, dx));
      target.y = Math.max(-1, Math.min(1, dy));
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);

    const tick = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      const rx = -current.y * 12;
      const ry = current.x * 18;
      stage.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const SKATER_PATH =
    "M 220 220 Q 130 230 130 330 Q 130 460 280 470 Q 440 480 530 410 Q 590 360 560 280 Q 530 200 420 200 Q 320 200 300 250 Q 285 290 240 290 Q 215 290 220 220 Z";

  return (
    <div
      ref={wrapRef}
      className="relative aspect-square cursor-grab overflow-hidden border-[1.5px] border-ink bg-paper-deep active:cursor-grabbing"
      style={{ perspective: "1200px", perspectiveOrigin: "50% 50%" }}
    >
      {/* Scan-line overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0, transparent 3px, rgba(14,13,11,0.06) 3px, rgba(14,13,11,0.06) 4px)",
          mixBlendMode: "multiply",
        }}
      />

      <div
        ref={stageRef}
        className="h-full w-full"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 80ms linear",
          willChange: "transform",
        }}
      >
        <svg
          viewBox="0 0 700 700"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <pattern
              id="bowl-concrete"
              patternUnits="userSpaceOnUse"
              width="8"
              height="8"
            >
              <rect width="8" height="8" fill="#E6DDC5" />
              <circle cx="2" cy="3" r="0.6" fill="#B8AE9A" />
              <circle cx="6" cy="6" r="0.4" fill="#B8AE9A" />
              <circle cx="4" cy="1" r="0.3" fill="#B8AE9A" />
            </pattern>
            <radialGradient id="bowl-depth" cx="55%" cy="65%" r="60%">
              <stop offset="0%" stopColor="#1a1612" />
              <stop offset="55%" stopColor="#3a342a" />
              <stop offset="100%" stopColor="#7a6f5a" />
            </radialGradient>
            <radialGradient id="bowl-rim" cx="50%" cy="40%" r="80%">
              <stop offset="0%" stopColor="#B8AE9A" />
              <stop offset="80%" stopColor="#928670" />
              <stop offset="100%" stopColor="#5e5544" />
            </radialGradient>
            <path id="skater-path" d={SKATER_PATH} fill="none" />
          </defs>

          {/* Concrete ground */}
          <rect width="700" height="700" fill="url(#bowl-concrete)" />

          {/* Iso grid */}
          <g stroke="#0E0D0B" strokeWidth="0.5" opacity="0.1">
            {Array.from({ length: 14 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 50} x2="700" y2={i * 50} />
            ))}
            {Array.from({ length: 14 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="700" />
            ))}
          </g>

          {/* Bowl — stack of elliptical rings showing depth */}
          <g transform="translate(350 360)">
            <ellipse cx="0" cy="0" rx="240" ry="170" fill="#0E0D0B" opacity="0.18" />

            <path
              d="M -220 -150 Q -240 -50 -180 80 Q -100 200 80 200 Q 230 195 240 100 Q 250 -10 200 -100 Q 130 -180 0 -180 Q -130 -180 -200 -160 Z"
              fill="url(#bowl-rim)"
              stroke="#0E0D0B"
              strokeWidth="2.5"
            />

            {[1, 0.85, 0.7, 0.55, 0.4, 0.28, 0.18].map((s, i) => (
              <path
                key={i}
                d="M -220 -150 Q -240 -50 -180 80 Q -100 200 80 200 Q 230 195 240 100 Q 250 -10 200 -100 Q 130 -180 0 -180 Q -130 -180 -200 -160 Z"
                fill={i === 6 ? "#0a0908" : "none"}
                stroke="#0E0D0B"
                strokeWidth={i === 6 ? 0 : 0.8}
                strokeDasharray={i === 0 ? undefined : "3 4"}
                opacity={0.15 + (1 - s) * 0.5}
                transform={`scale(${s}) translate(${i * -4} ${i * 8})`}
              />
            ))}

            <ellipse cx="-15" cy="20" rx="60" ry="35" fill="url(#bowl-depth)" />

            {/* Pulsing coping marks */}
            <g>
              <rect x="-50" y="-185" width="40" height="6" fill="#FF2D2D">
                <animate
                  attributeName="opacity"
                  values="0.6;1;0.6"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </rect>
              <rect
                x="120"
                y="-175"
                width="35"
                height="6"
                fill="#FF2D2D"
                transform="rotate(20 138 -172)"
              >
                <animate
                  attributeName="opacity"
                  values="0.6;1;0.6"
                  dur="2s"
                  begin="0.7s"
                  repeatCount="indefinite"
                />
              </rect>
              <rect
                x="-160"
                y="-100"
                width="35"
                height="6"
                fill="#FF2D2D"
                transform="rotate(-60 -142 -97)"
              >
                <animate
                  attributeName="opacity"
                  values="0.6;1;0.6"
                  dur="2s"
                  begin="1.4s"
                  repeatCount="indefinite"
                />
              </rect>
            </g>

            {/* Dashed carve trail */}
            <use
              href="#skater-path"
              stroke="#FF2D2D"
              strokeWidth="3"
              strokeDasharray="6 8"
              strokeLinecap="round"
              fill="none"
              opacity="0.45"
              transform="translate(-350 -360)"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-280"
                dur="3s"
                repeatCount="indefinite"
              />
            </use>

            {/* Glow behind primary skater */}
            <circle r="22" fill="#FF2D2D" opacity="0.25">
              <animateMotion dur="8s" repeatCount="indefinite">
                <mpath href="#skater-path" />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0.15;0.4;0.15"
                dur="0.8s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Primary skater (red helmet, blue body) */}
            <g>
              <animateMotion dur="8s" repeatCount="indefinite" rotate="auto">
                <mpath href="#skater-path" />
              </animateMotion>
              <g transform="translate(-350 -360)">
                <ellipse cx="0" cy="14" rx="14" ry="3" fill="#0E0D0B" opacity="0.4" />
                <rect x="-14" y="6" width="28" height="4" rx="2" fill="#0E0D0B" />
                <circle cx="-10" cy="11" r="2" fill="#F1EAD7" stroke="#0E0D0B" strokeWidth="0.5" />
                <circle cx="10" cy="11" r="2" fill="#F1EAD7" stroke="#0E0D0B" strokeWidth="0.5" />
                <ellipse cx="0" cy="-4" rx="6" ry="10" fill="#2547F0" stroke="#0E0D0B" strokeWidth="1" />
                <circle cx="0" cy="-16" r="5" fill="#F1EAD7" stroke="#0E0D0B" strokeWidth="1" />
                <path d="M -5 -16 Q -5 -21 0 -21 Q 5 -21 5 -16 Z" fill="#FF2D2D" />
                <line x1="-5" y1="-6" x2="-12" y2="2" stroke="#2547F0" strokeWidth="3" strokeLinecap="round" />
                <line x1="5" y1="-6" x2="12" y2="-12" stroke="#2547F0" strokeWidth="3" strokeLinecap="round" />
              </g>
            </g>

            {/* Second slower skater (lime body, ink helmet) */}
            <g>
              <animateMotion dur="11s" begin="-3s" repeatCount="indefinite" rotate="auto">
                <mpath href="#skater-path" />
              </animateMotion>
              <g transform="translate(-350 -360)">
                <ellipse cx="0" cy="12" rx="11" ry="2.5" fill="#0E0D0B" opacity="0.35" />
                <rect x="-11" y="5" width="22" height="3" rx="1.5" fill="#0E0D0B" />
                <circle cx="-8" cy="9" r="1.6" fill="#F1EAD7" stroke="#0E0D0B" strokeWidth="0.5" />
                <circle cx="8" cy="9" r="1.6" fill="#F1EAD7" stroke="#0E0D0B" strokeWidth="0.5" />
                <ellipse cx="0" cy="-2" rx="5" ry="8" fill="#D3F046" stroke="#0E0D0B" strokeWidth="1" />
                <circle cx="0" cy="-12" r="4" fill="#F1EAD7" stroke="#0E0D0B" strokeWidth="1" />
                <path d="M -4 -12 Q -4 -16 0 -16 Q 4 -16 4 -12 Z" fill="#0E0D0B" />
              </g>
            </g>
          </g>

          {/* Flat ground annotations below bowl */}
          <g transform="translate(60 590)">
            <rect
              width="580"
              height="80"
              fill="none"
              stroke="#0E0D0B"
              strokeWidth="1.5"
              strokeDasharray="6 4"
            />
            <line x1="200" y1="0" x2="200" y2="80" stroke="#0E0D0B" strokeWidth="1" strokeDasharray="2 3" />
            <line x1="400" y1="0" x2="400" y2="80" stroke="#0E0D0B" strokeWidth="1" strokeDasharray="2 3" />
            <text x="100" y="46" fill="#0E0D0B" fontFamily="var(--font-jetbrains-mono, monospace)" fontSize="10" letterSpacing="2" fontWeight="700">
              FLAT
            </text>
            <text x="300" y="46" fill="#0E0D0B" fontFamily="var(--font-jetbrains-mono, monospace)" fontSize="10" letterSpacing="2" fontWeight="700" textAnchor="middle">
              LAUNCH
            </text>
            <text x="490" y="46" fill="#0E0D0B" fontFamily="var(--font-jetbrains-mono, monospace)" fontSize="10" letterSpacing="2" fontWeight="700">
              RAILS
            </text>
          </g>

          {/* Callout leader lines */}
          <g fontFamily="var(--font-jetbrains-mono, monospace)" fontSize="9" fill="#0E0D0B" letterSpacing="1.5" fontWeight="700">
            <g>
              <line x1="170" y1="155" x2="220" y2="190" stroke="#0E0D0B" strokeWidth="1" />
              <circle cx="170" cy="155" r="3" fill="#FF2D2D" stroke="#0E0D0B" strokeWidth="1" />
              <text x="60" y="148" letterSpacing="1.5">SHOTGUN COPING</text>
            </g>
            <g>
              <line x1="560" y1="510" x2="510" y2="460" stroke="#0E0D0B" strokeWidth="1" />
              <circle cx="560" cy="510" r="3" fill="#FF2D2D" stroke="#0E0D0B" strokeWidth="1" />
              <text x="570" y="514">8 FT DEEP</text>
            </g>
            <g>
              <line x1="105" y1="450" x2="155" y2="420" stroke="#0E0D0B" strokeWidth="1" />
              <circle cx="105" cy="450" r="3" fill="#FF2D2D" stroke="#0E0D0B" strokeWidth="1" />
              <text x="25" y="465">5.5 FT</text>
            </g>
          </g>

          {/* Compass */}
          <g transform="translate(630 70)">
            <circle r="22" fill="#F1EAD7" stroke="#0E0D0B" strokeWidth="2" />
            <g>
              <path
                d="M 0 -16 L 4 0 L 0 16 L -4 0 Z"
                fill="#FF2D2D"
                stroke="#0E0D0B"
                strokeWidth="1"
              />
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="60s"
                repeatCount="indefinite"
              />
            </g>
            <text y="-26" textAnchor="middle" fontFamily="var(--font-jetbrains-mono, monospace)" fontSize="9" fontWeight="700">
              N
            </text>
          </g>

          {/* Stamp */}
          <g transform="translate(60 70) rotate(-8)">
            <rect x="-6" y="-14" width="140" height="32" fill="#0E0D0B" />
            <text x="64" y="0" textAnchor="middle" fill="#F1EAD7" fontFamily="var(--font-jetbrains-mono, monospace)" fontWeight="700" fontSize="11" letterSpacing="2">
              STEEZ · HYD
            </text>
            <text x="64" y="12" textAnchor="middle" fill="#D3F046" fontFamily="var(--font-jetbrains-mono, monospace)" fontSize="7" letterSpacing="1.5">
              CONCRETE · POURED · 2021
            </text>
          </g>

          {/* Live skater count */}
          <g transform="translate(595 640)">
            <rect x="-90" y="-14" width="100" height="28" fill="#0E0D0B" />
            <circle cx="-72" cy="0" r="4" fill="#D3F046">
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
            <text x="-2" y="4" textAnchor="end" fill="#F1EAD7" fontFamily="var(--font-jetbrains-mono, monospace)" fontWeight="700" fontSize="9" letterSpacing="2">
              LIVE · 3 SKATERS
            </text>
          </g>

          {/* Speed lines */}
          <g stroke="#FF2D2D" strokeWidth="1" opacity="0.4" strokeLinecap="round" fill="none">
            <line x1="610" y1="320" x2="640" y2="320">
              <animate attributeName="opacity" values="0;0.6;0" dur="1s" repeatCount="indefinite" />
            </line>
            <line x1="610" y1="335" x2="635" y2="335">
              <animate attributeName="opacity" values="0;0.6;0" dur="1s" begin="0.3s" repeatCount="indefinite" />
            </line>
            <line x1="50" y1="380" x2="80" y2="380">
              <animate attributeName="opacity" values="0;0.6;0" dur="1s" begin="0.6s" repeatCount="indefinite" />
            </line>
          </g>
        </svg>
      </div>

      {/* "Drag your cursor" hint */}
      <div
        className="absolute bottom-4 left-4 z-[6] inline-flex items-center gap-2 border-[1.5px] border-ink bg-paper px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink"
        style={{ boxShadow: "3px 3px 0 #0E0D0B" }}
      >
        <span className="text-base font-bold text-steeze-red">↕</span> drag your
        cursor — the bowl tilts
      </div>
    </div>
  );
}
