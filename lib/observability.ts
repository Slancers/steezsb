// Minimal error sink. When SENTRY_DSN is configured, this is where the
// Sentry SDK forwarding gets wired in (Phase 2/3). For now, console.error
// is enough. Vercel logs capture it and the PRD launch checklist will
// validate real Sentry wiring before going live.
export function logError(err: unknown, context: Record<string, unknown> = {}) {
  console.error("[error]", context, err);
}
