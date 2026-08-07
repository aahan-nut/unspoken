import { SAFETY_RATE_LIMIT_MAX_REQUESTS, SAFETY_RATE_LIMIT_WINDOW_MS } from "@/lib/safety/constants";

/**
 * Same in-memory sliding-window approach as lib/ai/rateLimit.ts and
 * lib/geo/rateLimit.ts, shared by /api/safety/classify and
 * /api/support-response — one check-in submission naturally hits both.
 */
const hitsByKey = new Map<string, number[]>();

export function isSafetyRateLimited(key: string): boolean {
  const now = Date.now();
  const recentHits = (hitsByKey.get(key) ?? []).filter(
    (t) => now - t < SAFETY_RATE_LIMIT_WINDOW_MS
  );
  recentHits.push(now);
  hitsByKey.set(key, recentHits);
  return recentHits.length > SAFETY_RATE_LIMIT_MAX_REQUESTS;
}
