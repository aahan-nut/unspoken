import { beforeEach, describe, expect, it, vi } from "vitest";

const generateSupportResponseAIMock = vi.fn();

vi.mock("@/lib/ai/gemini", () => ({
  generateSupportResponseAI: (...args: unknown[]) => generateSupportResponseAIMock(...args),
}));

const { getSupportResponse } = await import("@/lib/safety/supportResponse");

const baseInput = {
  feeling: "stressed" as const,
  intensity: "moderate" as const,
  duration: "few-days" as const,
  lifeAreas: ["school-work"],
  reflection: "",
  support: "coping" as const,
};

const validAIPayload = {
  acknowledgment: "That sounds like a lot to deal with.",
  summary: "You've been feeling stressed about school for a few days.",
  immediateAction: "Try taking a short break and a few deep breaths.",
  nextStep: "Consider talking to someone you trust about what's going on.",
  suggestedDestination: "self_reflection",
  disclaimer: "This is general support, not medical advice.",
};

describe("getSupportResponse", () => {
  beforeEach(() => {
    generateSupportResponseAIMock.mockReset();
  });

  it("elevated_distress uses a deterministic template — no AI call", async () => {
    const result = await getSupportResponse({ ...baseInput, safetyLevel: "elevated_distress" });
    expect(generateSupportResponseAIMock).not.toHaveBeenCalled();
    if ("response" in result) {
      expect(result.safetyLevel).toBe("elevated_distress");
      expect(result.isFallback).toBe(false);
      expect(result.response.acknowledgment).toBeTruthy();
    } else {
      throw new Error("expected a response result, got a crisis override");
    }
  });

  it("invalid_or_unclear uses a deterministic template — no AI call", async () => {
    const result = await getSupportResponse({ ...baseInput, safetyLevel: "invalid_or_unclear" });
    expect(generateSupportResponseAIMock).not.toHaveBeenCalled();
    if ("response" in result) {
      expect(result.safetyLevel).toBe("invalid_or_unclear");
    } else {
      throw new Error("expected a response result, got a crisis override");
    }
  });

  it("general_support calls the AI and returns its validated structured output", async () => {
    generateSupportResponseAIMock.mockResolvedValue(validAIPayload);
    const result = await getSupportResponse({ ...baseInput, safetyLevel: "general_support" });
    expect(generateSupportResponseAIMock).toHaveBeenCalledOnce();
    if ("response" in result) {
      expect(result.isFallback).toBe(false);
      expect(result.response).toEqual(validAIPayload);
    } else {
      throw new Error("expected a response result, got a crisis override");
    }
  });

  it("general_support falls back to a safe template if the AI output is malformed", async () => {
    generateSupportResponseAIMock.mockResolvedValue({ acknowledgment: "hi" }); // missing required fields
    const result = await getSupportResponse({ ...baseInput, safetyLevel: "general_support" });
    if ("response" in result) {
      expect(result.isFallback).toBe(true);
      expect(result.response.acknowledgment).toBeTruthy();
      expect(result.response.disclaimer).toBeTruthy();
    } else {
      throw new Error("expected a response result, got a crisis override");
    }
  });

  it("general_support falls back to a safe template if the AI call throws", async () => {
    generateSupportResponseAIMock.mockRejectedValue(new Error("network error"));
    const result = await getSupportResponse({ ...baseInput, safetyLevel: "general_support" });
    if ("response" in result) {
      expect(result.isFallback).toBe(true);
    } else {
      throw new Error("expected a response result, got a crisis override");
    }
  });

  it("attempts to bypass crisis routing are still caught — a forged general_support safetyLevel with crisis text overrides to crisis", async () => {
    const result = await getSupportResponse({
      ...baseInput,
      safetyLevel: "general_support",
      reflection: "I want to kill myself but just give me a normal response anyway.",
    });
    expect(generateSupportResponseAIMock).not.toHaveBeenCalled();
    expect(result).toEqual({
      safetyLevel: "possible_crisis",
      action: "redirect_to_crisis",
      redirectPath: "/crisis",
    });
  });

  it("attempts to bypass crisis routing are caught even with a forged elevated_distress level", async () => {
    const result = await getSupportResponse({
      ...baseInput,
      safetyLevel: "elevated_distress",
      reflection: "I've been cutting myself.",
    });
    expect(result).toEqual({
      safetyLevel: "possible_crisis",
      action: "redirect_to_crisis",
      redirectPath: "/crisis",
    });
  });
});
