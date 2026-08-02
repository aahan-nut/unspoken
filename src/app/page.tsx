import { AppShell } from "@/components/layout/AppShell";
import {
  PageContainer,
  SectionHeading,
} from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { features, howItWorksSteps, privacyPoints } from "@/lib/mock-data";
import {
  ArrowRight,
  ChevronRight,
  Shield,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <AppShell>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-warm-100 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sage-100/80 via-transparent to-transparent" />
        <PageContainer className="relative py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted shadow-sm">
              <Shield className="h-4 w-4 text-sage-600" />
              Private, supportive, and free to explore
            </div>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
              Finding the words can be the hardest part.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Unspoken helps you reflect on what you are feeling, identify a
              manageable next step, and prepare to reach out to someone you
              trust.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" href="/check-in">
                Start a Check-In
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" href="/resources">
                Find Support
              </Button>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* How it works preview */}
      <section className="border-b border-border bg-card">
        <PageContainer className="py-16 sm:py-20">
          <SectionHeading
            title="How Unspoken works"
            description="Three simple steps to help you understand what you're feeling and decide what to do next."
            centered
          />
          <div className="grid gap-6 md:grid-cols-3">
            {howItWorksSteps.map((step) => (
              <Card key={step.step} hover className="relative">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-sage-100 text-sm font-bold text-sage-600">
                  {step.step}
                </div>
                <CardHeader>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardDescription>{step.description}</CardDescription>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
            >
              Learn more about how it works
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </PageContainer>
      </section>

      {/* Feature cards */}
      <section className="border-b border-border">
        <PageContainer className="py-16 sm:py-20">
          <SectionHeading
            title="Support that meets you where you are"
            description="Tools designed for reflection, not diagnosis — helping you take the next step that feels right."
            centered
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} hover>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
                  <feature.icon className="h-5 w-5 text-secondary-foreground" />
                </div>
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardDescription>{feature.description}</CardDescription>
              </Card>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Disclaimer */}
      <section>
        <PageContainer className="py-12">
          <Disclaimer />
        </PageContainer>
      </section>

      {/* Privacy section */}
      <section className="border-y border-border bg-card">
        <PageContainer className="py-16 sm:py-20">
          <SectionHeading
            title="Your privacy matters"
            description="Use Unspoken on your terms — no account required, and you're always in control of what you share."
            centered
          />
          <div className="grid gap-6 md:grid-cols-3">
            {privacyPoints.map((point) => (
              <Card key={point.title}>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-sage-100">
                  <point.icon className="h-5 w-5 text-sage-600" />
                </div>
                <CardHeader>
                  <CardTitle>{point.title}</CardTitle>
                </CardHeader>
                <CardDescription>{point.description}</CardDescription>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button variant="secondary" href="/privacy">
              Read our privacy approach
            </Button>
          </div>
        </PageContainer>
      </section>

      {/* CTA */}
      <section>
        <PageContainer className="py-16 sm:py-20">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-sage-100/50 via-warm-100 to-warm-50 p-8 text-center sm:p-12">
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
              Ready when you are
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted">
              There&apos;s no pressure and no wrong way to start. Take a moment
              for yourself — whenever it feels right.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" href="/check-in">
                Start a Check-In
              </Button>
              <Button variant="ghost" size="lg" href="/resources">
                Browse resources
              </Button>
            </div>
          </div>
        </PageContainer>
      </section>
    </AppShell>
  );
}
