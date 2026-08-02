import { AppShell } from "@/components/layout/AppShell";
import { ResourcesContent } from "@/components/resources/ResourcesContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Discover mental health resources including crisis lines, counseling, peer support, and self-care tools.",
};

export default function ResourcesPage() {
  return (
    <AppShell>
      <ResourcesContent />
    </AppShell>
  );
}
