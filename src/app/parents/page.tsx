import { AppShell } from "@/components/layout/AppShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ParentDisclaimer } from "@/components/parents/ParentDisclaimer";
import { ConditionCard } from "@/components/parents/ConditionCard";
import { autismConfig } from "@/data/parentSupport/autism";
import { adhdConfig } from "@/data/parentSupport/adhd";
import { ArrowLeft, Compass, MapPin, Puzzle, Users2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Parent Support",
  description:
    "Trustworthy, non-diagnostic information and resources for parents and caregivers navigating autism or ADHD.",
};

export default function ParentsPage() {
  return (
    <AppShell
      intro={{
        title: "Parent Support",
        description:
          "Supporting a child can sometimes mean figuring out where to begin. Explore trustworthy information, practical next steps, and resources based on what your family is currently navigating.",
      }}
    >
      <PageContainer>
        <ParentDisclaimer className="mb-10" />

        <div className="mb-12 grid gap-6 sm:grid-cols-2">
          <ConditionCard
            title={autismConfig.name}
            description="Understand autism, find your current situation, and explore curated resources and nearby support."
            href="/parents/autism"
            icon={Puzzle}
          />
          <ConditionCard
            title={adhdConfig.name}
            description="Understand ADHD, find your current situation, and explore curated resources and nearby support."
            href="/parents/adhd"
            icon={Compass}
          />
        </div>

        <Card padding="md" className="mb-8">
          <div className="mb-3 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
              <Compass className="h-4 w-4 text-secondary-foreground" />
            </div>
            <h2 className="text-base font-semibold text-foreground">How the situation navigator works</h2>
          </div>
          <p className="text-sm leading-relaxed text-muted">
            Each condition page starts by asking what best describes where you are right now —
            for example, noticing early differences, adjusting to a recent diagnosis, or
            navigating school support. Choosing an option isn&apos;t a diagnosis or an assessment
            of your child — it simply helps surface more relevant next steps, questions to ask,
            and resources. You can change your selection or return to the general overview at
            any time.
          </p>
        </Card>

        <Card padding="md" className="mb-8">
          <div className="mb-3 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
              <Users2 className="h-4 w-4 text-secondary-foreground" />
            </div>
            <h2 className="text-base font-semibold text-foreground">General parent &amp; caregiver support</h2>
          </div>
          <p className="mb-4 text-sm leading-relaxed text-muted">
            Not sure which condition fits, or looking for support in general? You&apos;re
            welcome to explore either section — both include general understanding content, and
            you don&apos;t need a diagnosis or a specific concern to look around. Every family&apos;s
            path looks different, and there&apos;s no wrong place to start.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" href="/parents/autism">
              Explore Autism Support
            </Button>
            <Button variant="outline" href="/parents/adhd">
              Explore ADHD Support
            </Button>
          </div>
        </Card>

        <Card padding="md" className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
              <MapPin className="h-4 w-4 text-secondary-foreground" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Find nearby resources</h2>
              <p className="text-sm text-muted">
                Each condition page includes location-based search for nearby providers and services.
              </p>
            </div>
          </div>
          <Button variant="outline" href="/parents/autism">
            Go to a condition page
          </Button>
        </Card>

        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to main platform
        </Link>
      </PageContainer>
    </AppShell>
  );
}
