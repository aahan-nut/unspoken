"use client";

import { PageContainer } from "@/components/layout/PageContainer";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { FieldWrapper, Input, Select } from "@/components/ui/FormField";
import { Modal } from "@/components/ui/Modal";
import { ResourceCard } from "@/components/ui/ResourceCard";
import {
  ResourceFilters,
  defaultResourceFilters,
  type ResourceFilterState,
} from "@/components/resources/ResourceFilters";
import { NearbySearch } from "@/components/resources/NearbySearch";
import { resourceSortOptions, resources } from "@/data/mockResources";
import { useSavedResources } from "@/lib/useSavedResources";
import type { ResourceSort, SavedResourceRow } from "@/types/resource";
import { Bookmark, Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const FREE_COST_CATEGORIES = new Set(["free", "low-cost", "sliding-scale"]);

interface ResourcesContentProps {
  initialSavedEntries: SavedResourceRow[];
  isAuthenticated: boolean;
}

export function ResourcesContent({
  initialSavedEntries,
  isAuthenticated,
}: ResourcesContentProps) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<ResourceFilterState>(defaultResourceFilters);
  const [sort, setSort] = useState<ResourceSort>("relevance");
  const [savedOnly, setSavedOnly] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const {
    savedEntries,
    savingId,
    savingExternalId,
    errorMessage,
    isResourceSaved,
    isPlaceSaved,
    handleToggleSave,
    handleToggleSaveExternal,
  } = useSavedResources({
    initialSavedEntries,
    isAuthenticated,
    loginRedirectPath: "/resources",
  });

  const handleFilterChange = (patch: Partial<ResourceFilterState>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  };

  const handleClearFilters = () => {
    setFilters(defaultResourceFilters);
    setSearch("");
    setSavedOnly(false);
  };

  const activeFilterCount = [
    filters.location.trim() !== "",
    filters.modality !== "all",
    filters.category !== "all",
    filters.ageGroup !== "all",
    filters.language !== "all",
    filters.freeOnly,
    filters.insuranceOnly,
  ].filter(Boolean).length;

  const results = useMemo(() => {
    const query = search.trim().toLowerCase();
    const location = filters.location.trim().toLowerCase();

    const filtered = resources.filter((resource) => {
      const matchesSearch =
        !query ||
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesLocation =
        !location ||
        resource.modality === "virtual" ||
        resource.city.toLowerCase().includes(location) ||
        (resource.zip ?? "").includes(location);

      const matchesModality =
        filters.modality === "all" ||
        resource.modality === filters.modality ||
        resource.modality === "both";

      const matchesCategory =
        filters.category === "all" || resource.category === filters.category;

      const matchesAge =
        filters.ageGroup === "all" ||
        resource.ageGroups.includes(filters.ageGroup) ||
        resource.ageGroups.includes("all-ages");

      const matchesLanguage =
        filters.language === "all" || resource.languages.includes(filters.language);

      const matchesCost = !filters.freeOnly || FREE_COST_CATEGORIES.has(resource.costCategory);

      const matchesInsurance = !filters.insuranceOnly || resource.insuranceAccepted;

      const matchesSaved = !savedOnly || isResourceSaved(resource.id);

      return (
        matchesSearch &&
        matchesLocation &&
        matchesModality &&
        matchesCategory &&
        matchesAge &&
        matchesLanguage &&
        matchesCost &&
        matchesInsurance &&
        matchesSaved
      );
    });

    const sorted = [...filtered];
    if (sort === "distance") {
      sorted.sort((a, b) => {
        if (a.distanceMiles === null) return 1;
        if (b.distanceMiles === null) return -1;
        return a.distanceMiles - b.distanceMiles;
      });
    } else if (sort === "recent") {
      sorted.sort((a, b) => (a.lastVerified < b.lastVerified ? 1 : -1));
    } else if (sort === "name") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    return sorted;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filters, sort, savedOnly, savedEntries]);

  return (
    <PageContainer>
      <Alert variant="warning" title="Sample data" className="mb-8">
        This directory uses mock listings built for this frontend prototype. Nothing
        here is clinically verified — always confirm details directly with the
        provider before relying on them.
      </Alert>

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
          to save resources, track their status, and add private notes.
        </Alert>
      )}

      {errorMessage && (
        <Alert variant="error" title="Something went wrong" className="mb-8">
          {errorMessage}
        </Alert>
      )}

      <NearbySearch
        isPlaceSaved={isPlaceSaved}
        savingExternalId={savingExternalId}
        onToggleSave={handleToggleSaveExternal}
      />

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">Curated resource directory</h2>
        <p className="text-sm text-muted">
          Sample listings built for this prototype — filter and browse below.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="hidden shrink-0 lg:block lg:w-72">
          <Card padding="md" className="sticky top-24">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
              Filters
            </h2>
            <ResourceFilters
              filters={filters}
              onChange={handleFilterChange}
              onClear={handleClearFilters}
            />
          </Card>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1">
              <FieldWrapper label="Search resources" htmlFor="search">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <Input
                    id="search"
                    placeholder="Search by name, topic, or tag..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </FieldWrapper>
            </div>

            <FieldWrapper label="Sort by" htmlFor="sort">
              <Select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as ResourceSort)}
              >
                {resourceSortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FieldWrapper>

            <Button
              variant="outline"
              className="lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-1 rounded-full bg-primary px-1.5 text-xs text-primary-foreground">
                  {activeFilterCount}
                </span>
              )}
            </Button>

            <Button
              variant={savedOnly ? "primary" : "outline"}
              aria-pressed={savedOnly}
              onClick={() => setSavedOnly((v) => !v)}
            >
              <Bookmark className="h-4 w-4" />
              Saved ({savedEntries.length})
            </Button>
          </div>

          <div className="mb-6 -mt-3">
            <Link
              href="/saved"
              className="text-sm font-medium text-primary transition-colors hover:text-primary-hover"
            >
              Manage saved resources &amp; notes →
            </Link>
          </div>

          <p className="mb-4 text-sm text-muted">
            {results.length} sample resources found
          </p>

          {results.length === 0 ? (
            <EmptyState
              title="No resources found"
              description="Try adjusting your search, location, or filters to find what you're looking for."
              actionLabel="Clear filters"
              onAction={handleClearFilters}
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  saved={isResourceSaved(resource.id)}
                  saving={savingId === resource.id}
                  onToggleSave={handleToggleSave}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        title="Filters"
        size="sm"
      >
        <ResourceFilters
          filters={filters}
          onChange={handleFilterChange}
          onClear={handleClearFilters}
          idPrefix="mobile-filter"
        />
        <Button className="mt-6 w-full" onClick={() => setMobileFiltersOpen(false)}>
          Show {results.length} results
        </Button>
      </Modal>
    </PageContainer>
  );
}
