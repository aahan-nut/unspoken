import { AppShell } from "@/components/layout/AppShell";
import { SupportContent } from "@/components/support/SupportContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Support Options",
  description:
    "A summary of your check-in with supportive, non-diagnostic guidance and next steps.",
};

export default function SupportPage() {
  return (
    <AppShell
      intro={{
        title: "Here's what we heard",
        back: { href: "/check-in", label: "Back to check-in" },
      }}
    >
      <SupportContent />
    </AppShell>
  );
}
