import { ParentDisclaimer } from "@/components/parents/ParentDisclaimer";
import type { ConditionConfig } from "@/types/parentSupport";

interface ConditionOverviewProps {
  config: ConditionConfig;
}

export function ConditionOverview({ config }: ConditionOverviewProps) {
  return (
    <section aria-labelledby="condition-overview-heading" className="mb-10">
      <h2 id="condition-overview-heading" className="mb-4 text-xl font-semibold text-foreground">
        Overview
      </h2>
      <div className="mb-6 space-y-4">
        {config.overviewParagraphs.map((paragraph) => (
          <p key={paragraph} className="text-base leading-relaxed text-muted">
            {paragraph}
          </p>
        ))}
      </div>
      <ParentDisclaimer />
    </section>
  );
}
