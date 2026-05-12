"use client";

import { useEffect } from "react";

import { pushEvent } from "@/lib/analytics";

// Fires faq_engagement once when the visitor scrolls past 50% of the
// FAQ page. Since the FAQ is rendered open (not collapsed) per PRD,
// scroll depth is the right engagement signal here.
export function FaqEngagementTracker() {
  useEffect(() => {
    let fired = false;
    function onScroll() {
      if (fired) return;
      const viewportBottom = window.scrollY + window.innerHeight;
      const halfPage = document.body.scrollHeight * 0.5;
      if (viewportBottom >= halfPage) {
        fired = true;
        pushEvent("faq_engagement");
        window.removeEventListener("scroll", onScroll);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
