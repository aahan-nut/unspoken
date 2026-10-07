import { ParentResourceCard } from "@/components/parents/ParentResourceCard";
import type { ParentResource, ParentResourceCategoryOption } from "@/types/parentSupport";

interface ParentResourceGridProps {
  resources: ParentResource[];
  /** When provided, resources are grouped into labeled sections by resourceType. Omit for a flat grid. */
  categories?: ParentResourceCategoryOption[];
  isSaved: (resourceId: string) => boolean;
  savingId: string | null;
  onToggleSave: (resource: ParentResource) => void;
}

function ResourceGridRow({
  resources,
  isSaved,
  savingId,
  onToggleSave,
}: Omit<ParentResourceGridProps, "categories">) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {resources.map((resource) => (
        <ParentResourceCard
          key={resource.id}
          resource={resource}
          saved={isSaved(resource.id)}
          saving={savingId === resource.id}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  );
}

export function ParentResourceGrid({
  resources,
  categories,
  isSaved,
  savingId,
  onToggleSave,
}: ParentResourceGridProps) {
  if (!categories) {
    return (
      <ResourceGridRow
        resources={resources}
        isSaved={isSaved}
        savingId={savingId}
        onToggleSave={onToggleSave}
      />
    );
  }

  return (
    <div className="space-y-10">
      {categories.map((category) => {
        const categoryResources = resources.filter((r) => r.resourceType === category.value);
        if (categoryResources.length === 0) return null;

        return (
          <section key={category.value} aria-labelledby={`resource-category-${category.value}`}>
            <h3
              id={`resource-category-${category.value}`}
              className="mb-4 text-lg font-semibold text-foreground"
            >
              {category.label}
            </h3>
            <ResourceGridRow
              resources={categoryResources}
              isSaved={isSaved}
              savingId={savingId}
              onToggleSave={onToggleSave}
            />
          </section>
        );
      })}
    </div>
  );
}
