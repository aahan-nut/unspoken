import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  loading?: boolean;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
  secondary: "bg-secondary text-secondary-foreground hover:bg-sky-200",
  ghost: "bg-transparent text-foreground hover:bg-ink/5",
  outline: "border border-ink/25 bg-transparent text-foreground hover:bg-ink/5",
  destructive: "bg-destructive text-white hover:bg-red-700",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[12px] gap-1.5",
  md: "h-11 px-6 text-[13px] gap-2",
  lg: "h-[52px] px-7 text-[14px] gap-2.5",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  loading,
  disabled,
  className,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const classes = cn(
    // Pill buttons with tracked uppercase labels, from the Unspoken Hero design.
    "inline-flex items-center justify-center rounded-full font-semibold uppercase tracking-[0.08em] transition-colors duration-200",
    "disabled:opacity-50 disabled:pointer-events-none",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick as unknown as MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled || loading} onClick={onClick} {...props}>
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}
