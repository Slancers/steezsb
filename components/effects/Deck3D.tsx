"use client";

import { useEffect, useRef } from "react";

// CSS-3D skateboard. Wraps a deck built from two SVG faces + thin side strips
// + truck/wheel divs, transformed in a perspective container.
//
// Animation loop runs in requestAnimationFrame:
//   - eases rotation toward a cursor-driven target (when cursor is over stage)
//   - gentle bob on Y/Z axis
//   - subtle Z-axis tilt sinewave
// Disables animation if user prefers reduced motion.
export function Deck3D() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const deck = deckRef.current;
    if (!wrap || !deck) return;
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      deck.style.transform = "rotateX(-18deg) rotateY(22deg)";
      return;
    }

    const target = { x: -18, y: 22 };
    const current = { x: -18, y: 22 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      target.x = -18 + dy * -15;
      target.y = 22 + dx * 30;
    };

    const onLeave = () => {
      target.x = -18;
      target.y = 22;
    };

    window.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);

    const tick = (now: number) => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      const t = now * 0.001;
      const bobY = Math.sin(t * 1.2) * 8;
      const bobZ = Math.sin(t * 0.8) * 12;
      const wobble = Math.sin(t) * 2;
      deck.style.transform = `translateY(${bobY}px) translateZ(${bobZ}px) rotateX(${current.x}deg) rotateY(${current.y}deg) rotateZ(${wobble}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative h-[360px] w-full overflow-hidden sm:h-[420px] md:h-[580px]"
      style={{ perspective: "1400px" }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          ref={deckRef}
          className="relative h-[110px] w-[380px]"
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {/* Top face (griptape) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: "translateZ(8px)",
            }}
          >
            <svg viewBox="0 0 280 80" preserveAspectRatio="none" width="100%" height="100%">
              <defs>
                <pattern id="grip" patternUnits="userSpaceOnUse" width="6" height="6">
                  <rect width="6" height="6" fill="#0E0D0B" />
                  <circle cx="3" cy="3" r="0.7" fill="#2A2722" />
                </pattern>
              </defs>
              <path
                d="M 0 40 Q 0 8 40 8 L 240 8 Q 280 8 280 40 Q 280 72 240 72 L 40 72 Q 0 72 0 40 Z"
                fill="url(#grip)"
              />
              <g transform="translate(140 40)">
                <text
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#FF2D2D"
                  fontFamily="var(--font-space-mono, Space Mono)"
                  fontWeight="700"
                  fontSize="28"
                  letterSpacing="-1"
                >
                  STEEZ
                </text>
                <text
                  y="20"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#D3F046"
                  fontFamily="var(--font-jetbrains-mono, JetBrains Mono)"
                  fontWeight="700"
                  fontSize="7"
                  letterSpacing="2"
                >
                  HYDERABAD · IND
                </text>
              </g>
            </svg>
          </div>

          {/* Bottom face (graphic) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: "translateZ(-8px) rotateY(180deg)",
            }}
          >
            <svg viewBox="0 0 280 80" preserveAspectRatio="none" width="100%" height="100%">
              <path
                d="M 0 40 Q 0 8 40 8 L 240 8 Q 280 8 280 40 Q 280 72 240 72 L 40 72 Q 0 72 0 40 Z"
                fill="#F1EAD7"
                stroke="#0E0D0B"
                strokeWidth="2"
              />
              <circle cx="80" cy="40" r="24" fill="#FF2D2D" />
              <text
                x="80"
                y="40"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#F1EAD7"
                fontFamily="var(--font-space-mono, Space Mono)"
                fontWeight="700"
                fontSize="14"
              >
                S
              </text>
              <rect x="120" y="20" width="120" height="8" fill="#0E0D0B" />
              <rect x="120" y="34" width="80" height="6" fill="#FF2D2D" />
              <rect x="120" y="46" width="100" height="4" fill="#0E0D0B" />
              <text
                x="120"
                y="62"
                fill="#0E0D0B"
                fontFamily="var(--font-jetbrains-mono, JetBrains Mono)"
                fontWeight="700"
                fontSize="6"
                letterSpacing="2"
              >
                EST · 2019 · HYD
              </text>
              <circle cx="240" cy="20" r="4" fill="#2547F0" />
              <circle cx="250" cy="20" r="2" fill="#D3F046" />
            </svg>
          </div>

          {/* Sides — thin strips for depth */}
          <div
            className="absolute border border-ink bg-[#2A2722]"
            style={{
              width: "calc(100% - 80px)",
              height: 16,
              top: -8,
              left: 40,
              transform: "rotateX(90deg) translateZ(8px)",
            }}
          />
          <div
            className="absolute border border-ink bg-[#2A2722]"
            style={{
              width: "calc(100% - 80px)",
              height: 16,
              bottom: -8,
              left: 40,
              transform: "rotateX(-90deg) translateZ(8px)",
            }}
          />
          <div
            className="absolute bg-ink"
            style={{
              width: 16,
              height: "calc(100% - 16px)",
              top: 8,
              left: -8,
              transform: "rotateY(-90deg) translateZ(-8px)",
              borderRadius: "50% 0 0 50%",
            }}
          />
          <div
            className="absolute bg-ink"
            style={{
              width: 16,
              height: "calc(100% - 16px)",
              top: 8,
              right: -8,
              transform: "rotateY(90deg) translateZ(-8px)",
              borderRadius: "0 50% 50% 0",
            }}
          />

          {/* Trucks + wheels */}
          {(["front", "back"] as const).map((pos) => (
            <div
              key={pos}
              className="absolute left-1/2 w-20"
              style={{
                height: 14,
                transformStyle: "preserve-3d",
                transform: "translateX(-50%) translateZ(-22px)",
                [pos === "front" ? "top" : "bottom"]: 14,
              }}
            >
              <div
                className="absolute"
                style={{
                  top: "50%",
                  left: -10,
                  right: -10,
                  height: 4,
                  background: "#B8AE9A",
                  transform: "translateY(-50%)",
                  borderRadius: 2,
                }}
              />
              {["left", "right"].map((side) => (
                <div
                  key={side}
                  className="absolute h-[18px] w-[18px] rounded-full border-2 border-ink"
                  style={{
                    background:
                      "radial-gradient(circle, #F1EAD7 0%, #F1EAD7 35%, #0E0D0B 36%, #0E0D0B 38%, #F1EAD7 39%, #F1EAD7 100%)",
                    top: "50%",
                    transform: "translateY(-50%)",
                    [side]: -20,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Floating stamps around the deck */}
      <div
        className="absolute font-mono text-[10px] font-bold uppercase tracking-[0.16em]"
        style={{
          top: "10%",
          left: "5%",
          transform: "rotate(-6deg)",
          border: "1.5px solid #0E0D0B",
          padding: "6px 10px",
          background: "#F1EAD7",
        }}
      >
        <span className="text-steeze-red">●</span>&nbsp;LIVE · HYD
      </div>
      <div
        className="absolute font-sticker text-2xl text-steeze-red animate-bob"
        style={{ top: "8%", right: "12%" }}
      >
        SKATE OR DON&apos;T
      </div>
      <div
        className="absolute font-mono text-[10px] font-bold uppercase tracking-[0.16em]"
        style={{
          bottom: "14%",
          left: "8%",
          transform: "rotate(4deg)",
          border: "1.5px solid #0E0D0B",
          padding: "6px 10px",
          background: "#D3F046",
        }}
      >
        7.75&quot; · maple
      </div>
      <div
        className="absolute font-mono text-[10px] font-bold uppercase tracking-[0.16em]"
        style={{
          bottom: "20%",
          right: "6%",
          transform: "rotate(-3deg)",
          border: "1.5px solid #2547F0",
          padding: "6px 10px",
          background: "#2547F0",
          color: "#F1EAD7",
        }}
      >
        coached by hari
      </div>
    </div>
  );
}
