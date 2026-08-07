import { z } from "zod";

/**
 * Search phrases we hand to Google Text Search (New) — not raw Places "included
 * types". Types like "psychologist" or "counselor" aren't part of Google's
 * supported place-type table, so we lean on Text Search's natural-language
 * matching instead of Nearby Search's typed filtering. See lib/geo/places.ts.
 */
export const RESOURCE_CATEGORIES = [
  "mental-health",
  "psychologist",
  "counselor",
  "psychotherapist",
  "community-health-center",
  "youth-support",
  "family-counseling",
] as const;

export type ResourceCategoryQuery = (typeof RESOURCE_CATEGORIES)[number];

export const MIN_RADIUS_METERS = 1_000;
export const MAX_RADIUS_METERS = 50_000; // Google Places API's own maximum.
const DEFAULT_RADIUS_METERS = 16_000;

export const nearbySearchRequestSchema = z.object({
  latitude: z.number().min(-90, "Invalid latitude.").max(90, "Invalid latitude."),
  longitude: z.number().min(-180, "Invalid longitude.").max(180, "Invalid longitude."),
  radiusMeters: z
    .number()
    .int()
    .min(MIN_RADIUS_METERS, "Search radius is too small.")
    .max(MAX_RADIUS_METERS, "Search radius is too large.")
    .optional()
    .default(DEFAULT_RADIUS_METERS),
  resourceCategory: z.enum(RESOURCE_CATEGORIES).optional().default("mental-health"),
});

export type NearbySearchRequest = z.infer<typeof nearbySearchRequestSchema>;

// Letters, numbers, spaces, and a small set of punctuation used in city/ZIP
// input (e.g. "Cerritos, CA" or "90703-1234") — blocks attempts to inject
// arbitrary text into the Google query string.
const LOCATION_PATTERN = /^[a-zA-Z0-9\s,.#-]+$/;

export const textSearchRequestSchema = z.object({
  location: z
    .string()
    .trim()
    .min(2, "Enter a city or ZIP code.")
    .max(100, "Keep this under 100 characters.")
    .regex(LOCATION_PATTERN, "Use only letters, numbers, spaces, and basic punctuation."),
  resourceCategory: z.enum(RESOURCE_CATEGORIES).optional().default("mental-health"),
});

export type TextSearchRequest = z.infer<typeof textSearchRequestSchema>;

export const resourceCategoryOptions: { value: ResourceCategoryQuery; label: string }[] = [
  { value: "mental-health", label: "Mental health clinic" },
  { value: "psychologist", label: "Psychologist" },
  { value: "counselor", label: "Counselor" },
  { value: "psychotherapist", label: "Psychotherapist" },
  { value: "community-health-center", label: "Community health center" },
  { value: "youth-support", label: "Youth support service" },
  { value: "family-counseling", label: "Family counseling service" },
];
