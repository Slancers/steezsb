// In-memory sliding-window rate limiter.
//
// V1 limitation: state is per-process. On Vercel each serverless function
// can have multiple warm instances, so this is best-effort, not a hard cap.
// Adequate for V1 abuse prevention. For real protection move to Upstash
// or Vercel KV in V2.
const buckets = new Map<string, number[]>();

export function rateLimit(
  key: string,
  max = 5,
  windowMs = 60_000
): { ok: boolean; remaining: number } {
  const now = Date.now();
  const cutoff = now - windowMs;
  const recent = (buckets.get(key) ?? []).filter((t) => t > cutoff);

  if (recent.length >= max) {
    buckets.set(key, recent);
    return { ok: false, remaining: 0 };
  }

  recent.push(now);
  buckets.set(key, recent);
  return { ok: true, remaining: max - recent.length };
}
