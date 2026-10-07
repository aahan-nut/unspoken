"use client";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { FieldWrapper, Input, Select } from "@/components/ui/FormField";
import { NearbyResourceCard } from "@/components/resources/NearbyResourceCard";
import { resourceCategoryOptions, type ResourceCategoryQuery } from "@/lib/geo/schema";
import { useGeolocation, type GeolocationErrorReason } from "@/lib/geo/useGeolocation";
import type { NearbyResource } from "@/types/geo";
import { LocateFixed, MapPin, Search, X } from "lucide-react";
import { useState } from "react";

const RADIUS_OPTIONS_MILES = [5, 10, 20, 30] as const;
const METERS_PER_MILE = 1609.34;

function milesToMeters(miles: number): number {
  return Math.round(miles * METERS_PER_MILE);
}

type SearchState = "idle" | "loading" | "success" | "empty" | "error";
type LastSearch =
  | { kind: "location"; coords: { latitude: number; longitude: number } }
  | { kind: "manual"; location: string };

const GEO_ERROR_MESSAGES: Record<GeolocationErrorReason, string> = {
  unsupported:
    "Your browser doesn't support location search. Enter a city or ZIP code below instead.",
  denied:
    "Location access was denied. You can still search by entering a city or ZIP code below.",
  timeout: "Location request timed out. Try again, or search by city or ZIP code below.",
  unavailable:
    "Your location is unavailable right now. Try again, or search by city or ZIP code below.",
  unknown:
    "Something went wrong getting your location. Try again, or search by city or ZIP code below.",
};

interface NearbySearchProps {
  isPlaceSaved: (externalId: string) => boolean;
  savingExternalId: string | null;
  onToggleSave: (resource: NearbyResource) => void;
  heading?: string;
  subheading?: string;
  categoryOptions?: { value: ResourceCategoryQuery; label: string }[];
  defaultCategory?: ResourceCategoryQuery;
  noticeText?: string;
}

const DEFAULT_NOTICE_TEXT =
  "Nearby listings are provided using public location data. Unspoken does not guarantee provider availability, cost, eligibility, licensing, or suitability. Contact the organization directly to confirm details.";

export function NearbySearch({
  isPlaceSaved,
  savingExternalId,
  onToggleSave,
  heading = "Search real places near you",
  subheading = "Live results from Google — separate from the sample directory below.",
  categoryOptions = resourceCategoryOptions,
  defaultCategory = "mental-health",
  noticeText = DEFAULT_NOTICE_TEXT,
}: NearbySearchProps) {
  const geo = useGeolocation();

  const [radiusMiles, setRadiusMiles] = useState<number>(10);
  const [category, setCategory] = useState<ResourceCategoryQuery>(defaultCategory);
  const [manualLocation, setManualLocation] = useState("");

  const [searchState, setSearchState] = useState<SearchState>("idle");
  const [results, setResults] = useState<NearbyResource[]>([]);
  const [searchedRadiusMeters, setSearchedRadiusMeters] = useState<number | null>(null);
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);
  const [lastSearch, setLastSearch] = useState<LastSearch | null>(null);

  const runSearch = async (url: string, payload: Record<string, unknown>) => {
    setSearchState("loading");
    setApiErrorMessage(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: unknown = await response.json();

      if (!response.ok) {
        const message =
          typeof data === "object" && data !== null && "error" in data && typeof (data as { error?: unknown }).error === "string"
            ? (data as { error: string }).error
            : "Something went wrong. Please try again.";
        setApiErrorMessage(message);
        setSearchState("error");
        return;
      }

      const resources =
        typeof data === "object" && data !== null && Array.isArray((data as { resources?: unknown }).resources)
          ? ((data as { resources: NearbyResource[] }).resources)
          : [];
      const radiusFromResponse =
        typeof data === "object" && data !== null && typeof (data as { searchedRadiusMeters?: unknown }).searchedRadiusMeters === "number"
          ? (data as { searchedRadiusMeters: number }).searchedRadiusMeters
          : null;

      setResults(resources);
      setSearchedRadiusMeters(radiusFromResponse);
      setSearchState(resources.length === 0 ? "empty" : "success");
    } catch {
      setApiErrorMessage("Couldn't reach the search service. Please check your connection and try again.");
      setSearchState("error");
    }
  };

  const handleUseMyLocation = () => {
    geo.requestLocation((coords) => {
      setLastSearch({ kind: "location", coords });
      runSearch("/api/resources/nearby", {
        latitude: coords.latitude,
        longitude: coords.longitude,
        radiusMeters: milesToMeters(radiusMiles),
        resourceCategory: category,
      });
    });
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = manualLocation.trim();
    if (!trimmed) return;
    setLastSearch({ kind: "manual", location: trimmed });
    runSearch("/api/resources/search", { location: trimmed, resourceCategory: category });
  };

  const handleRetry = () => {
    if (!lastSearch) return;
    if (lastSearch.kind === "location") {
      runSearch("/api/resources/nearby", {
        latitude: lastSearch.coords.latitude,
        longitude: lastSearch.coords.longitude,
        radiusMeters: milesToMeters(radiusMiles),
        resourceCategory: category,
      });
    } else {
      runSearch("/api/resources/search", { location: lastSearch.location, resourceCategory: category });
    }
  };

  const handleClear = () => {
    setSearchState("idle");
    setResults([]);
    setApiErrorMessage(null);
    setSearchedRadiusMeters(null);
    setManualLocation("");
    setLastSearch(null);
    geo.reset();
  };

  const isSearching = searchState === "loading";
  const resultsCountLabel =
    searchState === "success"
      ? `${results.length} nearby listing${results.length === 1 ? "" : "s"} found${
          searchedRadiusMeters ? ` within ${Math.round(searchedRadiusMeters / METERS_PER_MILE)} mi` : ""
        }`
      : null;

  return (
    <Card padding="md" className="mb-8">
      <div className="mb-5 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
          <MapPin className="h-4 w-4 text-secondary-foreground" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground">{heading}</h2>
          <p className="text-sm text-muted">{subheading}</p>
        </div>
      </div>

      <div className="mb-5 grid gap-4 sm:grid-cols-2">
        <FieldWrapper label="Type of provider" htmlFor="nearby-category">
          <Select
            id="nearby-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as ResourceCategoryQuery)}
            disabled={isSearching}
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FieldWrapper>

        <FieldWrapper label="Search radius" htmlFor="nearby-radius">
          <Select
            id="nearby-radius"
            value={radiusMiles}
            onChange={(e) => setRadiusMiles(Number(e.target.value))}
            disabled={isSearching}
          >
            {RADIUS_OPTIONS_MILES.map((miles) => (
              <option key={miles} value={miles}>
                {miles} miles
              </option>
            ))}
          </Select>
        </FieldWrapper>
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end">
        <Button
          type="button"
          variant="outline"
          onClick={handleUseMyLocation}
          loading={geo.status === "loading"}
          disabled={geo.status === "loading" || isSearching}
        >
          <LocateFixed className="h-4 w-4" />
          Use my location
        </Button>

        <form onSubmit={handleManualSearch} className="flex flex-1 items-end gap-2">
          <div className="flex-1">
            <FieldWrapper label="Or enter a city or ZIP code" htmlFor="nearby-manual-location">
              <Input
                id="nearby-manual-location"
                placeholder="e.g. 90703 or Cerritos, CA"
                value={manualLocation}
                onChange={(e) => setManualLocation(e.target.value)}
                maxLength={100}
                disabled={isSearching}
              />
            </FieldWrapper>
          </div>
          <Button type="submit" variant="outline" disabled={isSearching || !manualLocation.trim()}>
            <Search className="h-4 w-4" />
            Search
          </Button>
        </form>
      </div>

      {geo.status === "error" && geo.errorReason && (
        <Alert variant="warning" title="Couldn't get your location" className="mb-5">
          {GEO_ERROR_MESSAGES[geo.errorReason]}
        </Alert>
      )}

      {searchState === "loading" && (
        <div className="space-y-4">
          <p className="text-sm text-muted">Searching nearby providers…</p>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <div key={i} className="animate-pulse rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 h-5 w-24 rounded-full bg-background" />
                <div className="mb-2 h-4 w-3/4 rounded bg-background" />
                <div className="mb-1 h-3 w-full rounded bg-background" />
                <div className="mb-4 h-3 w-2/3 rounded bg-background" />
                <div className="h-8 w-32 rounded-xl bg-background" />
              </div>
            ))}
          </div>
        </div>
      )}

      {searchState === "error" && (
        <ErrorState
          title="Search failed"
          message={apiErrorMessage ?? "Something went wrong. Please try again."}
          onRetry={lastSearch ? handleRetry : undefined}
        />
      )}

      {searchState === "empty" && (
        <EmptyState
          icon={Search}
          title="No nearby listings found"
          description="Try a larger search radius or a different city/ZIP code."
          actionLabel="Clear search"
          onAction={handleClear}
        />
      )}

      {searchState === "success" && (
        <div className="space-y-5">
          <Alert variant="info" title="About these results">
            {noticeText}
          </Alert>

          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted">{resultsCountLabel}</p>
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
            >
              <X className="h-3.5 w-3.5" />
              Clear search
            </button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((resource) => (
              <NearbyResourceCard
                key={resource.externalId}
                resource={resource}
                saved={isPlaceSaved(resource.externalId)}
                saving={savingExternalId === resource.externalId}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
