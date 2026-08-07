import type { Duration, Intensity } from "@/types/checkIn";

/**
 * Layer 1 of the safety-classification pipeline: fast, deterministic pattern
 * matching. Checked before any AI call — cheapest, most reliable, and not
 * dependent on model judgment for the highest-stakes cases. Covers direct
 * wording, common slang/misspellings used to dodge filters, and indirect
 * phrasing. Not exhaustive — layers 2 and 3 (lib/safety/classifier.ts) exist
 * precisely because no fixed pattern list can be.
 */
const CRISIS_PATTERNS: RegExp[] = [
  /\bkill(ing)? (myself|me)\b/i,
  /\bsuicid(e|al)\b/i,
  /\b(siucide|siucidal|sucidal|sucide|suicidle|suicidol|suisid(e|al)?|suicde)\b/i,
  /\bkms\b/i,
  /\bkys\b/i,
  /\bunaliv(e|ed|ing)\b/i,
  /\bsewerslide\b/i,
  /\bwant(ed)? to die\b/i,
  /\bdon'?t want to (be alive|live|exist) anymore\b/i,
  /\bend(ing)? (it all|my life)\b/i,
  /\bno reason to (live|be here)\b/i,
  /\bbetter off dead\b/i,
  /\btake my (own )?life\b/i,
  /\bself[\s-]?harm(ing)?\b/i,
  /\b(cutting|hurting) myself\b/i,
  /\boverdos(e|ing)\b/i,
  /\bcan'?t (go on|take (it|this) anymore)\b/i,
  /\bwhat'?s the point of (anything|living|going on)\b/i,
  /\bbeing abused\b/i,
  /\babusing me\b/i,
  /\b(sexually |physically )?abused? me\b/i,
  /\braped? me\b/i,
  /\bin (immediate |physical )?danger\b/i,
  /\b(he|she|they)'?s? going to (hurt|kill) me\b/i,
  /\bnot safe at home\b/i,
];

/** Persistent hopelessness / heavy distress language — short of an explicit crisis signal. */
const ELEVATED_DISTRESS_PATTERNS: RegExp[] = [
  /\bhopeless\b/i,
  /\bno point (in )?anymore\b/i,
  /\bgiving up\b/i,
  /\bnothing (will |ever )?(gets? better|changes?|matters)\b/i,
  /\bso tired of (everything|this|it all)\b/i,
  /\beverything feels pointless\b/i,
  /\bcan'?t (cope|handle (this|it) anymore)\b/i,
  /\bfeel(ing)? (completely |totally )?alone\b/i,
  /\bfalling apart\b/i,
];

/**
 * Attempts to redirect the classifier/generator away from its instructions
 * rather than genuine emotional content. Caught before any AI call — this
 * text should never reach a model as if it were a legitimate user message.
 */
const PROMPT_INJECTION_PATTERNS: RegExp[] = [
  /\bignore (the |all )?(previous|above|prior) instructions?\b/i,
  /\bdisregard (the |all )?(previous|above|prior) instructions?\b/i,
  /\byou are now\b/i,
  /\bpretend (you'?re|you are|to be)\b/i,
  /\bact as (a|an|my)\b/i,
  /\breveal your (system|instructions|prompt)\b/i,
  /\bsystem prompt\b/i,
  /\bjailbreak\b/i,
  /\bnew instructions?:/i,
  /\bforget (everything|your instructions)\b/i,
];

export function matchesCrisisLanguage(text: string): boolean {
  return CRISIS_PATTERNS.some((pattern) => pattern.test(text));
}

export function matchesElevatedDistressLanguage(text: string): boolean {
  return ELEVATED_DISTRESS_PATTERNS.some((pattern) => pattern.test(text));
}

export function matchesPromptInjection(text: string): boolean {
  return PROMPT_INJECTION_PATTERNS.some((pattern) => pattern.test(text));
}

const ELEVATED_INTENSITIES = new Set<Intensity>(["strong", "intense"]);
const PERSISTENT_DURATIONS = new Set<Duration>(["few-weeks", "month-plus"]);

/**
 * Structured-field-only heuristic — caps at elevated_distress and never
 * escalates to possible_crisis on its own. Reaching the crisis category from
 * dropdown selections alone (no explicit language) would be an alarming,
 * paternalistic false positive; crisis routing always requires an explicit
 * text signal (see lib/safety/classifier.ts).
 */
export function structuredElevatedDistressSignal(
  intensity: Intensity | null,
  duration: Duration | null
): boolean {
  if (intensity === "intense") return true;
  if (intensity && ELEVATED_INTENSITIES.has(intensity) && duration && PERSISTENT_DURATIONS.has(duration)) {
    return true;
  }
  return false;
}
