"use client";

import { useState } from "react";

type Item = { q: string; a: string };

// Snap-motion accordion list. First item is open by default. Click any
// item to toggle; click the open one again to close all.
export function FAQAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="border-t-[1.5px] border-ink">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-b border-ink/20">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="group flex w-full items-center gap-6 py-6 text-left"
            >
              <div className="w-10 shrink-0 font-mono text-xs uppercase tracking-[0.18em] text-ink/60">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div
                className={`flex-1 font-display text-xl font-bold uppercase leading-tight -tracking-[0.02em] transition-colors group-hover:text-steeze-red md:text-2xl lg:text-[2rem] ${
                  isOpen ? "text-steeze-red" : ""
                }`}
              >
                {item.q}
              </div>
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center border-[1.5px] font-mono text-lg leading-none transition-all duration-300 ${
                  isOpen
                    ? "rotate-45 border-steeze-red bg-steeze-red text-paper"
                    : "border-ink bg-paper text-ink"
                }`}
              >
                +
              </div>
            </button>
            <div
              className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="max-w-[720px] pb-6 pl-[40px] pr-4 text-[15px] leading-relaxed text-ink-soft">
                  {item.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
