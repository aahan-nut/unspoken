/** A single normalized result from a live Google Places (New) search. */
export interface NearbyResource {
  externalId: string;
  source: "google_places";
  name: string;
  address: string | null;
  latitude: number;
  longitude: number;
  resourceType: string | null;
  googleMapsUrl: string | null;
  businessStatus: string | null;
  /** Straight-line distance from the search origin. Null when no origin was available (manual text search). */
  distanceMiles: number | null;
  isVerified: false;
}

export interface NearbySearchResponseBody {
  resources: NearbyResource[];
  source: "google_places";
  searchedRadiusMeters: number;
}

export interface TextSearchResponseBody {
  resources: NearbyResource[];
  source: "google_places";
}
