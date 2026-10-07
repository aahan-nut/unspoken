import { AppShell } from "@/components/layout/AppShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MessageCircleHeart, Phone, Users2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crisis Support",
  description: "Immediate emergency and crisis contact options.",
};

export default function CrisisPage() {
  return (
    <AppShell
      showCrisisBanner={false}
      intro={{
        eyebrow: "Crisis support",
        title: "If you're in danger right now, get help immediately.",
      }}
    >
      <PageContainer narrow>

        <Alert variant="error" title="Unspoken cannot provide emergency assistance" className="mb-8">
          This platform is not equipped to respond to emergencies. If you are in
          immediate danger or crisis, use one of the options below right now.
        </Alert>

        <div className="mb-8 space-y-4">
          <Button
            variant="destructive"
            size="lg"
            href="tel:911"
            className="w-full justify-center text-base"
          >
            <Phone className="h-5 w-5" />
            Call 911 — Immediate physical danger
          </Button>

          <div>
            <Button
              variant="destructive"
              size="lg"
              href="tel:988"
              className="w-full justify-center text-base"
            >
              <Phone className="h-5 w-5" />
              Call or Text 988 — Suicide &amp; Crisis Lifeline
            </Button>
            <p className="mt-2 text-center text-sm text-muted">
              Prefer to text?{" "}
              <a href="sms:988" className="font-medium text-red-700 underline underline-offset-2">
                Message 988
              </a>
            </p>
          </div>
        </div>

        <div className="mb-8 space-y-4">
          <Card padding="md" className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
              <Users2 className="h-5 w-5 text-secondary-foreground" />
            </div>
            <p className="text-sm leading-relaxed text-foreground">
              If it&apos;s safe to do so, move to be near a trusted person right now.
            </p>
          </Card>
          <Card padding="md" className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
              <MessageCircleHeart className="h-5 w-5 text-secondary-foreground" />
            </div>
            <p className="text-sm leading-relaxed text-foreground">
              Contact a parent, guardian, counselor, teacher, or other trusted
              adult you can talk to right now.
            </p>
          </Card>
        </div>

        <div className="text-center">
          <Button variant="outline" href="/resources">
            Return to resources
          </Button>
        </div>
      </PageContainer>
    </AppShell>
  );
}
