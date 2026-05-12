"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

// Cycles through a list of phrases with a vertical fade-swap.
// Sized via container — set width/height on the parent so each phrase
// settles into the same slot. Items render as the visible label only.
export function RotatingText({
  items,
  interval = 2400,
  className,
}: {
  items: string[];
  interval?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const t = setInterval(
      () => setI((p) => (p + 1) % items.length),
      interval
    );
    return () => clearInterval(t);
  }, [items.length, interval]);

  return (
    <span className={`relative inline-block ${className ?? ""}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={items[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {items[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
