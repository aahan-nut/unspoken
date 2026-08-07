import { AppShell } from "@/components/layout/AppShell";
import { SavedContent } from "@/components/saved/SavedContent";
import { SAVED_RESOURCE_COLUMNS } from "@/lib/supabase/savedResourceColumns";
import { createClient } from "@/lib/supabase/server";
import type { SavedResourceRow } from "@/types/resource";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Saved Resources",
  description:
    "Resources you've saved, with your own private status and notes.",
};

export default async function SavedPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectedFrom=%2Fsaved");
  }

  const { data, error } = await supabase
    .from("saved_resources")
    .select(SAVED_RESOURCE_COLUMNS)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <AppShell>
      <SavedContent
        initialEntries={(data ?? []) as SavedResourceRow[]}
        initialError={error ? "Couldn't load your saved resources. Try refreshing the page." : null}
      />
    </AppShell>
  );
}
