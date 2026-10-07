import { Card } from "@/components/ui/Card";
import { CheckCircle2 } from "lucide-react";

interface NextStepsListProps {
  steps: string[];
  className?: string;
}

export function NextStepsList({ steps, className }: NextStepsListProps) {
  return (
    <Card padding="md" className={className}>
      <h3 className="mb-4 text-base font-semibold text-foreground">What You Can Do Next</h3>
      <ul className="space-y-3">
        {steps.map((step) => (
          <li key={step} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span>{step}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
