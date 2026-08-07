"use client";

import { PageContainer } from "@/components/layout/PageContainer";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CheckInOptionCard } from "@/components/ui/CheckInOptionCard";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { Textarea } from "@/components/ui/FormField";
import { ProgressIndicator } from "@/components/ui/ProgressIndicator";
import { MessageEditor } from "@/components/message-builder/MessageEditor";
import { loadCheckIn } from "@/lib/localStorage";
import {
  buildSayItMessage,
  desiredOutcomeOptions,
  describeSituation,
  durationOptions,
  feelingOptions,
  intensityOptions,
  recipientOptions,
  toneOptions,
} from "@/data/mockSupportResponses";
import type {
  CheckInResponses,
  DesiredOutcome,
  Feeling,
  MessageTone,
  RecipientType,
} from "@/types/checkIn";
import { findLabel } from "@/lib/utils";
import { useClientValue } from "@/lib/useClientValue";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TOTAL_STEPS = 6;

const stepLabels = ["Recipient", "Feeling", "Outcome", "Tone", "Details", "Message"];

export function SayItFlow() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const checkIn = useClientValue<CheckInResponses | null | undefined>(loadCheckIn, undefined);

  const [recipient, setRecipient] = useState<RecipientType | null>(null);
  const [manualFeeling, setManualFeeling] = useState<Feeling | null>(null);
  const feeling = manualFeeling ?? checkIn?.feeling ?? null;
  const [desiredOutcome, setDesiredOutcome] = useState<DesiredOutcome | null>(null);
  const [tone, setTone] = useState<MessageTone | null>(null);
  const [detail, setDetail] = useState("");
  const [draft, setDraft] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationNotice, setGenerationNotice] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState(false);

  const goNext = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSkipDetail = () => {
    setDetail("");
    handleGenerate("");
  };

  const handleGenerate = async (detailOverride?: string) => {
    if (!recipient || !feeling || !desiredOutcome || !tone || isGenerating) return;

    const optionalContext = detailOverride ?? detail;
    const situation = describeSituation(feeling);
    const desiredOutcomeLabel =
      findLabel(desiredOutcomeOptions, desiredOutcome) ?? "Not sure yet";

    setIsGenerating(true);
    setGenerationNotice(null);
    setIsFallback(false);

    try {
      const response = await fetch("/api/generate-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientType: recipient,
          situation,
          desiredOutcome: desiredOutcomeLabel,
          tone,
          optionalContext,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data: unknown = await response.json();

      if (
        typeof data === "object" &&
        data !== null &&
        "crisis" in data &&
        (data as { crisis?: unknown }).crisis === true
      ) {
        router.push("/crisis");
        return;
      }

      if (
        typeof data === "object" &&
        data !== null &&
        "message" in data &&
        typeof (data as { message?: unknown }).message === "string"
      ) {
        setDraft((data as { message: string }).message);
        goNext();
      } else {
        throw new Error("Unexpected response shape.");
      }
    } catch {
      // Safe fallback — the user still gets a usable starting point even if
      // the AI request failed. They can retry from the preview step.
      setDraft(buildSayItMessage({ recipient, feeling, tone, detail: optionalContext }));
      setIsFallback(true);
      setGenerationNotice(
        "We couldn't reach our AI assistant, so here's a general starting point instead. You can try again below."
      );
      goNext();
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStartOver = () => {
    setStep(1);
    setRecipient(null);
    setManualFeeling(null);
    setDesiredOutcome(null);
    setTone(null);
    setDetail("");
    setDraft("");
    setGenerationNotice(null);
    setIsFallback(false);
  };

  const canContinue =
    (step === 1 && recipient !== null) ||
    (step === 2 && feeling !== null) ||
    (step === 3 && desiredOutcome !== null) ||
    (step === 4 && tone !== null) ||
    (step === 5 && detail.trim().length > 0);

  const checkInLabel = checkIn ? findLabel(feelingOptions, checkIn.feeling) : null;
  const checkInIntensityLabel = checkIn
    ? findLabel(intensityOptions, checkIn.intensity)
    : null;
  const checkInDurationLabel = checkIn
    ? findLabel(durationOptions, checkIn.duration)
    : null;

  return (
    <PageContainer narrow>
      <div className="mb-8">
        <Link
          href="/support"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
          Help Me Say It
        </h1>
        <p className="mt-2 text-muted">
          Not knowing how to start the conversation is one of the biggest
          barriers to getting support. Let&apos;s draft a starting point together.
        </p>
      </div>

      <ProgressIndicator
        currentStep={step}
        totalSteps={TOTAL_STEPS}
        labels={stepLabels}
        className="mb-8"
      />

      <Disclaimer className="mb-8" />

      {/* Step 1: Recipient */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-foreground">
              Who do you want to talk to?
            </h2>
            <p className="mt-1 text-sm text-muted">
              We&apos;ll shape the message to fit that relationship.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2" role="group" aria-label="Recipient">
            {recipientOptions.map((option) => (
              <CheckInOptionCard
                key={option.value}
                label={option.label}
                icon={option.icon}
                selected={recipient === option.value}
                onClick={() => setRecipient(option.value)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Feeling */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-foreground">
              What&apos;s closest to how you&apos;re feeling?
            </h2>
            <p className="mt-1 text-sm text-muted">
              This just shapes the wording — change it any time.
            </p>
          </div>

          {checkIn && checkInLabel && (
            <Card padding="sm" className="bg-sage-100/60">
              <p className="text-sm text-foreground">
                We found a recent check-in and filled this in for you:{" "}
                <span className="font-medium">{checkInLabel}</span>
                {checkInIntensityLabel && `, ${checkInIntensityLabel.toLowerCase()}`}
                {checkInDurationLabel && `, ${checkInDurationLabel.toLowerCase()}`}.
                Pick a different feeling below if it no longer fits.
              </p>
            </Card>
          )}

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
                onClick={() => setManualFeeling(option.value)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Desired outcome */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-foreground">
              What are you hoping happens?
            </h2>
            <p className="mt-1 text-sm text-muted">
              This helps shape what the message actually asks for.
            </p>
          </div>
          <div className="space-y-3" role="group" aria-label="Desired outcome">
            {desiredOutcomeOptions.map((option) => (
              <CheckInOptionCard
                key={option.value}
                label={option.label}
                description={option.description}
                selected={desiredOutcome === option.value}
                onClick={() => setDesiredOutcome(option.value)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Tone */}
      {step === 4 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-foreground">
              What tone feels right?
            </h2>
            <p className="mt-1 text-sm text-muted">
              Pick whatever feels most like you.
            </p>
          </div>
          <div className="space-y-3" role="group" aria-label="Tone">
            {toneOptions.map((option) => (
              <CheckInOptionCard
                key={option.value}
                label={option.label}
                description={option.description}
                selected={tone === option.value}
                onClick={() => setTone(option.value)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 5: Optional detail */}
      {step === 5 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-foreground">
              Anything specific you want to mention?
            </h2>
            <p className="mt-1 text-sm text-muted">
              Optional. A sentence or two is plenty — this gets folded into the
              message.
            </p>
          </div>
          <Textarea
            aria-label="Specific details to include"
            placeholder="It's mainly about..."
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            maxLength={600}
            rows={4}
          />
        </div>
      )}

      {/* Step 6: Preview */}
      {step === 6 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-foreground">
              Here&apos;s a starting point
            </h2>
            <p className="mt-1 text-sm text-muted">
              Edit it so it sounds like you, then copy it or send it your way.
            </p>
          </div>

          {generationNotice && (
            <Alert variant="warning" title="Using a general starting point">
              {generationNotice}
            </Alert>
          )}

          <MessageEditor value={draft} onChange={setDraft} label="Generated message" />

          <div className="flex flex-wrap gap-3">
            {isFallback && (
              <Button
                variant="outline"
                onClick={() => handleGenerate()}
                loading={isGenerating}
                disabled={isGenerating}
              >
                <RotateCcw className="h-4 w-4" />
                Try again with AI
              </Button>
            )}
            <Button variant="outline" href="/resources">
              View nearby resources
            </Button>
            <Button variant="ghost" onClick={handleBack} disabled={isGenerating}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button variant="ghost" onClick={handleStartOver} disabled={isGenerating}>
              Start over
            </Button>
          </div>
        </div>
      )}

      {/* Navigation */}
      {step < TOTAL_STEPS && (
        <div className="mt-10 flex items-center justify-between gap-4">
          {step > 1 ? (
            <Button variant="ghost" onClick={handleBack} disabled={isGenerating}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-3">
            {step === 5 && (
              <Button
                variant="ghost"
                onClick={handleSkipDetail}
                disabled={isGenerating}
              >
                Skip
              </Button>
            )}

            {step === 5 ? (
              <Button
                onClick={() => handleGenerate()}
                disabled={!canContinue || isGenerating}
                loading={isGenerating}
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={goNext} disabled={!canContinue}>
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}
    </PageContainer>
  );
}
