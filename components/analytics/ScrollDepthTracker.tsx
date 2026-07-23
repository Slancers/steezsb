"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { pushEvent } from "@/lib/analytics";

// Fires scroll_depth_50 once per route when the midpoint of the document
// enters the viewport. IntersectionObserver avoids per-frame scroll work.
export function ScrollDepthTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const sentinel = document.createElement("span");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = "position:absolute;left:0;width:1px;height:1px;pointer-events:none;opacity:0";
    document.body.appendChild(sentinel);

    const positionSentinel = () => {
      sentinel.style.top = `${document.documentElement.scrollHeight * 0.5}px`;
    };
    positionSentinel();

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      pushEvent("scroll_depth_50", { path: pathname });
      observer.disconnect();
    });
    const resizeObserver = new ResizeObserver(positionSentinel);
    observer.observe(sentinel);
    resizeObserver.observe(document.body);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      sentinel.remove();
    };
  }, [pathname]);

  return null;
}
