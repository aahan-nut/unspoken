"use client";

import { PageContainer, SectionHeading } from "@/components/layout/PageContainer";
import { EmptyState } from "@/components/ui/EmptyState";
import { FieldWrapper, Input } from "@/components/ui/FormField";
import { ResourceCard } from "@/components/ui/ResourceCard";
import { resourceCategories, resources } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

export function ResourcesContent() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const matchesCategory = category === "all" || r.category === category;
      const query = search.toLowerCase();
      const matchesSearch =
        !query ||
        r.title.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query) ||
        r.tags.some((t) => t.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  const simulateReload = () => {
    setShowError(false);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  };

  return (
    <PageContainer>
      <SectionHeading
        title="Find support"
        description="Explore mental health resources curated for teens and young adults. Always verify details with the provider directly."
      />

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end">
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
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {resourceCategories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
              category === cat.value
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted hover:text-foreground"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {showError ? (
        <EmptyState
          title="Couldn't load resources"
          description="Something went wrong while fetching resources. This is a demo — try reloading."
          actionLabel="Try again"
          onAction={simulateReload}
        />
      ) : isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-2xl border border-border bg-card"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No resources found"
          description="Try adjusting your search or category filter to find what you're looking for."
          actionLabel="Clear filters"
          onAction={() => {
            setSearch("");
            setCategory("all");
          }}
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
