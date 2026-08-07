import { describe, expect, it } from "vitest";
import { classifyRequestSchema, supportResponseRequestSchema } from "@/lib/safety/schema";
import { MAX_REFLECTION_LENGTH } from "@/lib/safety/constants";

const validBase = {
  feeling: "anxious",
  intensity: "moderate",
  duration: "few-days",
  lifeAreas: ["school-work"],
};

describe("classifyRequestSchema", () => {
  it("accepts a minimal valid payload with empty reflection", () => {
    const result = classifyRequestSchema.safeParse({ ...validBase, reflection: "" });
    expect(result.success).toBe(true);
  });

  it("accepts a payload with no reflection field at all", () => {
    const result = classifyRequestSchema.safeParse(validBase);
    expect(result.success).toBe(true);
  });

  it("rejects reflection text over the max length", () => {
    const result = classifyRequestSchema.safeParse({
      ...validBase,
      reflection: "a".repeat(MAX_REFLECTION_LENGTH + 1),
    });
    expect(result.success).toBe(false);
  });

  it("rejects an unrecognized feeling value", () => {
    const result = classifyRequestSchema.safeParse({ ...validBase, feeling: "furious" });
    expect(result.success).toBe(false);
  });

  it("rejects an unrecognized intensity value", () => {
    const result = classifyRequestSchema.safeParse({ ...validBase, intensity: "extreme" });
    expect(result.success).toBe(false);
  });

  it("rejects malformed/missing required fields", () => {
    const result = classifyRequestSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

describe("supportResponseRequestSchema", () => {
  it("accepts general_support and elevated_distress safety levels", () => {
    expect(
      supportResponseRequestSchema.safeParse({ ...validBase, safetyLevel: "general_support" }).success
    ).toBe(true);
    expect(
      supportResponseRequestSchema.safeParse({ ...validBase, safetyLevel: "elevated_distress" }).success
    ).toBe(true);
  });

  it("rejects possible_crisis as a safetyLevel — this route must never be asked to generate an ordinary response for a crisis", () => {
    const result = supportResponseRequestSchema.safeParse({
      ...validBase,
      safetyLevel: "possible_crisis",
    });
    expect(result.success).toBe(false);
  });
});
