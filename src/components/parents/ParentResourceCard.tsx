import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import type { ParentResource } from "@/types/parentSupport";
import { BadgeCheck, Bookmark, BookmarkCheck, ExternalLink, Loader2, Phone } from "lucide-react";

interface ParentResourceCardProps {
  resource: ParentResource;
  saved?: boolean;
  saving?: boolean;
  onToggleSave?: (resource: ParentResource) => void;
  className?: string;
}

export function ParentResourceCard({
  resource,
  saved = false,
  saving = false,
  onToggleSave,
  className,
}: ParentResourceCardProps) {
  return (
    <Card hover className={cn("flex flex-col", className)}>
      <div className="mb-4 flex items-start justify-between gap-3">
        {resource.isCurated && (
          <span className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-800">
            <BadgeCheck className="h-3 w-3" />
            Curated resource
          </span>
        )}
        {onToggleSave && (
          <button
            type="button"
            onClick={() => onToggleSave(resource)}
            disabled={saving}
            aria-pressed={saved}
            aria-label={saved ? "Remove from saved resources" : "Save resource"}
            className="ml-auto shrink-0 rounded-lg p-1.5 text-muted transition-colors hover:bg-background hover:text-foreground disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : saved ? (
              <BookmarkCheck className="h-5 w-5 text-primary" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      <h3 className="mb-1 text-base font-semibold text-foreground">{resource.title}</h3>
      <p className="mb-2 text-sm font-medium text-muted">{resource.organization}</p>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">{resource.description}</p>

      {resource.audience.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {resource.audience.map((tag) => (
            <span key={tag} className="rounded-full bg-background px-2 py-0.5 text-xs text-muted">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mb-3 flex flex-wrap gap-2">
        {resource.phone && (
          <Button variant="outline" size="sm" href={`tel:${resource.phone}`}>
            <Phone className="h-3.5 w-3.5" />
            {resource.phone}
          </Button>
        )}
        <Button variant="outline" size="sm" href={resource.websiteUrl}>
          Visit website
          <ExternalLink className="h-3.5 w-3.5" />
        </Button>
      </div>

      <p className="mt-auto text-xs text-muted/80">{resource.sourceLabel}</p>
    </Card>
  );
}
