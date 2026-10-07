"use client";

import { PageContainer } from "@/components/layout/PageContainer";
import { Alert } from "@/components/ui/Alert";
import { ConditionOverview } from "@/components/parents/ConditionOverview";
import { SituationNavigator } from "@/components/parents/SituationNavigator";
import { SituationGuidance } from "@/components/parents/SituationGuidance";
import { ParentResourceGrid } from "@/components/parents/ParentResourceGrid";
import { NearbyParentResources } from "@/components/parents/NearbyParentResources";
import { getResourcesForCondition, getResourcesForSituation } from "@/data/parentSupport/resources";
import { useSavedResources } from "@/lib/useSavedResources";
import type { ConditionConfig } from "@/types/parentSupport";
import type { SavedResourceRow } from "@/types/resource";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ConditionPageContentProps {
  config: ConditionConfig;
  initialSavedEntries: SavedResourceRow[];
  isAuthenticated: boolean;
}

export function ConditionPageContent({
  config,
  initialSavedEntries,
  isAuthenticated,
}: ConditionPageContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedSituationId = searchParams.get("situation");

  const {
    savingExternalId,
    errorMessage,
    isPlaceSaved,
    isParentResourceSaved,
    handleToggleSaveExternal,
    handleToggleSaveParentResource,
  } = useSavedResources({
    initialSavedEntries,
    isAuthenticated,
    loginRedirectPath: `/parents/${config.slug}`,
  });

  const handleSelectSituation = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("situation", id);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const conditionResources = getResourcesForCondition(config.slug);
  const selectedSituation = config.situations.find((s) => s.id === selectedSituationId) ?? null;
  const guidance = selectedSituation ? config.guidanceBySituation[selectedSituation.id] : null;
  const situationResources = selectedSituation
    ? getResourcesForSituation(config.slug, selectedSituation.id)
    : [];

  return (
    <PageContainer>
      {errorMessage && (
        <Alert variant="error" title="Something went wrong" className="mb-8">
          {errorMessage}
        </Alert>
      )}

      {!isAuthenticated && (
        <Alert variant="info" title="Log in to save resources" className="mb-8">
          You can browse freely as a guest.{" "}
          <Link href="/login" className="font-medium underline underline-offset-2">
            Log in
          </Link>{" "}
          or{" "}
          <Link href="/signup" className="font-medium underline underline-offset-2">
            sign up
          </Link>{" "}
          to save resources to your account.
        </Alert>
      )}

      <ConditionOverview config={config} />

      <SituationNavigator
        situations={config.situations}
        selectedId={selectedSituationId}
        onSelect={handleSelectSituation}
      />

      {selectedSituation && guidance && (
        <SituationGuidance
          situation={selectedSituation}
          guidance={guidance}
          resources={situationResources}
          isSaved={isParentResourceSaved}
          savingId={savingExternalId}
          onToggleSave={handleToggleSaveParentResource}
        />
      )}

      <div className="mb-10">
        <h2 className="mb-1 text-xl font-semibold text-foreground">
          Explore {config.name} Resources by Category
        </h2>
        <p className="mb-6 text-sm text-muted">
          Curated, non-diagnostic resources organized by what you might be looking for.
        </p>
        <ParentResourceGrid
          resources={conditionResources}
          categories={config.resourceCategories}
          isSaved={isParentResourceSaved}
          savingId={savingExternalId}
          onToggleSave={handleToggleSaveParentResource}
        />
      </div>

      <NearbyParentResources
        config={config}
        isPlaceSaved={isPlaceSaved}
        savingExternalId={savingExternalId}
        onToggleSave={handleToggleSaveExternal}
      />
    </PageContainer>
  );
}
