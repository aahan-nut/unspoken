import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}

export function PageContainer({
  children,
  className,
  narrow = false,
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8",
        narrow ? "max-w-3xl" : "max-w-6xl",
        className
      )}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  title,
  description,
  centered = false,
  className,
  level = "h2",
}: {
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
  /** Use "h1" when this is a page's single top-level heading, not a subsection. */
  level?: "h1" | "h2";
}) {
  const Heading = level;

  return (
    <div
      className={cn(
        "mb-10",
        centered && "text-center",
        className
      )}
    >
      <Heading className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            "mt-3 max-w-2xl text-muted leading-relaxed",
            centered && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
