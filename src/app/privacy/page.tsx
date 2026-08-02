import { AppShell } from "@/components/layout/AppShell";
import {
  PageContainer,
  SectionHeading,
} from "@/components/layout/PageContainer";
import { Alert } from "@/components/ui/Alert";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
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
      "You can use Unspoken without creating an account. In this demo version, check-in data is stored locally in your browser and is not sent to any server. When a backend is added, we'll clearly explain what data is collected and give you control over it.",
  },
  {
    id: "data",
    title: "Data & storage",
    content:
      "This frontend demo does not connect to a database, authentication service, or AI model. Nothing you type is transmitted or stored on external servers. Clearing your browser data will remove any locally saved check-ins.",
  },
  {
    id: "control",
    title: "Your control",
    content:
      "You decide what to share during a check-in, whether to save it, and when to delete it. We believe mental health tools should empower you, not create pressure to disclose more than you're comfortable with.",
  },
  {
    id: "safety",
    title: "Safety information",
    content:
      "Unspoken is designed for self-reflection and resource navigation — not crisis intervention. If you or someone you know is in immediate danger, call 911 or the 988 Suicide & Crisis Lifeline. Crisis Text Line is available by texting HOME to 741741.",
  },
  {
    id: "limits",
    title: "What we don't do",
    content:
      "Unspoken does not provide therapy, medical advice, diagnoses, or treatment plans. Our guidance is general and supportive. For clinical concerns, please consult a licensed mental health professional.",
  },
  {
    id: "future",
    title: "Future updates",
    content:
      "When backend services are added, this page will be updated with detailed information about data retention, third-party services, cookie usage, and your rights. We are committed to transparency before any data collection begins.",
  },
];

export default function PrivacyPage() {
  return (
    <AppShell>
      <PageContainer narrow>
        <SectionHeading
          title="Privacy & safety"
          description="How we approach your privacy, data, and safety on Unspoken."
        />

        <Disclaimer className="mb-10" />

        <Alert variant="info" className="mb-10">
          This is a frontend demo. No data leaves your browser. The policies
          below describe our intended approach when the full platform launches.
        </Alert>

        <div className="space-y-6">
          {privacySections.map((section) => (
            <Card key={section.id} id={section.id} className="scroll-mt-24">
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
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
        </section>
      </PageContainer>
    </AppShell>
  );
}
