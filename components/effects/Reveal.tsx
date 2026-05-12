"use client";

import { useEffect, useRef } from "react";

// IntersectionObserver-driven scroll reveal. Adds `.in` to the target once
// it enters the viewport — paired with .reveal / .reveal-stagger CSS classes
// in globals.css. Once-only; unobserves after firing.
export function Reveal({
  children,
  className = "",
  stagger = false,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = `${stagger ? "reveal-stagger" : "reveal"} ${className}`.trim();

  return (
    <div ref={ref} className={cls}>
      {children}
    </div>
  );
}
