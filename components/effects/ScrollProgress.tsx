"use client";

import { useEffect, useState } from "react";

// Thin red bar fixed under the nav, width fills as the page scrolls.
// Pure scroll listener, requestAnimationFrame-throttled, ~30 LOC. No deps.
export function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let ticking = false;
    function update() {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? Math.min(100, (scrolled / max) * 100) : 0);
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent"
    >
      <div
        className="h-full origin-left bg-steeze-red transition-[width] duration-100 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
