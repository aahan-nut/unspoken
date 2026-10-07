import { HomeHero } from "@/components/home/HomeHero";
import { Footer } from "@/components/layout/Footer";
import { ArrowLink, Panel, SectionIntro } from "@/components/layout/Panel";
import { pillBase, pillClasses } from "@/components/layout/surface";
import { DisclaimerText } from "@/components/ui/Disclaimer";
import { features, howItWorksSteps, privacyPoints } from "@/data/siteContent";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import { ArrowRight, Info } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // The hero carries its own header and crisis links, so the home page skips
  // AppShell's navbar and crisis banner and lays everything on the slate frame.
  return (
    <>
      <main className="flex flex-1 flex-col gap-(--frame-gap) bg-frame p-(--frame-gap)">
        <HomeHero user={user ? { email: user.email ?? "" } : null} />

        {/* How it works */}
        <Panel tone="mist" id="how-it-works" className="scroll-mt-(--frame-gap)">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionIntro
              eyebrow="Three steps"
              title="How Unspoken works"
              description="Three simple steps to help you understand what you're feeling and decide what to do next."
            />
            <ArrowLink href="/how-it-works">Learn more</ArrowLink>
          </div>
          <ol className="mt-[clamp(40px,5vw,72px)] grid gap-10 md:grid-cols-3 md:gap-[clamp(24px,3vw,48px)]">
            {howItWorksSteps.map((step) => (
              <li key={step.step} className="border-t border-ink/20 pt-6">
                <span className="text-[15px] font-medium tracking-[0.08em] text-ink-muted">
                  {String(step.step).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-[21px] font-semibold leading-snug">
                  {step.title}
                </h3>
                <p className="mt-3 text-[16px] leading-[1.6] text-ink-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Panel>

        {/* Features */}
        <Panel tone="mist">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionIntro
              eyebrow="What you can do here"
              title="Support that meets you where you are"
              description="Tools designed for reflection, not diagnosis — helping you take the next step that feels right."
            />
            <ArrowLink href="/help-me-say-it">Try Help Me Say It</ArrowLink>
          </div>
          <div className="mt-[clamp(40px,5vw,72px)] grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-[20px] bg-white/75 p-7 ring-1 ring-ink/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/20">
                  <feature.icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-[19px] font-semibold leading-snug">
                  {feature.title}
                </h3>
                <p className="mt-2.5 text-[15.5px] leading-[1.6] text-ink-muted">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Panel>

        {/* Privacy + disclaimer */}
        <Panel tone="ink">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-[clamp(48px,6vw,112px)]">
            <div>
              <SectionIntro
                light
                eyebrow="Privacy"
                title="Your privacy matters"
                description="Use Unspoken on your terms — no account required, and you're always in control of what you share."
              />
              <Link
                href="/privacy"
                className={cn(pillBase, pillClasses.outlineLight, "mt-8")}
              >
                Read our privacy approach
              </Link>
            </div>
            <ul className="divide-y divide-white/15">
              {privacyPoints.map((point) => (
                <li key={point.title} className="flex gap-5 py-6 first:pt-0 last:pb-0">
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-white/30">
                    <point.icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-[19px] font-semibold leading-snug">
                      {point.title}
                    </h3>
                    <p className="mt-2 text-[16px] leading-[1.6] text-white/80">
                      {point.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-[clamp(48px,6vw,80px)] flex gap-4 rounded-[20px] border border-white/15 bg-white/[0.05] p-6">
            <Info className="mt-0.5 h-5 w-5 flex-none" strokeWidth={1.6} aria-hidden="true" />
            <div>
              <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-white/80">
                Important to know
              </p>
              <p className="mt-2 text-[15px] leading-[1.6] text-white/90">
                <DisclaimerText />
              </p>
            </div>
          </div>
        </Panel>

        {/* Closing call to action — reprises the hero gradient */}
        <Panel tone="hero" className="py-[clamp(72px,9vw,140px)]">
          <SectionIntro
            light
            centered
            eyebrow="No pressure"
            title="Ready when you are"
            description="There's no wrong way to start. Take a moment for yourself — whenever it feels right."
          />
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/check-in" className={cn(pillBase, pillClasses.solidLight)}>
              Start a check-in
              <ArrowRight className="h-4 w-4 flex-none" strokeWidth={1.8} aria-hidden="true" />
            </Link>
            <Link href="/resources" className={cn(pillBase, pillClasses.outlineLight)}>
              Browse resources
            </Link>
          </div>
        </Panel>
      </main>
      <Footer />
    </>
  );
}
