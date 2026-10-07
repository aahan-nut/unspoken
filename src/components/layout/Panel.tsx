import { panelGutterX, panelRadius } from "@/components/layout/surface";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Tone = "mist" | "ink" | "hero";

const toneClasses: Record<Tone, string> = {
  mist: "mist-glow text-ink",
  ink: "bg-ink text-white",
  hero: "hero-gradient hero-shadow text-white",
};

interface PanelProps extends ComponentProps<"section"> {
  tone: Tone;
}

/** A rounded content panel that sits on the slate frame. */
export function Panel({ tone, className, children, ...props }: PanelProps) {
  return (
    <section
      className={cn(
        "py-[clamp(56px,7vw,112px)]",
        panelRadius,
        panelGutterX,
        toneClasses[tone],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

interface SectionIntroProps {
  eyebrow: string;
  title: string;
  description: ReactNode;
  /** Panels with white text (ink, hero) use `light`. */
  light?: boolean;
  centered?: boolean;
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  light = false,
  centered = false,
}: SectionIntroProps) {
  return (
    <div className={cn("max-w-[640px]", centered && "mx-auto text-center")}>
      <p
        className={cn(
          "text-[14px] uppercase tracking-[0.1em]",
          light ? "text-white/85" : "text-ink-muted"
        )}
      >
        {eyebrow}
      </p>
      <h2 className="mt-4 text-balance text-[clamp(28px,3vw,42px)] font-semibold uppercase leading-[1.1]">
        {title}
      </h2>
      <p
        className={cn(
          "mt-4 text-pretty text-[17px] leading-[1.6]",
          light ? "text-white/85" : "text-ink-muted"
        )}
      >
        {description}
      </p>
    </div>
  );
}

export interface PageIntroProps {
  title: string;
  eyebrow?: string;
  description?: ReactNode;
  back?: { href: string; label: string };
}

/** Page title block inside AppShell's gradient header card — a compact echo of the home hero. */
export function PageIntro({ title, eyebrow, description, back }: PageIntroProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-5 pb-[clamp(40px,5vw,72px)] pt-[clamp(36px,5vw,72px)] text-center",
        panelGutterX
      )}
    >
      {back && (
        <Link
          href={back.href}
          className="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.08em] transition-opacity hover:opacity-75"
        >
          <ArrowLeft className="h-4 w-4 flex-none" strokeWidth={1.6} aria-hidden="true" />
          {back.label}
        </Link>
      )}
      {eyebrow && <p className="text-[15px] uppercase tracking-[0.1em]">{eyebrow}</p>}
      <h1 className="max-w-[820px] text-balance text-[clamp(30px,3.6vw,52px)] font-semibold uppercase leading-[1.08] tracking-[0.005em]">
        {title}
      </h1>
      {description && (
        <p className="max-w-[560px] text-pretty text-[18px] leading-[1.55]">{description}</p>
      )}
    </div>
  );
}

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 whitespace-nowrap text-[14px] font-semibold uppercase tracking-[0.08em] transition-opacity hover:opacity-70"
    >
      {children}
      <ArrowRight className="h-4 w-4 flex-none" strokeWidth={1.8} aria-hidden="true" />
    </Link>
  );
}
