import { cn } from "@/lib/utils";
import { Check, type LucideIcon } from "lucide-react";

interface CheckInOptionCardProps {
  label: string;
  description?: string;
  icon?: LucideIcon;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

/**
 * Shared selectable option button used across the check-in and message-builder
 * flows (feeling, intensity, duration, life areas, support type, recipient,
 * tone). Selection is marked with a checkmark, not color alone, so it reads
 * without relying on color perception.
 */
export function CheckInOptionCard({
  label,
  description,
  icon: Icon,
  selected,
  onClick,
  className,
}: CheckInOptionCardProps) {
  const roomy = Boolean(description) || Boolean(Icon);

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl border-2 text-left transition-all duration-200",
        roomy ? "items-start p-4" : "px-4 py-3",
        selected
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border bg-card hover:border-primary/30",
        className
      )}
    >
      {Icon && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
          <Icon className="h-5 w-5 text-secondary-foreground" aria-hidden="true" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "font-medium",
            selected ? "text-primary" : "text-foreground",
            !roomy && "text-sm"
          )}
        >
          {label}
        </p>
        {description && <p className="mt-0.5 text-sm text-muted">{description}</p>}
      </div>
      {selected && (
        <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
      )}
    </button>
  );
}
