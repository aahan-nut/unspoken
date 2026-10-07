import type { ResourceCategoryQuery } from "@/lib/geo/schema";

export type ConditionSlug = "autism" | "adhd";

/**
 * Curated, hand-reviewed resource for the Parent Support section — distinct
 * from the teen-focused `Resource` type in types/resource.ts. Mock/placeholder
 * entries live in data/parentSupport/resources.ts; isCurated + sourceLabel
 * exist so real, verified resources can replace them later without a shape
 * change.
 */
export interface ParentResource {
  id: string;
  condition: ConditionSlug;
  title: string;
  organization: string;
  description: string;
  /** Matches a ConditionConfig.resourceCategories[].value for this condition. */
  resourceType: string;
  /** ParentSituation ids this resource is relevant to. */
  situationTags: string[];
  audience: string[];
  websiteUrl: string;
  phone?: string;
  isCurated: boolean;
  sourceLabel: string;
  verifiedAt?: string;
}

export interface ParentSituation {
  id: string;
  label: string;
  description?: string;
}

export interface SituationGuidanceContent {
  understand: string;
  nextSteps: string[];
  questions: string[];
}

export interface ParentResourceCategoryOption {
  value: string;
  label: string;
}

/** Condition-specific content and config — the ADHD and Autism pages are one shared component driven by this. */
export interface ConditionConfig {
  slug: ConditionSlug;
  name: string;
  fullName: string;
  tagline: string;
  overviewParagraphs: string[];
  situations: ParentSituation[];
  guidanceBySituation: Record<string, SituationGuidanceContent>;
  resourceCategories: ParentResourceCategoryOption[];
  nearbyCategoryOptions: { value: ResourceCategoryQuery; label: string }[];
  nearbyDefaultCategory: ResourceCategoryQuery;
}
