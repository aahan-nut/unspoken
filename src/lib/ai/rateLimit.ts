/**
 * Minimal in-memory sliding-window rate limiter. Good enough to blunt rapid
 * repeated submissions from a single client in this single-instance
 * prototype — it resets on server restart and isn't shared across instances,
 * so it is not a substitute for a real rate-limiting service in production.
 */
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 8;

const hitsByKey = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recentHits = (hitsByKey.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recentHits.push(now);
  hitsByKey.set(key, recentHits);
  return recentHits.length > MAX_REQUESTS_PER_WINDOW;
}
