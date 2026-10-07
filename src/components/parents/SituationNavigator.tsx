"use client";

import { CheckInOptionCard } from "@/components/ui/CheckInOptionCard";
import type { ParentSituation } from "@/types/parentSupport";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface SituationNavigatorProps {
  situations: ParentSituation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

/**
 * "What best describes where you are right now?" selector. Reuses
 * CheckInOptionCard (the same selectable-card pattern from the check-in
 * flow) rather than a new component, to keep the visual language identical.
 * Collapses to a one-line summary once a situation is selected, so the page
 * doesn't stack a full card grid above the guidance content below it —
 * click the summary to change the selection.
 */
export function SituationNavigator({ situations, selectedId, onSelect }: SituationNavigatorProps) {
  return (
    <section aria-labelledby="situation-navigator-heading" className="mb-10">
      <h2 id="situation-navigator-heading" className="text-xl font-semibold text-foreground">
        What best describes where you are right now?
      </h2>
      <p className="mt-1 mb-4 text-sm text-muted">
        Choosing an option helps surface more relevant next steps and resources — it isn&apos;t a
        diagnosis or an assessment of your child.
      </p>

      {/* Keyed by selectedId so the "expanded" state below resets automatically
          whenever the selection changes to something new — the standard React
          way to reset local state from a prop change, no effect required. */}
      <SituationNavigatorBody
        key={selectedId ?? "none"}
        situations={situations}
        selectedId={selectedId}
        onSelect={onSelect}
      />
    </section>
  );
}

function SituationNavigatorBody({ situations, selectedId, onSelect }: SituationNavigatorProps) {
  const [expanded, setExpanded] = useState(selectedId === null);
  const selected = situations.find((s) => s.id === selectedId) ?? null;

  if (expanded) {
    return (
      <div className="grid gap-3 sm:grid-cols-2" role="group" aria-label="Situation">
        {situations.map((situation) => (
          <CheckInOptionCard
            key={situation.id}
            label={situation.label}
            description={situation.description}
            selected={selectedId === situation.id}
            onClick={() => onSelect(situation.id)}
          />
        ))}
      </div>
    );
  }

  if (!selected) return null;

  return (
    <button
      type="button"
      onClick={() => setExpanded(true)}
      className="flex w-full items-center justify-between rounded-xl border-2 border-primary bg-primary/5 p-4 text-left transition-colors hover:bg-primary/10"
    >
      <span className="text-sm font-medium text-primary">{selected.label}</span>
      <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
        Change
        <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
    </button>
  );
}
