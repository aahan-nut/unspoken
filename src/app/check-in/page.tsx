import { AppShell } from "@/components/layout/AppShell";
import { CheckInFlow } from "@/components/check-in/CheckInFlow";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Check In",
  description:
    "Take a private moment to reflect on how you're feeling and explore supportive next steps.",
};

export default function CheckInPage() {
  return (
    <AppShell
      intro={{
        title: "Check in with yourself",
        description: "Take your time. There are no wrong answers here.",
        back: { href: "/", label: "Back to home" },
      }}
    >
      <CheckInFlow />
    </AppShell>
  );
}
