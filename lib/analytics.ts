declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

// Push an event onto the GTM dataLayer. No-ops on the server.
// Safe to call even when GTM hasn't loaded — events queue on dataLayer
// and fire once the GTM script initialises.
export function pushEvent(
  event: string,
  params: Record<string, unknown> = {}
) {
  if (typeof window === "undefined") return;
  if (!window.dataLayer) window.dataLayer = [];
  window.dataLayer.push({ event, ...params });
}
