"use client";

import { useEffect, useRef, useState } from "react";

// Hand-drawn annotation primitive — underline, circle, arrow, squiggle.
// Stroke-dashoffset animates the line drawing in when the mark scrolls
// into view. Used sparingly to call out one key word per section.

type Mark = "underline" | "circle" | "arrow" | "squiggle";

const PATHS: Record<Mark, { d: string; viewBox: string }> = {
  underline: {
    d: "M2 12 Q 28 4, 60 10 Q 92 14, 118 7",
    viewBox: "0 0 120 16",
  },
  squiggle: {
    d: "M2 8 Q 12 2, 22 8 Q 32 14, 42 8 Q 52 2, 62 8 Q 72 14, 82 8 Q 92 2, 102 8 Q 112 14, 118 8",
    viewBox: "0 0 120 16",
  },
  circle: {
    d: "M50 6 C 20 8, 6 26, 14 46 C 24 64, 56 64, 80 56 C 100 48, 96 22, 76 12 C 60 4, 34 8, 22 18",
    viewBox: "0 0 100 70",
  },
  arrow: {
    d: "M4 28 Q 30 6, 58 14 M58 14 L 50 6 M58 14 L 56 24",
    viewBox: "0 0 70 36",
  },
};

export function HandMark({
  variant = "underline",
  color = "currentColor",
  strokeWidth = 2.5,
  className = "",
  delay = 0,
}: {
  variant?: Mark;
  color?: string;
  strokeWidth?: number;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<SVGPathElement>(null);
  const [drawn, setDrawn] = useState(false);
  const [length, setLength] = useState<number | null>(null);
  const config = PATHS[variant];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const len = el.getTotalLength();
    setLength(len);

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            window.setTimeout(() => setDrawn(true), delay);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <svg
      viewBox={config.viewBox}
      aria-hidden
      className={className}
      preserveAspectRatio="none"
    >
      <path
        ref={ref}
        d={config.d}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: length ?? undefined,
          strokeDashoffset: length != null && drawn ? 0 : length ?? undefined,
          transition: "stroke-dashoffset 1100ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </svg>
  );
}
