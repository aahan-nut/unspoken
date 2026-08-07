import { AppShell } from "@/components/layout/AppShell";
import {
  PageContainer,
  SectionHeading,
} from "@/components/layout/PageContainer";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { journeySteps, type JourneyStep } from "@/data/siteContent";
import {
  ChevronRight,
  Heart,
  MessageSquare,
  Shield,
  Users,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how Unspoken helps you reflect, receive supportive guidance, and prepare to reach out for help.",
};

const principles = [
  {
    icon: Heart,
    title: "Reflection, not diagnosis",
    description:
      "Unspoken helps you notice and name what you're feeling. We never label, diagnose, or tell you what's 'wrong' with you.",
  },
  {
    icon: MessageSquare,
    title: "Supportive, not clinical",
    description:
      "Our guidance is warm and human — like a thoughtful friend, not a medical chart. We suggest possibilities, not prescriptions.",
  },
  {
    icon: Shield,
    title: "Private by design",
    description:
      "Check in as a guest with no account required. What you share stays on your device in this demo version.",
  },
  {
    icon: Users,
    title: "Connection over isolation",
    description:
      "The goal is to help you feel less alone and more prepared to reach out — to a friend, family member, counselor, or resource.",
  },
];

function JourneyStepCard({ step }: { step: JourneyStep }) {
  const content = (
    <Card hover={Boolean(step.href)} padding="md" className="flex h-full flex-col">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
          {step.step}
        </div>
        <step.icon className="h-5 w-5 text-muted" aria-hidden="true" />
      </div>
      <h3 className="mb-1 font-semibold text-foreground">{step.title}</h3>
      <p className="text-sm leading-relaxed text-muted">{step.description}</p>
    </Card>
  );

  return step.href ? (
    <Link href={step.href} className="flex-1">
      {content}
    </Link>
  ) : (
    <div className="flex-1">{content}</div>
  );
}

export default function HowItWorksPage() {
  return (
    <AppShell>
      <PageContainer>
        <SectionHeading
          level="h1"
          title="How Unspoken works"
          description="A calm, step-by-step approach to understanding what you're feeling and finding your next step."
        />

        <Disclaimer className="mb-12" />

        <div className="mb-16 flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-0">
          {journeySteps.map((step, i) => (
            <div key={step.step} className="flex items-stretch lg:contents">
              <JourneyStepCard step={step} />
              {i < journeySteps.length - 1 && (
                <div className="hidden shrink-0 items-center justify-center px-2 lg:flex">
                  <ChevronRight className="h-5 w-5 text-muted" aria-hidden="true" />
                </div>
              )}
            </div>
          ))}
        </div>

        <SectionHeading
          title="Our approach"
          description="What guides everything we build at Unspoken."
        />

        <div className="mb-16 grid gap-6 sm:grid-cols-2">
          {principles.map((principle) => (
            <Card key={principle.title}>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
                <principle.icon className="h-5 w-5 text-secondary-foreground" />
              </div>
              <CardHeader>
                <CardTitle>{principle.title}</CardTitle>
              </CardHeader>
              <CardDescription>{principle.description}</CardDescription>
            </Card>
          ))}
        </div>

        <section id="reach-out" className="scroll-mt-24">
          <SectionHeading
            title="Preparing to reach out"
            description="Talking to someone you trust can feel daunting. Here are some ways to make it easier."
          />
          <div className="space-y-4">
            <Card padding="lg">
              <h3 className="mb-2 font-semibold text-foreground">
                Start small
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                You don&apos;t have to share everything at once. Try opening with
                something simple: &ldquo;I&apos;ve been having a hard time lately and
                could use someone to talk to.&rdquo;
              </p>
            </Card>
            <Card padding="lg">
              <h3 className="mb-2 font-semibold text-foreground">
                Choose the right person
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                Think about someone who has been supportive before — a friend,
                sibling, parent, teacher, or counselor. It&apos;s okay if the first
                person isn&apos;t available; try another.
              </p>
            </Card>
            <Card padding="lg">
              <h3 className="mb-2 font-semibold text-foreground">
                Set expectations
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                Let them know what you need: &ldquo;I&apos;m not looking for advice
                right now — I just need someone to listen.&rdquo; That helps both of
                you feel more comfortable.
              </p>
            </Card>
          </div>
        </section>

        <Alert variant="warning" title="When to seek professional help" className="mt-12">
          If your feelings are persistent, interfering with daily life, or you
          are having thoughts of self-harm, please reach out to a counselor,
          therapist, or crisis line. Unspoken can help you find resources, but
          it cannot replace professional care.
        </Alert>

        <div className="mt-10 text-center">
          <Button size="lg" href="/check-in">
            Try a check-in
          </Button>
        </div>
      </PageContainer>
    </AppShell>
  );
}
