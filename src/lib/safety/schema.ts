import {
  durationOptions,
  feelingOptions,
  intensityOptions,
  lifeAreaOptions,
  supportOptions,
} from "@/data/mockSupportResponses";
import { MAX_REFLECTION_LENGTH } from "@/lib/safety/constants";
import type { Duration, Feeling, Intensity, SupportType } from "@/types/checkIn";
import { z } from "zod";

const FEELING_VALUES = feelingOptions.map((o) => o.value) as [Feeling, ...Feeling[]];
const INTENSITY_VALUES = intensityOptions.map((o) => o.value) as [Intensity, ...Intensity[]];
const DURATION_VALUES = durationOptions.map((o) => o.value) as [Duration, ...Duration[]];
const LIFE_AREA_VALUES = lifeAreaOptions.map((o) => o.value) as [string, ...string[]];
const SUPPORT_VALUES = supportOptions.map((o) => o.value) as [SupportType, ...SupportType[]];

export const classifyRequestSchema = z.object({
  feeling: z.enum(FEELING_VALUES),
  intensity: z.enum(INTENSITY_VALUES),
  duration: z.enum(DURATION_VALUES),
  lifeAreas: z.array(z.enum(LIFE_AREA_VALUES)).max(10).optional().default([]),
  reflection: z
    .string()
    .trim()
    .max(MAX_REFLECTION_LENGTH, `Keep this under ${MAX_REFLECTION_LENGTH} characters.`)
    .optional()
    .default(""),
});

export type ClassifyRequestBody = z.infer<typeof classifyRequestSchema>;

// possible_crisis is deliberately excluded — the support-response route must
// never be asked to generate ordinary content for a crisis-level check-in.
export const supportResponseRequestSchema = classifyRequestSchema.extend({
  safetyLevel: z.enum(["general_support", "elevated_distress", "invalid_or_unclear"]),
  support: z.enum(SUPPORT_VALUES).optional().nullable(),
});

export type SupportResponseRequestBody = z.infer<typeof supportResponseRequestSchema>;

/** Validates the AI's raw JSON before it's ever sent to the frontend. */
export const supportResponsePayloadSchema = z.object({
  acknowledgment: z.string().trim().min(1).max(300),
  summary: z.string().trim().min(1).max(400),
  immediateAction: z.string().trim().min(1).max(300),
  nextStep: z.string().trim().min(1).max(300),
  suggestedDestination: z.enum(["message_builder", "resources", "self_reflection"]),
  disclaimer: z.string().trim().min(1).max(300),
});
