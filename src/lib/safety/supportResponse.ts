import { containsCrisisLanguage } from "@/lib/ai/crisis";
import { generateSupportResponseAI } from "@/lib/ai/gemini";
import { matchesCrisisLanguage } from "@/lib/safety/rules";
import { supportResponsePayloadSchema } from "@/lib/safety/schema";
import { crisisClassification } from "@/lib/safety/types";
import type {
  SuggestedDestination,
  SupportResponseInput,
  SupportResponsePayload,
  SupportResponseResult,
} from "@/lib/safety/types";
import { supportResponses } from "@/data/mockSupportResponses";

function preferredDestination(support: SupportResponseInput["support"]): SuggestedDestination {
  if (support === "resources") return "resources";
  if (support === "talk") return "message_builder";
  return "self_reflection";
}

function elevatedDistressTemplate(input: SupportResponseInput): SupportResponsePayload {
  return {
    acknowledgment: "Thanks for being honest about how much this has been weighing on you.",
    summary:
      "What you shared sounds like something that's been sticking around and feels like a lot to carry on your own.",
    immediateAction:
      "Take a few slow breaths, and if you can, move toward a space where you feel a bit safer or calmer right now.",
    nextStep:
      "Reaching out to a trusted adult, a school counselor, or a mental health professional is a good next step — you don't have to carry this by yourself.",
    suggestedDestination: input.support === "resources" ? "resources" : "message_builder",
    disclaimer:
      "This isn't a diagnosis or medical advice. If things feel like they're getting worse, please reach out for real-time support.",
  };
}

function invalidOrUnclearTemplate(): SupportResponsePayload {
  return {
    acknowledgment: "Thanks for checking in.",
    summary:
      "We weren't able to make sense of everything you wrote, but checking in with yourself still counts for something.",
    immediateAction: "If you'd like, try rephrasing what's going on in a few plain sentences.",
    nextStep: "You can also skip straight to exploring resources or drafting a message to someone you trust.",
    suggestedDestination: "self_reflection",
    disclaimer: "This is general guidance, not medical advice or a diagnosis.",
  };
}

function generalSupportFallbackTemplate(input: SupportResponseInput): SupportResponsePayload {
  const mock = supportResponses[input.feeling];
  return {
    acknowledgment: mock.empathy,
    summary: "Thanks for taking the time to check in with yourself today.",
    immediateAction: mock.immediateAction,
    nextStep: mock.nextStep,
    suggestedDestination: preferredDestination(input.support),
    disclaimer: "This is a general suggestion, not medical advice, therapy, or a diagnosis.",
  };
}

async function generateGeneralSupportResponse(
  input: SupportResponseInput
): Promise<SupportResponseResult> {
  try {
    const raw = await generateSupportResponseAI(input);
    const parsed = supportResponsePayloadSchema.safeParse(raw);
    if (!parsed.success) {
      throw new Error("malformed AI support response");
    }
    return { safetyLevel: "general_support", response: parsed.data, isFallback: false };
  } catch (error) {
    console.error(
      "general_support AI generation failed, using fallback template:",
      error instanceof Error ? error.message : "unknown error"
    );
    return {
      safetyLevel: "general_support",
      response: generalSupportFallbackTemplate(input),
      isFallback: true,
    };
  }
}

/**
 * Generates the structured support response for a non-crisis check-in.
 * elevated_distress and invalid_or_unclear are deterministic templates —
 * predictable, no AI call — general_support is AI-generated with a safe
 * fallback if generation fails or returns something malformed.
 *
 * Defense in depth: this route re-checks the reflection text against the
 * deterministic crisis rules regardless of the safetyLevel the client
 * claims, so a forged/bypassed classify step still can't get an ordinary
 * supportive response generated for crisis-level content.
 */
export async function getSupportResponse(input: SupportResponseInput): Promise<SupportResponseResult> {
  const reflection = input.reflection?.trim() ?? "";
  if (reflection && (matchesCrisisLanguage(reflection) || containsCrisisLanguage(reflection))) {
    return crisisClassification();
  }

  if (input.safetyLevel === "elevated_distress") {
    return { safetyLevel: "elevated_distress", response: elevatedDistressTemplate(input), isFallback: false };
  }

  if (input.safetyLevel === "invalid_or_unclear") {
    return { safetyLevel: "invalid_or_unclear", response: invalidOrUnclearTemplate(), isFallback: false };
  }

  return generateGeneralSupportResponse(input);
}
