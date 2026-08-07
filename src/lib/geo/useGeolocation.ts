"use client";

import { useCallback, useState } from "react";

export type GeolocationStatus = "idle" | "loading" | "success" | "error";
export type GeolocationErrorReason = "unsupported" | "denied" | "timeout" | "unavailable" | "unknown";

interface GeolocationState {
  status: GeolocationStatus;
  errorReason: GeolocationErrorReason | null;
}

// Coarse accuracy and a bounded timeout are enough to bias a search radius —
// no need to drain the battery or make the user wait on GPS lock.
const GEOLOCATION_OPTIONS: PositionOptions = {
  enableHighAccuracy: false,
  timeout: 10_000,
  maximumAge: 0,
};

/**
 * Wraps navigator.geolocation.getCurrentPosition (never watchPosition — this
 * is a one-shot lookup, not continuous tracking). Coordinates are handed to
 * the caller's onSuccess callback and never retained here, in localStorage,
 * or anywhere persistent — see the "Use My Location" flow in NearbySearch.
 */
export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({ status: "idle", errorReason: null });

  const requestLocation = useCallback(
    (onSuccess: (coords: { latitude: number; longitude: number }) => void) => {
      if (typeof navigator === "undefined" || !navigator.geolocation) {
        setState({ status: "error", errorReason: "unsupported" });
        return;
      }

      setState({ status: "loading", errorReason: null });

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState({ status: "success", errorReason: null });
          onSuccess({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          let reason: GeolocationErrorReason = "unknown";
          if (error.code === error.PERMISSION_DENIED) reason = "denied";
          else if (error.code === error.TIMEOUT) reason = "timeout";
          else if (error.code === error.POSITION_UNAVAILABLE) reason = "unavailable";
          setState({ status: "error", errorReason: reason });
        },
        GEOLOCATION_OPTIONS
      );
    },
    []
  );

  const reset = useCallback(() => setState({ status: "idle", errorReason: null }), []);

  return { ...state, requestLocation, reset };
}
