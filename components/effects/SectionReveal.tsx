"use client";

import { motion } from "framer-motion";

// Wraps children with a scroll-triggered fade-up. Fires once per element
// as it enters the viewport — uses Intersection Observer under the hood
// via framer-motion's whileInView.
export function SectionReveal({
  children,
  className,
  delay = 0,
  y = 40,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
