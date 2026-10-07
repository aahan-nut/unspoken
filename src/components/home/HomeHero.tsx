import { SiteHeader, type SiteUser } from "@/components/layout/SiteHeader";
import {
  panelGutterX,
  panelRadius,
  pillBase,
  pillClasses,
} from "@/components/layout/surface";
import { cn } from "@/lib/utils";
import { ArrowRight, Lock, Search, Smile } from "lucide-react";
import Link from "next/link";

const linkBase =
  "uppercase tracking-[0.08em] text-[15px] text-white transition-opacity hover:opacity-75";

interface HomeHeroProps {
  user: SiteUser | null;
}

export function HomeHero({ user }: HomeHeroProps) {
  return (
    <div
      className={cn(
        "hero-gradient hero-shadow relative grid min-h-[max(560px,calc(100svh-2*var(--frame-gap)))] grid-rows-[auto_1fr_auto] text-white shadow-[0_0_40px_rgba(170,200,215,0.25)]",
        panelRadius
      )}
    >
      <SiteHeader user={user} />

      <div
        className={cn(
          "grid grid-cols-1 content-center items-center justify-items-center gap-6 py-8 lg:grid-cols-[repeat(3,auto)] lg:justify-between lg:justify-items-stretch",
          panelGutterX
        )}
      >
        <Link
          href="/check-in"
          className={cn("flex items-center gap-2 whitespace-nowrap lg:justify-self-start", linkBase)}
        >
          <Smile className="h-4 w-4 flex-none" strokeWidth={1.6} aria-hidden="true" />
          Check in
        </Link>

        <div className="order-first flex max-w-[640px] flex-col items-center gap-[22px] text-center lg:order-none">
          <p className="text-[15px] uppercase tracking-[0.1em]">
            Private support, no account needed
          </p>
          <h1 className="text-balance text-[clamp(30px,3.6vw,52px)] font-semibold uppercase leading-[1.08] tracking-[0.005em]">
            Find the words when it&rsquo;s hard to speak
          </h1>
          <p className="max-w-[480px] text-pretty text-[18px] leading-[1.55]">
            Understand how you feel, get support in the moment, and find the
            words to reach someone you trust.
          </p>
          <Link href="/check-in" className={cn(pillBase, pillClasses.solidLight, "mt-1.5")}>
            Start a check-in
            <ArrowRight className="h-4 w-4 flex-none" strokeWidth={1.8} aria-hidden="true" />
          </Link>
        </div>

        <Link
          href="/resources"
          className={cn("flex items-center gap-2 whitespace-nowrap lg:justify-self-end", linkBase)}
        >
          Find support
          <Search className="h-4 w-4 flex-none" strokeWidth={1.6} aria-hidden="true" />
        </Link>
      </div>

      <div
        className={cn(
          "flex flex-wrap items-end justify-between gap-5 pb-[clamp(24px,3vw,40px)] text-[13px] uppercase tracking-[0.06em]",
          panelGutterX
        )}
      >
        <Link
          href="/privacy"
          className="flex items-center gap-2 transition-opacity hover:opacity-75"
        >
          <Lock className="h-3.5 w-3.5 flex-none" strokeWidth={1.6} aria-hidden="true" />
          Stays on your device
        </Link>
        <a
          href="#how-it-works"
          aria-label="Scroll to how Unspoken works"
          className="hidden transition-opacity hover:opacity-75 sm:block"
        >
          <svg
            className="flex-none"
            width="14"
            height="72"
            viewBox="0 0 14 72"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M7 0v70M1 63l6 7 6-7" />
          </svg>
        </a>
        <a href="tel:988" className="transition-opacity hover:opacity-75">
          In crisis? Call or text 988
        </a>
      </div>
    </div>
  );
}
