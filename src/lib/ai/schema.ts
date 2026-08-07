import { z } from "zod";

export const RECIPIENT_TYPES = [
  "parent",
  "counselor",
  "teacher",
  "doctor",
  "therapist",
  "friend",
] as const;

export const MESSAGE_TONES = ["casual", "direct", "formal"] as const;

/**
 * Request body for POST /api/generate-message. Deliberately contains no
 * user-identifying fields (name, email, account id, location) — only what's
 * needed to draft the message.
 */
export const generateMessageRequestSchema = z.object({
  recipientType: z.enum(RECIPIENT_TYPES),
  situation: z
    .string()
    .trim()
    .min(1, "Tell us a little about what's going on.")
    .max(600, "Keep this under 600 characters."),
  desiredOutcome: z
    .string()
    .trim()
    .min(1, "Let us know what you're hoping happens.")
    .max(300, "Keep this under 300 characters."),
  tone: z.enum(MESSAGE_TONES),
  optionalContext: z
    .string()
    .trim()
    .max(600, "Keep this under 600 characters.")
    .optional()
    .default(""),
});

export type GenerateMessageRequest = z.infer<typeof generateMessageRequestSchema>;

export interface GenerateMessageSuccess {
  message: string;
}

export interface GenerateMessageCrisis {
  crisis: true;
}

export type GenerateMessageResult = GenerateMessageSuccess | GenerateMessageCrisis;

export function isCrisisResult(
  result: GenerateMessageResult
): result is GenerateMessageCrisis {
  return "crisis" in result && result.crisis === true;
}
