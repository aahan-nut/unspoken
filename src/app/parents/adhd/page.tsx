import { AppShell } from "@/components/layout/AppShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { LoadingState } from "@/components/ui/LoadingState";
import { ConditionPageContent } from "@/components/parents/ConditionPageContent";
import { adhdConfig } from "@/data/parentSupport/adhd";
import { SAVED_RESOURCE_COLUMNS } from "@/lib/supabase/savedResourceColumns";
import { createClient } from "@/lib/supabase/server";
import type { SavedResourceRow } from "@/types/resource";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ADHD Support for Parents",
  description:
    "Educational, non-diagnostic information and resources for parents and caregivers navigating ADHD.",
};

export default async function ParentsAdhdPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let initialSavedEntries: SavedResourceRow[] = [];
  if (user) {
    const { data } = await supabase
      .from("saved_resources")
      .select(SAVED_RESOURCE_COLUMNS)
      .eq("user_id", user.id);
    initialSavedEntries = (data ?? []) as SavedResourceRow[];
  }

  return (
    <AppShell
      intro={{
        title: adhdConfig.fullName,
        description: adhdConfig.tagline,
        back: { href: "/parents", label: "Back to Parent Support" },
      }}
    >
      <Suspense
        fallback={
          <PageContainer>
            <LoadingState message="Loading..." />
          </PageContainer>
        }
      >
        <ConditionPageContent
          config={adhdConfig}
          initialSavedEntries={initialSavedEntries}
          isAuthenticated={Boolean(user)}
        />
      </Suspense>
    </AppShell>
  );
}
