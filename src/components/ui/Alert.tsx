import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";

type AlertVariant = "info" | "success" | "warning" | "error";

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  className?: string;
}

const variantConfig: Record<
  AlertVariant,
  { icon: typeof Info; styles: string }
> = {
  info: {
    icon: Info,
    styles: "border-sage-200 bg-sage-100 text-sage-800",
  },
  success: {
    icon: CheckCircle2,
    styles: "border-sage-400/40 bg-sage-100 text-sage-800",
  },
  warning: {
    icon: TriangleAlert,
    styles: "border-amber-200 bg-amber-50 text-amber-900",
  },
  error: {
    icon: AlertCircle,
    styles: "border-red-200 bg-red-50 text-red-900",
  },
};

export function Alert({
  variant = "info",
  title,
  children,
  className,
}: AlertProps) {
  const { icon: Icon, styles } = variantConfig[variant];

  return (
    <div
      role="alert"
      className={cn(
        "flex gap-3 rounded-xl border p-4 text-sm",
        styles,
        className
      )}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div className="space-y-1">
        {title && <p className="font-medium">{title}</p>}
        <div className="leading-relaxed opacity-90">{children}</div>
      </div>
    </div>
  );
}
