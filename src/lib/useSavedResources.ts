"use client";

import { useToast } from "@/components/ui/Toast";
import { createClient } from "@/lib/supabase/client";
import { SAVED_RESOURCE_COLUMNS } from "@/lib/supabase/savedResourceColumns";
import type { SavedResourceRow } from "@/types/resource";
import type { NearbyResource } from "@/types/geo";
import type { ParentResource } from "@/types/parentSupport";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface UseSavedResourcesOptions {
  initialSavedEntries: SavedResourceRow[];
  isAuthenticated: boolean;
  /** Where to send an unauthenticated user who tries to save something, e.g. "/resources" or "/parents/autism". */
  loginRedirectPath: string;
}

/**
 * Shared saved-resource state + Supabase read/write logic, used by the
 * curated teen resource directory (ResourcesContent), the Google Places
 * "nearby" flow, and the Parent Support condition pages. One source of
 * truth for the three save "shapes" the saved_resources table supports:
 * internal (resource_id), google_places, and parent_curated (both external_*).
 */
export function useSavedResources({
  initialSavedEntries,
  isAuthenticated,
  loginRedirectPath,
}: UseSavedResourcesOptions) {
  const router = useRouter();
  const { showToast } = useToast();
  const supabase = useMemo(() => createClient(), []);

  const [savedEntries, setSavedEntries] = useState<SavedResourceRow[]>(initialSavedEntries);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savingExternalId, setSavingExternalId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isResourceSaved = (resourceId: string) =>
    savedEntries.some((entry) => entry.resource_id === resourceId);

  const isPlaceSaved = (externalId: string) =>
    savedEntries.some(
      (entry) => entry.source === "google_places" && entry.external_place_id === externalId
    );

  const isParentResourceSaved = (parentResourceId: string) =>
    savedEntries.some(
      (entry) => entry.source === "parent_curated" && entry.external_place_id === parentResourceId
    );

  const requireAuth = () => {
    if (isAuthenticated) return true;
    router.push(`/login?redirectedFrom=${encodeURIComponent(loginRedirectPath)}`);
    return false;
  };

  const removeExisting = async (existing: SavedResourceRow) => {
    const { error } = await supabase.from("saved_resources").delete().eq("id", existing.id);
    if (error) {
      setErrorMessage("Couldn't remove this resource. Please try again.");
      return false;
    }
    setSavedEntries((prev) => prev.filter((entry) => entry.id !== existing.id));
    showToast("Removed from saved resources");
    return true;
  };

  const insertEntry = async (insert: Record<string, unknown>) => {
    const { data, error } = await supabase
      .from("saved_resources")
      .insert(insert)
      .select(SAVED_RESOURCE_COLUMNS)
      .single();

    if (error) {
      if (error.code === "23505") {
        showToast("Already in your saved resources");
      } else {
        setErrorMessage("Couldn't save this resource. Please try again.");
      }
      return;
    }
    if (data) {
      setSavedEntries((prev) => [...prev, data as SavedResourceRow]);
      showToast("Saved — find it on your Saved page");
    }
  };

  const handleToggleSave = async (resourceId: string) => {
    if (!requireAuth()) return;

    setErrorMessage(null);
    setSavingId(resourceId);

    const existing = savedEntries.find((entry) => entry.resource_id === resourceId);
    if (existing) {
      await removeExisting(existing);
    } else {
      await insertEntry({ resource_id: resourceId });
    }

    setSavingId(null);
  };

  const handleToggleSaveExternal = async (place: NearbyResource) => {
    if (!requireAuth()) return;

    setErrorMessage(null);
    setSavingExternalId(place.externalId);

    const existing = savedEntries.find(
      (entry) => entry.source === "google_places" && entry.external_place_id === place.externalId
    );

    if (existing) {
      await removeExisting(existing);
    } else {
      await insertEntry({
        resource_id: null,
        source: "google_places",
        external_place_id: place.externalId,
        external_name: place.name,
        external_address: place.address,
        external_resource_type: place.resourceType,
        external_maps_url: place.googleMapsUrl,
      });
    }

    setSavingExternalId(null);
  };

  const handleToggleSaveParentResource = async (resource: ParentResource) => {
    if (!requireAuth()) return;

    setErrorMessage(null);
    setSavingExternalId(resource.id);

    const existing = savedEntries.find(
      (entry) => entry.source === "parent_curated" && entry.external_place_id === resource.id
    );

    if (existing) {
      await removeExisting(existing);
    } else {
      await insertEntry({
        resource_id: null,
        source: "parent_curated",
        external_place_id: resource.id,
        external_name: resource.title,
        external_address: resource.organization,
        external_resource_type: resource.resourceType,
        external_maps_url: null,
      });
    }

    setSavingExternalId(null);
  };

  return {
    savedEntries,
    savingId,
    savingExternalId,
    errorMessage,
    isResourceSaved,
    isPlaceSaved,
    isParentResourceSaved,
    handleToggleSave,
    handleToggleSaveExternal,
    handleToggleSaveParentResource,
  };
}
