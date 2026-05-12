"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { pushEvent } from "@/lib/analytics";

// Fires scroll_depth_50 once per route when the user has scrolled past
// the midpoint of the document. Cheap passive listener; resets per path.
export function ScrollDepthTracker() {
  const pathname = usePathname();

  useEffect(() => {
    let fired = false;
    function onScroll() {
      if (fired) return;
      const viewportBottom = window.scrollY + window.innerHeight;
      const halfPage = document.body.scrollHeight * 0.5;
      if (viewportBottom >= halfPage) {
        fired = true;
        pushEvent("scroll_depth_50", { path: pathname });
        window.removeEventListener("scroll", onScroll);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return null;
}
