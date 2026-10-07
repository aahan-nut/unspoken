import "server-only";
import { milesBetween } from "@/lib/geo/distance";
import type { ResourceCategoryQuery } from "@/lib/geo/schema";
import type { NearbyResource } from "@/types/geo";

/**
 * Server-only Google Places API (New) client. This is the only module that
 * talks to Google — callers (the API routes) only ever see normalized
 * NearbyResource[], so swapping providers later means editing this file.
 */

const TEXT_SEARCH_ENDPOINT = "https://places.googleapis.com/v1/places:searchText";

// Keep the field mask to exactly what the resource cards use — Google bills
// by field group, and reviews/photos/hours/phone aren't needed yet.
const FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.location",
  "places.primaryType",
  "places.googleMapsUri",
  "places.businessStatus",
].join(",");

const MAX_RESULTS = 12;
const REQUEST_TIMEOUT_MS = 8_000;

// Table A of the Places API (New) doesn't include mental-health-specific
// types like "psychologist" or "counselor", so we use Text Search's
// natural-language matching instead of Nearby Search's typed `includedTypes`.
const CATEGORY_QUERIES: Record<ResourceCategoryQuery, string> = {
  "mental-health": "mental health clinic",
  psychologist: "psychologist",
  counselor: "counselor",
  psychotherapist: "psychotherapist",
  "community-health-center": "community health center",
  "youth-support": "youth support service",
  "family-counseling": "family counseling service",
  "developmental-pediatrics": "developmental pediatrician",
  "autism-support": "autism support organization",
  "occupational-therapy": "occupational therapy",
  "speech-therapy": "speech language pathologist",
  "behavioral-health-center": "behavioral health center",
  "family-support": "family support services",
  "pediatric-behavioral-health": "pediatric behavioral health",
  "child-psychologist": "child psychologist",
};

export class PlacesConfigError extends Error {
  constructor() {
    super("GOOGLE_PLACES_API_KEY is not set.");
    this.name = "PlacesConfigError";
  }
}

interface GooglePlace {
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  location?: { latitude?: number; longitude?: number };
  primaryType?: string;
  googleMapsUri?: string;
  businessStatus?: string;
}

interface GooglePlacesTextSearchResponse {
  places?: GooglePlace[];
}

function getApiKey(): string {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    throw new PlacesConfigError();
  }
  return apiKey;
}

async function callTextSearch(body: Record<string, unknown>): Promise<GooglePlace[]> {
  const apiKey = getApiKey();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(TEXT_SEARCH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": FIELD_MASK,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Places search timed out.");
    }
    throw new Error("Places search request failed.");
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    // Don't forward the upstream error body — it can echo request details.
    throw new Error(`Places API responded with status ${response.status}.`);
  }

  const data = (await response.json()) as GooglePlacesTextSearchResponse;
  return data.places ?? [];
}

function hasCoordinates(
  location: GooglePlace["location"]
): location is { latitude: number; longitude: number } {
  return (
    typeof location?.latitude === "number" && typeof location?.longitude === "number"
  );
}

function normalize(
  place: GooglePlace,
  origin: { latitude: number; longitude: number } | null
): NearbyResource | null {
  if (!place.id || !place.displayName?.text || !hasCoordinates(place.location)) {
    return null;
  }

  const { latitude, longitude } = place.location;

  return {
    externalId: place.id,
    source: "google_places",
    name: place.displayName.text,
    address: place.formattedAddress ?? null,
    latitude,
    longitude,
    resourceType: place.primaryType ?? null,
    googleMapsUrl: place.googleMapsUri ?? null,
    businessStatus: place.businessStatus ?? null,
    distanceMiles: origin
      ? milesBetween(origin.latitude, origin.longitude, latitude, longitude)
      : null,
    isVerified: false,
  };
}

export async function searchNearbyPlaces(params: {
  latitude: number;
  longitude: number;
  radiusMeters: number;
  resourceCategory: ResourceCategoryQuery;
}): Promise<NearbyResource[]> {
  const places = await callTextSearch({
    textQuery: CATEGORY_QUERIES[params.resourceCategory],
    pageSize: MAX_RESULTS,
    locationBias: {
      circle: {
        center: { latitude: params.latitude, longitude: params.longitude },
        radius: params.radiusMeters,
      },
    },
  });

  const origin = { latitude: params.latitude, longitude: params.longitude };
  return places
    .map((place) => normalize(place, origin))
    .filter((resource): resource is NearbyResource => resource !== null)
    .sort((a, b) => (a.distanceMiles ?? Infinity) - (b.distanceMiles ?? Infinity));
}

export async function searchPlacesByText(params: {
  location: string;
  resourceCategory: ResourceCategoryQuery;
}): Promise<NearbyResource[]> {
  const places = await callTextSearch({
    textQuery: `${CATEGORY_QUERIES[params.resourceCategory]} near ${params.location}`,
    pageSize: MAX_RESULTS,
  });

  return places
    .map((place) => normalize(place, null))
    .filter((resource): resource is NearbyResource => resource !== null);
}
