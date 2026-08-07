import { AppShell } from "@/components/layout/AppShell";
import { SayItFlow } from "@/components/message-builder/SayItFlow";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Me Say It",
  description:
    "Get help finding the words to reach out to a parent, counselor, teacher, doctor, therapist, or friend.",
};

export default function HelpMeSayItPage() {
  return (
    <AppShell>
      <SayItFlow />
    </AppShell>
  );
}
