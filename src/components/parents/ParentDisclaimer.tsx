import { Alert } from "@/components/ui/Alert";

interface ParentDisclaimerProps {
  className?: string;
}

/** Non-diagnostic disclaimer specific to the Parent Support section — distinct wording from the teen-facing Disclaimer component. */
export function ParentDisclaimer({ className }: ParentDisclaimerProps) {
  return (
    <Alert variant="info" title="Educational information, not diagnosis or medical advice" className={className}>
      This section provides general educational information and help finding
      resources. It does not diagnose children, recommend specific medical
      treatment, or replace guidance from a qualified professional. If you
      have concerns about your child&apos;s development or behavior, a
      pediatrician or other qualified professional is the right place to
      start.
    </Alert>
  );
}
