"use client";

import { PageContainer } from "@/components/layout/PageContainer";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { FieldWrapper, Textarea } from "@/components/ui/FormField";
import { ProgressIndicator } from "@/components/ui/ProgressIndicator";
import { checkInGuidance, moodOptions } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  MessageSquare,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const stepLabels = ["How you feel", "What's on your mind", "Guidance", "Next steps"];

type NextStep = "journal" | "reach-out" | "resources" | "rest";

export function CheckInFlow() {
  const [step, setStep] = useState(1);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [thoughts, setThoughts] = useState("");
  const [selectedNextStep, setSelectedNextStep] = useState<NextStep | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const guidance = selectedMood ? checkInGuidance[selectedMood] ?? checkInGuidance.unsure : [];

  const handleNext = () => {
    if (step === 2) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep(3);
      }, 1200);
      return;
    }
    setStep((s) => Math.min(s + 1, 4));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const canProceed =
    (step === 1 && selectedMood) ||
    (step === 2 && thoughts.trim().length > 0) ||
    step === 3 ||
    (step === 4 && selectedNextStep);

  const nextStepOptions: {
    value: NextStep;
    label: string;
    description: string;
    icon: typeof BookOpen;
  }[] = [
    {
      value: "journal",
      label: "Write it out",
      description: "Spend a few more minutes journaling your thoughts privately.",
      icon: BookOpen,
    },
    {
      value: "reach-out",
      label: "Prepare to reach out",
      description: "Practice what you might say to someone you trust.",
      icon: MessageSquare,
    },
    {
      value: "resources",
      label: "Find a resource",
      description: "Browse support options that match what you're going through.",
      icon: Users,
    },
    {
      value: "rest",
      label: "Just rest for now",
      description: "That's okay too. Checking in was enough for today.",
      icon: Sparkles,
    },
  ];

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
        totalSteps={4}
        labels={stepLabels}
        className="mb-8"
      />

      <Disclaimer className="mb-8" />

      {/* Step 1: Mood selection */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-foreground">
              How are you feeling right now?
            </h2>
            <p className="mt-1 text-sm text-muted">
              Choose the option that feels closest — or pick &ldquo;Not sure&rdquo; if
              nothing fits perfectly.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {moodOptions.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={cn(
                  "rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all duration-200",
                  selectedMood === mood.value
                    ? "border-primary bg-primary/5 text-primary shadow-sm"
                    : "border-border bg-card text-foreground hover:border-primary/30"
                )}
              >
                {mood.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Thoughts */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-foreground">
              What&apos;s on your mind?
            </h2>
            <p className="mt-1 text-sm text-muted">
              Write as much or as little as you want. This stays on your device.
            </p>
          </div>
          <FieldWrapper
            label="Your thoughts"
            htmlFor="thoughts"
            hint="Only you can see this. Be honest with yourself."
          >
            <Textarea
              id="thoughts"
              placeholder="I've been feeling... lately because..."
              value={thoughts}
              onChange={(e) => setThoughts(e.target.value)}
              rows={6}
            />
          </FieldWrapper>
        </div>
      )}

      {/* Step 3: Guidance */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-foreground">
              Some thoughts for you
            </h2>
            <p className="mt-1 text-sm text-muted">
              This is supportive guidance, not a diagnosis or medical advice.
            </p>
          </div>
          <div className="space-y-4">
            {guidance.map((text, i) => (
              <Card key={i} padding="md" className="border-l-4 border-l-sage-400">
                <p className="text-sm leading-relaxed text-foreground">{text}</p>
              </Card>
            ))}
          </div>
          {thoughts && (
            <Alert variant="info" title="You shared">
              &ldquo;{thoughts.length > 200 ? thoughts.slice(0, 200) + "..." : thoughts}&rdquo;
            </Alert>
          )}
        </div>
      )}

      {/* Step 4: Next steps */}
      {step === 4 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-foreground">
              What feels like a manageable next step?
            </h2>
            <p className="mt-1 text-sm text-muted">
              Pick one — you can always come back and try something else.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {nextStepOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedNextStep(option.value)}
                className={cn(
                  "flex items-start gap-4 rounded-xl border-2 p-4 text-left transition-all duration-200",
                  selectedNextStep === option.value
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border bg-card hover:border-primary/30"
                )}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                  <option.icon className="h-5 w-5 text-secondary-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{option.label}</p>
                  <p className="mt-0.5 text-sm text-muted">{option.description}</p>
                </div>
              </button>
            ))}
          </div>

          {selectedNextStep === "reach-out" && (
            <Card padding="md" className="bg-sage-100/60">
              <h3 className="mb-2 font-medium text-foreground">
                Reach-out starter
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                &ldquo;Hey, I&apos;ve been going through something and could use someone
                to talk to. I&apos;m not looking for advice — just someone to listen.
                Do you have a few minutes?&rdquo;
              </p>
            </Card>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between gap-4">
        {step > 1 ? (
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        ) : (
          <div />
        )}

        {step < 4 ? (
          <Button
            onClick={handleNext}
            disabled={!canProceed || isLoading}
            loading={isLoading}
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            href={
              selectedNextStep === "resources"
                ? "/resources"
                : selectedNextStep === "reach-out"
                  ? "/how-it-works#reach-out"
                  : "/"
            }
            disabled={!selectedNextStep}
          >
            Finish check-in
          </Button>
        )}
      </div>
    </PageContainer>
  );
}
