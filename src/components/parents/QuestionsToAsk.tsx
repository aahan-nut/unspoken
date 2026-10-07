import { Card } from "@/components/ui/Card";
import { MessageCircleQuestion } from "lucide-react";

interface QuestionsToAskProps {
  questions: string[];
  className?: string;
}

/** Static, curated question prompts — not AI-generated (see project instructions for this section). */
export function QuestionsToAsk({ questions, className }: QuestionsToAskProps) {
  return (
    <Card padding="md" className={className}>
      <h3 className="mb-1 text-base font-semibold text-foreground">Questions You May Want to Ask</h3>
      <p className="mb-4 text-sm text-muted">
        A starting point for conversations with a pediatrician, school counselor, teacher, or specialist.
      </p>
      <ul className="space-y-3">
        {questions.map((question) => (
          <li key={question} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground">
            <MessageCircleQuestion className="mt-0.5 h-4 w-4 shrink-0 text-secondary-foreground" aria-hidden="true" />
            <span>{question}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
