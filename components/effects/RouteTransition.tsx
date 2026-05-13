"use client";

import { usePathname } from "next/navigation";

// Remounts children on every route change so the .route-in CSS animation
// (defined in globals.css) replays — a soft fade-up that runs in ~280ms.
// Honors prefers-reduced-motion automatically because the animation rule
// is gated by a media query in globals.css.
export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="route-in">
      {children}
    </div>
  );
}
