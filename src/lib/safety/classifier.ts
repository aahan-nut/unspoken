import { containsCrisisLanguage } from "@/lib/ai/crisis";
import { classifySafetyLevel } from "@/lib/ai/gemini";
import {
  matchesCrisisLanguage,
  matchesElevatedDistressLanguage,
  matchesPromptInjection,
  structuredElevatedDistressSignal,
} from "@/lib/safety/rules";
import type { ClassificationResult, ClassifyInput } from "@/lib/safety/types";
import { crisisClassification } from "@/lib/safety/types";

function nonCrisisResult(
  safetyLevel: Exclude<ClassificationResult["safetyLevel"], "possible_crisis">
): ClassificationResult {
  return { safetyLevel, action: "show_support_response" };
}

/**
 * Layered safety classification. Never relies on a single generative AI
 * response — deterministic rules run first and can short-circuit before any
 * model call, and the model's output can only ever raise the result to
 * possible_crisis, never silently downgrade a signal the rules already found.
 *
 * Layer 1 — deterministic crisis rules (fastest, most reliable)
 * Layer 1b — prompt-injection detection (skips the AI call entirely)
 * Layer 2 — existing crisis-check capability (lib/ai/crisis.ts), as a second opinion
 * Layer 3 — narrow model classification, only when free text remains to interpret
 * Layer 4 — final backend routing logic (this function's return statements)
 */
export async function classifySafety(input: ClassifyInput): Promise<ClassificationResult> {
  const reflection = input.reflection?.trim() ?? "";

  // Layer 1
  if (reflection && matchesCrisisLanguage(reflection)) {
    return crisisClassification();
  }

  // Layer 1b — checked before Layer 2/3 so an injection attempt never reaches the model as trusted input.
  if (reflection && matchesPromptInjection(reflection)) {
    return nonCrisisResult("invalid_or_unclear");
  }

  // Layer 2
  if (reflection && containsCrisisLanguage(reflection)) {
    return crisisClassification();
  }

  // Structured-field floor — can only push the result up to elevated_distress, never crisis.
  const textElevatedSignal = reflection ? matchesElevatedDistressLanguage(reflection) : false;
  const structuredSignal = structuredElevatedDistressSignal(input.intensity, input.duration);
  const floorLevel: "general_support" | "elevated_distress" =
    textElevatedSignal || structuredSignal ? "elevated_distress" : "general_support";

  if (!reflection) {
    // Layer 4 — no free text to classify; structured fields are the only signal.
    return nonCrisisResult(floorLevel);
  }

  // Layer 3
  try {
    const modelLevel = await classifySafetyLevel({ ...input, reflection });

    if (modelLevel === "possible_crisis") {
      return crisisClassification();
    }
    if (modelLevel === "invalid_or_unclear") {
      return nonCrisisResult("invalid_or_unclear");
    }
    if (modelLevel === "elevated_distress") {
      return nonCrisisResult("elevated_distress");
    }
    // Model said general_support — never let it downgrade below the deterministic floor.
    return nonCrisisResult(floorLevel);
  } catch (error) {
    // Layer 4 fail-safe — the model is unavailable or returned something
    // unusable. Fall back to whatever the deterministic layers already
    // found, never fail open past that.
    console.error(
      "safety model classification failed, using deterministic fallback:",
      error instanceof Error ? error.message : "unknown error"
    );
    return nonCrisisResult(floorLevel);
  }
}
