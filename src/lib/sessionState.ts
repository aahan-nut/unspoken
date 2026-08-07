import type { SafetyLevel, SupportResponsePayload } from "@/lib/safety/types";

export interface StoredSupportResult {
  safetyLevel: Exclude<SafetyLevel, "possible_crisis">;
  response: SupportResponsePayload;
  isFallback: boolean;
}

const isBrowser = () => typeof window !== "undefined";
const SUPPORT_RESULT_KEY = "unspoken-support-result";

// sessionStorage, not localStorage — this is a derived API result tied to
// the current tab/session, not something that should persist indefinitely
// or survive across sessions. See project instructions on not auto-storing
// check-in content long-term.
export function saveSupportResult(result: StoredSupportResult): void {
  if (!isBrowser()) return;
  try {
    window.sessionStorage.setItem(SUPPORT_RESULT_KEY, JSON.stringify(result));
  } catch {
    // Quota/private-browsing edge cases — losing this cache just means
    // SupportContent falls back to the mock response.
  }
}

// Same getSnapshot-caching pattern as lib/localStorage.ts, required for
// useSyncExternalStore (see lib/useClientValue.ts) to avoid an infinite
// render loop from JSON.parse returning a new object reference each call.
const snapshotCache = new Map<string, { raw: string | null; value: StoredSupportResult | null }>();

export function loadSupportResult(): StoredSupportResult | null {
  if (!isBrowser()) return null;
  const raw = window.sessionStorage.getItem(SUPPORT_RESULT_KEY);
  const cached = snapshotCache.get(SUPPORT_RESULT_KEY);
  if (cached && cached.raw === raw) {
    return cached.value;
  }

  let value: StoredSupportResult | null = null;
  if (raw) {
    try {
      value = JSON.parse(raw) as StoredSupportResult;
    } catch {
      value = null;
    }
  }
  snapshotCache.set(SUPPORT_RESULT_KEY, { raw, value });
  return value;
}

export function clearSupportResult(): void {
  if (!isBrowser()) return;
  window.sessionStorage.removeItem(SUPPORT_RESULT_KEY);
}
