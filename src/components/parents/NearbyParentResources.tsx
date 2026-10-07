import { NearbySearch } from "@/components/resources/NearbySearch";
import type { ConditionConfig } from "@/types/parentSupport";
import type { NearbyResource } from "@/types/geo";

interface NearbyParentResourcesProps {
  config: ConditionConfig;
  isPlaceSaved: (externalId: string) => boolean;
  savingExternalId: string | null;
  onToggleSave: (resource: NearbyResource) => void;
}

const NOTICE_TEXT =
  "Nearby listings are based on public location data. Contact the provider directly to confirm services, age eligibility, availability, cost, and suitability.";

/**
 * Reuses the app's existing browser-geolocation + Google Places search
 * (components/resources/NearbySearch.tsx) with condition-specific provider
 * categories, rather than a separate location system.
 */
export function NearbyParentResources({
  config,
  isPlaceSaved,
  savingExternalId,
  onToggleSave,
}: NearbyParentResourcesProps) {
  return (
    <section aria-labelledby="nearby-parent-resources-heading">
      <h2 id="nearby-parent-resources-heading" className="mb-4 text-xl font-semibold text-foreground">
        Find Support Near You
      </h2>
      <NearbySearch
        isPlaceSaved={isPlaceSaved}
        savingExternalId={savingExternalId}
        onToggleSave={onToggleSave}
        heading="Search real places near you"
        subheading={`Live results from Google for ${config.name.toLowerCase()}-related providers — separate from the curated resources above.`}
        categoryOptions={config.nearbyCategoryOptions}
        defaultCategory={config.nearbyDefaultCategory}
        noticeText={NOTICE_TEXT}
      />
    </section>
  );
}
