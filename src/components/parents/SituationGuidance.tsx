import { NextStepsList } from "@/components/parents/NextStepsList";
import { QuestionsToAsk } from "@/components/parents/QuestionsToAsk";
import { ParentResourceGrid } from "@/components/parents/ParentResourceGrid";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import type { ParentResource, ParentSituation, SituationGuidanceContent } from "@/types/parentSupport";
import { Sparkles } from "lucide-react";

interface SituationGuidanceProps {
  situation: ParentSituation;
  guidance: SituationGuidanceContent;
  resources: ParentResource[];
  isSaved: (resourceId: string) => boolean;
  savingId: string | null;
  onToggleSave: (resource: ParentResource) => void;
}

export function SituationGuidance({
  situation,
  guidance,
  resources,
  isSaved,
  savingId,
  onToggleSave,
}: SituationGuidanceProps) {
  return (
    <section aria-labelledby="situation-guidance-heading" className="mb-10 space-y-6">
      <div>
        <p className="text-sm font-medium text-muted">For your situation:</p>
        <h2 id="situation-guidance-heading" className="text-xl font-semibold text-foreground">
          {situation.label}
        </h2>
      </div>

      <Card padding="md" className="border-l-4 border-l-sky-400">
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted">Understand</h3>
        <p className="text-base leading-relaxed text-foreground">{guidance.understand}</p>
      </Card>

      <div className="grid gap-6 sm:grid-cols-2">
        <NextStepsList steps={guidance.nextSteps} />
        <QuestionsToAsk questions={guidance.questions} />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">Relevant Resources</h3>
        {resources.length === 0 ? (
          <EmptyState
            icon={Sparkles}
            title="No matching resources yet"
            description="Browse the full resource list below instead."
          />
        ) : (
          <ParentResourceGrid
            resources={resources}
            isSaved={isSaved}
            savingId={savingId}
            onToggleSave={onToggleSave}
          />
        )}
      </div>
    </section>
  );
}
