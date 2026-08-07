/**
 * Fast, deterministic first line of defense for crisis detection — checked
 * before the AI model is ever called. The model is also instructed to flag
 * crisis content itself (see gemini.ts); this is a cheap, reliable backstop
 * that doesn't depend on model judgment for the most severe cases.
 */
const CRISIS_PATTERNS: RegExp[] = [
  /\bkill (myself|me)\b/i,
  /\bkilling (myself|me)\b/i,
  /\bsuicid(e|al)\b/i,
  /\bwant(ed)? to die\b/i,
  /\bend(ing)? my life\b/i,
  /\bno reason to live\b/i,
  /\bbetter off dead\b/i,
  /\btake my (own )?life\b/i,
  /\bself[\s-]?harm(ing)?\b/i,
  /\b(cutting|hurting) myself\b/i,
  /\boverdose\b/i,
  /\bbeing abused\b/i,
  /\babusing me\b/i,
  /\b(sexually |physically )?abused? me\b/i,
  /\braped? me\b/i,
  /\bbeing raped\b/i,
  /\bin (immediate |physical )?danger\b/i,
  /\bhe'?s going to (hurt|kill)\b/i,
  /\bshe'?s going to (hurt|kill)\b/i,
  /\bthey'?re going to (hurt|kill)\b/i,
];

export function containsCrisisLanguage(...texts: string[]): boolean {
  const combined = texts.join(" \n ");
  return CRISIS_PATTERNS.some((pattern) => pattern.test(combined));
}
