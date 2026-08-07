import type { CheckInResponses } from "@/types/checkIn";

const isBrowser = () => typeof window !== "undefined";

/**
 * Caches the parsed value per key, keyed by the raw string last seen.
 * useSyncExternalStore requires getSnapshot to return a stable reference
 * when nothing changed — JSON.parse-ing on every call would return a new
 * object each time and trigger an infinite re-render loop.
 */
const snapshotCache = new Map<string, { raw: string | null; value: unknown }>();

function readJSON<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  const raw = window.localStorage.getItem(key);
  const cached = snapshotCache.get(key);
  if (cached && cached.raw === raw) {
    return cached.value as T;
  }

  let value = fallback;
  if (raw) {
    try {
      value = JSON.parse(raw) as T;
    } catch {
      value = fallback;
    }
  }
  snapshotCache.set(key, { raw, value });
  return value;
}

function writeJSON(key: string, value: unknown): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function removeKey(key: string): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(key);
}

// --- Active check-in (single most-recent entry) ---
//
// Check-in responses are intentionally still local-only for this phase —
// see project instructions: no check-in/journal/crisis data in Supabase yet.

const CHECKIN_KEY = "unspoken-checkin";

export function saveCheckIn(responses: CheckInResponses): void {
  writeJSON(CHECKIN_KEY, responses);
}

export function loadCheckIn(): CheckInResponses | null {
  return readJSON<CheckInResponses | null>(CHECKIN_KEY, null);
}

export function clearCheckIn(): void {
  removeKey(CHECKIN_KEY);
}
