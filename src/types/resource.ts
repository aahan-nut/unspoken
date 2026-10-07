export type SupportCategory =
  | "crisis"
  | "counseling"
  | "peer"
  | "education"
  | "self-care";

export type ResourceModality = "in-person" | "virtual" | "both";

export type AgeGroup = "teens" | "young-adults" | "adults" | "all-ages";

export type CostCategory = "free" | "low-cost" | "sliding-scale" | "paid";

export type ResourceSort = "relevance" | "distance" | "recent" | "name";

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: SupportCategory;
  type: "hotline" | "chat" | "website" | "app" | "local";
  availability: string;
  modality: ResourceModality;
  city: string;
  zip: string | null;
  /** Miles from the searched location. Null for services with no fixed distance (national hotlines/apps). */
  distanceMiles: number | null;
  ageGroups: AgeGroup[];
  languages: string[];
  costCategory: CostCategory;
  cost: string;
  insuranceAccepted: boolean;
  phone?: string;
  address?: string;
  lastVerified: string;
  tags: string[];
  url?: string;
}

export type SavedStatus =
  | "saved"
  | "planning"
  | "contacted"
  | "appointment"
  | "not-a-fit";

export type SavedResourceSource = "internal" | "google_places" | "parent_curated";

/**
 * Mirrors a row of the `saved_resources` Supabase table (see
 * supabase/migrations/0001_init.sql, 0002_external_saved_resources.sql, and
 * 0003_parent_curated_saves.sql). A row is either an internal curated teen
 * resource (resource_id set), a live Google Places save, or a curated Parent
 * Support resource (the latter two use the external_* fields) — never both.
 */
export interface SavedResourceRow {
  id: string;
  resource_id: string | null;
  status: SavedStatus;
  private_notes: string;
  created_at: string;
  updated_at: string;
  source: SavedResourceSource;
  external_place_id: string | null;
  external_name: string | null;
  external_address: string | null;
  external_resource_type: string | null;
  external_maps_url: string | null;
}
