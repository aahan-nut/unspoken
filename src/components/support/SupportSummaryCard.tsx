import { Alert } from "@/components/ui/Alert";
import { Card } from "@/components/ui/Card";
import {
  durationOptions,
  feelingOptions,
  intensityOptions,
  lifeAreaOptions,
  supportOptions,
} from "@/data/mockSupportResponses";
import { findLabel } from "@/lib/utils";
import type { CheckInResponses } from "@/types/checkIn";

interface SupportSummaryCardProps {
  responses: CheckInResponses;
}

/** Read-only recap of what the user entered during check-in, shown at the top of the support response page. */
export function SupportSummaryCard({ responses }: SupportSummaryCardProps) {
  const feelingLabel = findLabel(feelingOptions, responses.feeling);
  const intensityLabel = findLabel(intensityOptions, responses.intensity);
  const durationLabel = findLabel(durationOptions, responses.duration);
  const supportLabel = findLabel(supportOptions, responses.support);
  const lifeAreaLabels = responses.lifeAreas
    .map((value) => findLabel(lifeAreaOptions, value))
    .filter((label): label is string => Boolean(label));

  return (
    <Card padding="md" className="mb-6 space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
        What you shared
      </h2>
      <div className="flex flex-wrap gap-2 text-sm">
        {feelingLabel && (
          <span className="rounded-full bg-secondary px-3 py-1 font-medium text-secondary-foreground">
            {feelingLabel}
          </span>
        )}
        {intensityLabel && (
          <span className="rounded-full bg-background px-3 py-1 text-muted">
            {intensityLabel}
          </span>
        )}
        {durationLabel && (
          <span className="rounded-full bg-background px-3 py-1 text-muted">
            {durationLabel}
          </span>
        )}
        {lifeAreaLabels.map((label) => (
          <span key={label} className="rounded-full bg-background px-3 py-1 text-muted">
            {label}
          </span>
        ))}
        {supportLabel && (
          <span className="rounded-full bg-background px-3 py-1 text-muted">
            Looking for: {supportLabel}
          </span>
        )}
      </div>
      {responses.reflection && (
        <Alert variant="info" title="In your words">
          &ldquo;
          {responses.reflection.length > 240
            ? responses.reflection.slice(0, 240) + "..."
            : responses.reflection}
          &rdquo;
        </Alert>
      )}
    </Card>
  );
}
