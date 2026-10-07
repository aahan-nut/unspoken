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
        "mx-auto w-full px-5 py-10 sm:px-8 sm:py-14 lg:px-10",
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
      <Heading className="text-balance text-[clamp(24px,2.4vw,34px)] font-semibold uppercase leading-[1.1] text-foreground">
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            "mt-3 max-w-2xl text-pretty text-[17px] leading-[1.6] text-muted",
            centered && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
