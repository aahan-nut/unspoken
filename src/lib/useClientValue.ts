import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * Reads a browser-only value (e.g. localStorage) without a hydration
 * mismatch or an effect-based setState call. Returns `serverValue` during
 * SSR and the first client render, then automatically re-renders with the
 * real value right after hydration.
 */
export function useClientValue<T>(getClientValue: () => T, serverValue: T): T {
  return useSyncExternalStore(noopSubscribe, getClientValue, () => serverValue);
}
