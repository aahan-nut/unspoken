import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import type { NearbyResource } from "@/types/geo";
import { Bookmark, BookmarkCheck, ExternalLink, Loader2, MapPin } from "lucide-react";

function formatResourceType(resourceType: string | null): string | null {
  if (!resourceType) return null;
  return resourceType.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

interface NearbyResourceCardProps {
  resource: NearbyResource;
  saved?: boolean;
  saving?: boolean;
  onToggleSave?: (resource: NearbyResource) => void;
  className?: string;
}

export function NearbyResourceCard({
  resource,
  saved = false,
  saving = false,
  onToggleSave,
  className,
}: NearbyResourceCardProps) {
  const typeLabel = formatResourceType(resource.resourceType);
  const isClosed = resource.businessStatus === "CLOSED_PERMANENTLY";

  return (
    <Card hover className={cn("flex flex-col", className)}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-medium text-muted">
          Nearby listing
        </span>
        {onToggleSave && (
          <button
            type="button"
            onClick={() => onToggleSave(resource)}
            disabled={saving}
            aria-pressed={saved}
            aria-label={saved ? "Remove from saved resources" : "Save resource"}
            className="shrink-0 rounded-lg p-1.5 text-muted transition-colors hover:bg-background hover:text-foreground disabled:opacity-50"
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

      <h3 className="mb-1 text-base font-semibold text-foreground">{resource.name}</h3>

      {isClosed && (
        <p className="mb-2 text-xs font-medium text-destructive">
          Google lists this location as permanently closed
        </p>
      )}

      {resource.address && (
        <p className="mb-3 flex items-start gap-1.5 text-sm leading-relaxed text-muted">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {resource.address}
        </p>
      )}

      <div className="mb-4 flex flex-wrap gap-2 text-xs text-muted">
        {typeLabel && <span className="rounded-md bg-background px-2 py-1">{typeLabel}</span>}
        {resource.distanceMiles !== null && (
          <span className="rounded-md bg-background px-2 py-1">
            {resource.distanceMiles} mi away
          </span>
        )}
      </div>

      <p className="mb-4 text-xs text-muted/80">Contact provider to confirm cost, insurance, and eligibility.</p>

      <div className="mt-auto flex flex-wrap gap-2">
        {resource.googleMapsUrl && (
          <Button variant="outline" size="sm" href={resource.googleMapsUrl}>
            View on Google Maps
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </Card>
  );
}
