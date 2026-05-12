"use client";

import { useEffect } from "react";

import { pushEvent } from "@/lib/analytics";

// Fires kit_view once when the visitor lands on /shop. PRD-defined
// "medium priority" conversion event.
export function KitViewTracker() {
  useEffect(() => {
    pushEvent("kit_view");
  }, []);
  return null;
}
