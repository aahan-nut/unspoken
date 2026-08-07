"use client";

import { PageContainer } from "@/components/layout/PageContainer";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { CheckInOptionCard } from "@/components/ui/CheckInOptionCard";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { Textarea } from "@/components/ui/FormField";
import { ProgressIndicator } from "@/components/ui/ProgressIndicator";
import { saveCheckIn } from "@/lib/localStorage";
import { saveSupportResult } from "@/lib/sessionState";
import { FetchTimeoutError, postJSON } from "@/lib/fetchJson";
import { MAX_REFLECTION_LENGTH } from "@/lib/safety/constants";
import { isCrisisClassification } from "@/lib/safety/types";
import type { ClassificationResult, SupportResponseResult } from "@/lib/safety/types";
import {
  durationOptions,
  feelingOptions,
  intensityOptions,
  lifeAreaOptions,
  supportOptions,
} from "@/data/mockSupportResponses";
import type { Duration, Feeling, Intensity, SupportType } from "@/types/checkIn";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const TOTAL_STEPS = 6;

const stepLabels = [
  "Feeling",
  "Intensity",
  "Duration",
  "Life areas",
  "Reflection",
  "Support",
];

export function CheckInFlow() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [feeling, setFeeling] = useState<Feeling | null>(null);
  const [intensity, setIntensity] = useState<Intensity | null>(null);
  const [duration, setDuration] = useState<Duration | null>(null);
  const [lifeAreas, setLifeAreas] = useState<string[]>([]);
  const [reflection, setReflection] = useState("");
  const [support, setSupport] = useState<SupportType | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const toggleLifeArea = (value: string) => {
    setLifeAreas((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const goNext = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSkip = () => {
    if (step === 4) setLifeAreas([]);
    if (step === 5) setReflection("");
    goNext();
  };

  const handleFinish = async () => {
    if (isSubmitting || !feeling || !intensity || !duration) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const checkInPayload = { feeling, intensity, duration, lifeAreas, reflection };

    try {
      // The frontend never decides the safety category itself — it only
      // branches on what the backend returns.
      const classification = await postJSON<ClassificationResult>(
        "/api/safety/classify",
        checkInPayload
      );

      saveCheckIn({
        feeling,
        intensity,
        duration,
        lifeAreas,
        reflection,
        support,
        completedAt: new Date().toISOString(),
      });

      if (isCrisisClassification(classification)) {
        router.push("/crisis");
        return;
      }

      const supportResult = await postJSON<SupportResponseResult>("/api/support-response", {
        ...checkInPayload,
        safetyLevel: classification.safetyLevel,
        support,
      });

      if (isCrisisClassification(supportResult)) {
        router.push("/crisis");
        return;
      }

      saveSupportResult(supportResult);
      router.push("/support");
    } catch (error) {
      setSubmitError(
        error instanceof FetchTimeoutError
          ? "This is taking longer than expected. Please try again."
          : "Something went wrong submitting your check-in. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const canContinue =
    (step === 1 && feeling !== null) ||
    (step === 2 && intensity !== null) ||
    (step === 3 && duration !== null) ||
    (step === 4 && lifeAreas.length > 0) ||
    (step === 5 && reflection.trim().length > 0);

  const showSkip = step === 4 || step === 5;

  return (
    <PageContainer narrow>
      <div className="mb-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
          Check in with yourself
        </h1>
        <p className="mt-2 text-muted">
          Take your time. There are no wrong answers here.
        </p>
      </div>

      <ProgressIndicator
        currentStep={step}
        totalSteps={TOTAL_STEPS}
        labels={stepLabels}
        className="mb-8"
      />

      <Disclaimer className="mb-8" />

      {/* Step 1: Feeling */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-foreground">
              What&apos;s closest to how you&apos;re feeling?
            </h2>
            <p className="mt-1 text-sm text-muted">
              Pick whatever fits best right now. This is just a starting point, not a
              label.
            </p>
          </div>
          <div
            className="grid grid-cols-2 gap-3 sm:grid-cols-4"
            role="group"
            aria-label="Feeling"
          >
            {feelingOptions.map((option) => (
              <CheckInOptionCard
                key={option.value}
                label={option.label}
                selected={feeling === option.value}
                onClick={() => setFeeling(option.value)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Intensity */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-foreground">
              How much is it showing up for you?
            </h2>
            <p className="mt-1 text-sm text-muted">
              There&apos;s no right amount — just what feels true.
            </p>
          </div>
          <div className="space-y-3" role="group" aria-label="Intensity">
            {intensityOptions.map((option) => (
              <CheckInOptionCard
                key={option.value}
                label={option.label}
                description={option.description}
                selected={intensity === option.value}
                onClick={() => setIntensity(option.value)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Duration */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-foreground">
              How long has this been going on?
            </h2>
            <p className="mt-1 text-sm text-muted">
              A rough sense of timing is enough.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2" role="group" aria-label="Duration">
            {durationOptions.map((option) => (
              <CheckInOptionCard
                key={option.value}
                label={option.label}
                selected={duration === option.value}
                onClick={() => setDuration(option.value)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Life areas */}
      {step === 4 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-foreground">
              What areas of life does this touch?
            </h2>
            <p className="mt-1 text-sm text-muted">
              Optional — choose as many as apply, or skip this step.
            </p>
          </div>
          <div
            className="grid grid-cols-2 gap-3 sm:grid-cols-3"
            role="group"
            aria-label="Life areas (select any that apply)"
          >
            {lifeAreaOptions.map((option) => (
              <CheckInOptionCard
                key={option.value}
                label={option.label}
                selected={lifeAreas.includes(option.value)}
                onClick={() => toggleLifeArea(option.value)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 5: Optional reflection */}
      {step === 5 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-foreground">
              Anything you&apos;d like to add?
            </h2>
            <p className="mt-1 text-sm text-muted">
              Optional. Write as much or as little as you want.
            </p>
          </div>
          <Textarea
            aria-label="Additional reflection"
            placeholder="I've been feeling... lately because..."
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            maxLength={MAX_REFLECTION_LENGTH}
            rows={6}
          />
        </div>
      )}

      {/* Step 6: Support preference */}
      {step === 6 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-foreground">
              What kind of support would feel helpful?
            </h2>
            <p className="mt-1 text-sm text-muted">
              Pick one — you can always come back and try something else.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2" role="group" aria-label="Kind of support">
            {supportOptions.map((option) => (
              <CheckInOptionCard
                key={option.value}
                label={option.label}
                description={option.description}
                icon={option.icon}
                selected={support === option.value}
                onClick={() => setSupport(option.value)}
              />
            ))}
          </div>
        </div>
      )}

      {step === TOTAL_STEPS && submitError && (
        <Alert variant="error" title="Something went wrong" className="mt-8">
          {submitError}
        </Alert>
      )}

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between gap-4">
        {step > 1 ? (
          <Button variant="ghost" onClick={handleBack} disabled={isSubmitting}>
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-3">
          {showSkip && (
            <Button variant="ghost" onClick={handleSkip}>
              Skip
            </Button>
          )}

          {step < TOTAL_STEPS ? (
            <Button onClick={goNext} disabled={!canContinue}>
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleFinish} disabled={!support || isSubmitting} loading={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Finish check-in"}
            </Button>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
