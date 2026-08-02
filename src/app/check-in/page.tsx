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
    <AppShell>
      <CheckInFlow />
    </AppShell>
  );
}
