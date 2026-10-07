import { CrisisBanner } from "@/components/ui/CrisisBanner";
import { Footer } from "@/components/layout/Footer";
import { PageIntro, type PageIntroProps } from "@/components/layout/Panel";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { panelRadius } from "@/components/layout/surface";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface AppShellProps {
  children: ReactNode;
  showCrisisBanner?: boolean;
  /** Page title shown in the gradient header card. Omit for a compact header (e.g. multi-step flows). */
  intro?: PageIntroProps;
}

/**
 * Inner-page layout from the Unspoken Hero design: a gradient header card and a
 * mist content panel stacked on the slate frame.
 */
export async function AppShell({
  children,
  showCrisisBanner = true,
  intro,
}: AppShellProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <div className="flex flex-1 flex-col gap-(--frame-gap) p-(--frame-gap)">
        {showCrisisBanner && <CrisisBanner />}
        <div
          className={cn(
            "hero-gradient hero-shadow text-white",
            panelRadius,
            !intro && "pb-[clamp(24px,3.4vw,48px)]"
          )}
        >
          <SiteHeader user={user ? { email: user.email ?? "" } : null} />
          {intro && <PageIntro {...intro} />}
        </div>
        <main className={cn("mist-glow flex-1 overflow-hidden text-foreground", panelRadius)}>
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
