import { panelGutterX, panelRadius } from "@/components/layout/surface";
import { cn } from "@/lib/utils";
import { Phone } from "lucide-react";
import Link from "next/link";

/** Slim crisis strip that sits on the slate frame above the page header. */
export function CrisisBanner() {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between gap-3 border border-white/10 bg-white/[0.06] py-3 text-white sm:flex-row",
        panelRadius,
        panelGutterX
      )}
    >
      <p className="text-center text-[14px] leading-relaxed text-white/90 sm:text-left">
        <Link href="/crisis" className="font-semibold text-white underline underline-offset-4">
          In immediate danger or crisis?
        </Link>{" "}
        You deserve real-time support from trained professionals.
      </p>
      <a
        href="tel:988"
        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink transition-opacity hover:opacity-90"
      >
        <Phone className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
        Call or text 988
      </a>
    </div>
  );
}
