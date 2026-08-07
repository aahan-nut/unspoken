"use client";

import { PageContainer } from "@/components/layout/PageContainer";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingState } from "@/components/ui/LoadingState";
import { SupportSummaryCard } from "@/components/support/SupportSummaryCard";
import { clearCheckIn, loadCheckIn } from "@/lib/localStorage";
import { clearSupportResult, loadSupportResult } from "@/lib/sessionState";
import { intensityQualifiers, supportResponses } from "@/data/mockSupportResponses";
import type { CheckInResponses } from "@/types/checkIn";
import { useClientValue } from "@/lib/useClientValue";
import { ArrowLeft, HeartHandshake, MessageSquareText, Phone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function SupportContent() {
  const router = useRouter();
  const responses = useClientValue<CheckInResponses | null | undefined>(
    loadCheckIn,
    undefined
  );
  const supportResult = useClientValue(loadSupportResult, undefined);

  const handleStartOver = () => {
    clearCheckIn();
    clearSupportResult();
    router.push("/check-in");
  };

  if (responses === undefined || supportResult === undefined) {
    return (
      <PageContainer narrow>
        <LoadingState message="Loading your check-in..." />
      </PageContainer>
    );
  }

  if (!responses) {
    return (
      <PageContainer narrow>
        <EmptyState
          icon={HeartHandshake}
          title="No check-in found"
          description="We couldn't find a recent check-in on this device. Start one to see a supportive response here."
          actionLabel="Start a check-in"
          actionHref="/check-in"
        />
      </PageContainer>
    );
  }

  // supportResult (backend-generated) takes priority; falling back to the
  // local mock response covers check-ins made before this backend flow
  // existed, or a sessionStorage cache that didn't survive (new tab, etc).
  const payload = supportResult?.response ?? null;
  const isElevatedDistress = supportResult?.safetyLevel === "elevated_distress";

  const mock = responses.feeling ? supportResponses[responses.feeling] : null;
  const qualifier = responses.intensity
    ? intensityQualifiers[responses.intensity]
    : null;

  const empathyMessage = payload
    ? payload.acknowledgment
    : mock
      ? qualifier
        ? `${mock.empathy} It sounds like this has been showing up ${qualifier}.`
        : mock.empathy
      : "Thanks for taking the time to check in with yourself today.";

  const summaryMessage = payload?.summary ?? null;
  const immediateAction = payload ? payload.immediateAction : (mock?.immediateAction ?? null);
  const nextStep = payload ? payload.nextStep : (mock?.nextStep ?? null);
  const disclaimerLine = payload?.disclaimer ?? null;
  const suggestedDestination = payload?.suggestedDestination ?? null;

  return (
    <PageContainer narrow>
      <div className="mb-8">
        <Link
          href="/check-in"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to check-in
        </Link>
        <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
          Here&apos;s what we heard
        </h1>
        <p className="mt-2 text-muted">
          {payload
            ? "A supportive response based on what you shared."
            : "A mock, non-diagnostic response based on what you shared."}
        </p>
      </div>

      <Alert variant="error" title="In immediate danger or crisis?" className="mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span>You deserve real-time support from trained professionals, right now.</span>
          <Button variant="destructive" size="sm" href="tel:988" className="shrink-0">
            <Phone className="h-4 w-4" />
            Call or text 988
          </Button>
        </div>
      </Alert>

      {isElevatedDistress && (
        <Alert variant="warning" title="Consider reaching out to someone" className="mb-6">
          What you shared sounds like it&apos;s been sticking around. Talking to a trusted
          adult, school counselor, or mental health professional is a good next step.
        </Alert>
      )}

      <Disclaimer className="mb-8" />

      <SupportSummaryCard responses={responses} />

      <Card padding="md" className="mb-6 border-l-4 border-l-sage-400">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted">
          A thought for you
        </h2>
        <p className="text-base leading-relaxed text-foreground">{empathyMessage}</p>
        {summaryMessage && (
          <p className="mt-2 text-sm leading-relaxed text-muted">{summaryMessage}</p>
        )}
      </Card>

      {(immediateAction || nextStep) && (
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          {immediateAction && (
            <Card padding="md">
              <h3 className="mb-2 text-sm font-semibold text-foreground">
                Something to try right now
              </h3>
              <p className="text-sm leading-relaxed text-muted">{immediateAction}</p>
            </Card>
          )}
          {nextStep && (
            <Card padding="md">
              <h3 className="mb-2 text-sm font-semibold text-foreground">
                A possible next step
              </h3>
              <p className="text-sm leading-relaxed text-muted">{nextStep}</p>
            </Card>
          )}
        </div>
      )}

      {disclaimerLine && (
        <p className="mb-6 text-xs text-muted/80">{disclaimerLine}</p>
      )}

      <div className="flex flex-wrap gap-3">
        <Button
          href="/help-me-say-it"
          variant={suggestedDestination === "resources" ? "outline" : "primary"}
        >
          <MessageSquareText className="h-4 w-4" />
          Help Me Say It
        </Button>
        <Button
          href="/resources"
          variant={suggestedDestination === "resources" ? "primary" : "outline"}
        >
          View nearby resources
        </Button>
        <Button variant="ghost" onClick={handleStartOver}>
          Start another check-in
        </Button>
      </div>
    </PageContainer>
  );
}
