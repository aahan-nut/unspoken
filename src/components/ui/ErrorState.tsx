import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this content. Please try again.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50 px-6 py-16 text-center",
        className
      )}
      role="alert"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">
        <AlertCircle className="h-7 w-7 text-destructive" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-red-900">{title}</h3>
      <p className="mb-6 max-w-sm text-sm leading-relaxed text-red-800/80">
        {message}
      </p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
