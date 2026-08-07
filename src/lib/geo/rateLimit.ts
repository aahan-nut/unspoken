/**
 * Same minimal in-memory sliding-window approach as lib/ai/rateLimit.ts, kept
 * as an independent instance so nearby-resource search has its own quota
 * separate from the AI message generator. Resets on server restart and isn't
 * shared across instances — fine for this single-instance prototype.
 */
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 12;

const hitsByKey = new Map<string, number[]>();

export function isGeoRateLimited(key: string): boolean {
  const now = Date.now();
  const recentHits = (hitsByKey.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recentHits.push(now);
  hitsByKey.set(key, recentHits);
  return recentHits.length > MAX_REQUESTS_PER_WINDOW;
}
