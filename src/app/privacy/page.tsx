import { AppShell } from "@/components/layout/AppShell";
import {
  PageContainer,
  SectionHeading,
} from "@/components/layout/PageContainer";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card, CardDescription } from "@/components/ui/Card";
import { Disclaimer } from "@/components/ui/Disclaimer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & Safety",
  description:
    "Learn how Unspoken handles your data, protects your privacy, and keeps you safe.",
};

const privacySections = [
  {
    id: "guest",
    title: "Guest use",
    content:
      "You can use Unspoken without creating an account — today, and in every future version we build. Check-ins, saved resources, and notes are tied to your browser, not an identity. Nothing requires a name, email, or sign-up to get started.",
  },
  {
    id: "future-accounts",
    title: "Optional account use in a future version",
    content:
      "A future version may offer an optional account so your check-ins and saved resources can sync across devices. Creating an account would always be a choice — Unspoken will keep working as a full guest experience for anyone who prefers that.",
  },
  {
    id: "future-storage",
    title: "What information may eventually be stored",
    content:
      "If accounts are introduced, we intend to store only what's needed to make the product useful: your check-in responses, saved resources with their status and notes, and basic preferences like your theme. We do not intend to store precise location, government ID, or health records.",
  },
  {
    id: "minimal-collection",
    title: "What information should not be collected unnecessarily",
    content:
      "We intentionally avoid collecting details we don't need to help you — things like your legal name, school ID, government ID numbers, precise real-time location, or contact lists. If a future feature seems to need more than the minimum, we'll explain why before asking for it.",
  },
  {
    id: "deletion",
    title: "User-controlled deletion",
    content:
      "You can already delete your local data at any time: remove a saved resource from the Saved Resources page, start a new check-in to overwrite the old one, or clear your browser's site data to remove everything at once. In a future account-based version, deleting your account would permanently delete your stored data.",
  },
  {
    id: "location",
    title: "Location permissions",
    content:
      "Unspoken does not access your device's precise location. The ZIP code or city field on the Resources page is a value you type in, used only to filter the sample listings shown in your browser — it is never read from device location services or sent anywhere.",
  },
  {
    id: "ai-limits",
    title: "AI limitations",
    content:
      "This prototype does not use a real AI model yet — the guidance you see is static, pre-written mock content. When AI-generated guidance is introduced, it will still have real limits: it cannot diagnose conditions, replace a licensed professional, or guarantee it fully understands your situation. Always use your own judgment and seek a professional for anything serious.",
  },
  {
    id: "crisis-limits",
    title: "Crisis limitations",
    content:
      "Unspoken is not a crisis service. It cannot see, monitor, or respond to you in real time, detect an emergency, or dispatch help. If you or someone you know is in immediate danger, use the Crisis Support page or contact 911 or the 988 Suicide & Crisis Lifeline directly — do not rely on this app during an emergency.",
  },
  {
    id: "no-selling",
    title: "No selling of private journal or check-in data",
    content:
      "We will never sell, rent, or share your check-in responses, notes, or journal-style reflections with advertisers or data brokers. Any future data use will be limited to operating and improving Unspoken itself, and explained in plain language before it happens.",
  },
  {
    id: "prototype",
    title: "Prototype disclaimer",
    content:
      "This is a frontend prototype. There is no backend server, database, authentication system, or AI model behind it. All resources shown are mock data, and everything you enter — check-ins, saved resources, statuses, and notes — is stored only in your browser's local storage. Clearing your browser data or switching devices will remove it permanently.",
  },
];

export default function PrivacyPage() {
  return (
    <AppShell>
      <PageContainer narrow>
        <SectionHeading
          level="h1"
          title="Privacy & safety"
          description="How we approach your privacy, data, and safety on Unspoken."
        />

        <Disclaimer className="mb-10" />

        <div className="space-y-6">
          {privacySections.map((section) => (
            <Card key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                {section.title}
              </h2>
              <CardDescription className="text-base leading-relaxed">
                {section.content}
              </CardDescription>
            </Card>
          ))}
        </div>

        <section id="safety" className="mt-12 scroll-mt-24">
          <Alert variant="warning" title="Crisis resources">
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>
                <strong>988 Suicide & Crisis Lifeline:</strong> Call or text 988
              </li>
              <li>
                <strong>Crisis Text Line:</strong> Text HOME to 741741
              </li>
              <li>
                <strong>Emergency:</strong> Call 911
              </li>
            </ul>
          </Alert>
          <div className="mt-4">
            <Button variant="outline" href="/crisis">
              Go to Crisis Support
            </Button>
          </div>
        </section>
      </PageContainer>
    </AppShell>
  );
}
