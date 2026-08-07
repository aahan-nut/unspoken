import type { Duration, Feeling, Intensity, SupportType } from "@/types/checkIn";

/**
 * Routing categories, not diagnoses — these decide which backend path a
 * check-in takes, and are never shown to the user as a clinical label.
 */
export type SafetyLevel =
  | "general_support"
  | "elevated_distress"
  | "possible_crisis"
  | "invalid_or_unclear";

export interface ClassifyInput {
  feeling: Feeling;
  intensity: Intensity;
  duration: Duration;
  lifeAreas: string[];
  reflection?: string;
}

export interface CrisisClassification {
  safetyLevel: "possible_crisis";
  action: "redirect_to_crisis";
  redirectPath: "/crisis";
}

export interface NonCrisisClassification {
  safetyLevel: Exclude<SafetyLevel, "possible_crisis">;
  action: "show_support_response";
}

export type ClassificationResult = CrisisClassification | NonCrisisClassification;

export function isCrisisClassification(result: unknown): result is CrisisClassification {
  return (
    typeof result === "object" &&
    result !== null &&
    "action" in result &&
    (result as { action: unknown }).action === "redirect_to_crisis"
  );
}

export function crisisClassification(): CrisisClassification {
  return { safetyLevel: "possible_crisis", action: "redirect_to_crisis", redirectPath: "/crisis" };
}

export type SuggestedDestination = "message_builder" | "resources" | "self_reflection";

/** Structured, non-diagnostic response shown on the support page. */
export interface SupportResponsePayload {
  acknowledgment: string;
  summary: string;
  immediateAction: string;
  nextStep: string;
  suggestedDestination: SuggestedDestination;
  disclaimer: string;
}

export interface SupportResponseInput extends ClassifyInput {
  safetyLevel: Exclude<SafetyLevel, "possible_crisis">;
  /** The user's own stated preference from check-in step 6 — biases suggestedDestination. */
  support?: SupportType | null;
}

export interface SupportResponseSuccess {
  safetyLevel: Exclude<SafetyLevel, "possible_crisis">;
  response: SupportResponsePayload;
  isFallback: boolean;
}

/** The support-response route can still redirect to crisis — see lib/safety/supportResponse.ts for why. */
export type SupportResponseResult = SupportResponseSuccess | CrisisClassification;
