import { AppShell } from "@/components/layout/AppShell";
import { ResourcesContent } from "@/components/resources/ResourcesContent";
import { SAVED_RESOURCE_COLUMNS } from "@/lib/supabase/savedResourceColumns";
import { createClient } from "@/lib/supabase/server";
import type { SavedResourceRow } from "@/types/resource";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Discover mental health resources including crisis lines, counseling, peer support, and self-care tools.",
};

export default async function ResourcesPage() {
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
    <AppShell>
      <ResourcesContent
        initialSavedEntries={initialSavedEntries}
        isAuthenticated={Boolean(user)}
      />
    </AppShell>
  );
}
