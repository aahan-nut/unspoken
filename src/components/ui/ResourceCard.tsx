import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Resource } from "@/types/resource";
import { cn } from "@/lib/utils";
import {
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Globe,
  Languages,
  Loader2,
  MapPin,
  MessageSquare,
  Navigation,
  Phone,
  ShieldCheck,
  Smartphone,
  Wifi,
} from "lucide-react";

const typeIcons = {
  hotline: Phone,
  chat: MessageSquare,
  website: Globe,
  app: Smartphone,
  local: MapPin,
};

const categoryColors: Record<Resource["category"], string> = {
  crisis: "bg-red-50 text-red-700 border-red-100",
  counseling: "bg-sky-100 text-sky-800 border-sky-200",
  peer: "bg-mist text-sky-600 border-sky-200",
  education: "bg-card text-ink border-border",
  "self-care": "bg-sky-100 text-sky-600 border-sky-200",
};

const modalityLabel: Record<Resource["modality"], string> = {
  "in-person": "In-person",
  virtual: "Virtual",
  both: "In-person & virtual",
};

function directionsUrl(resource: Resource): string | null {
  const query = resource.address ?? `${resource.city}${resource.zip ? " " + resource.zip : ""}`;
  if (!query || resource.modality === "virtual") return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

interface ResourceCardProps {
  resource: Resource;
  saved?: boolean;
  saving?: boolean;
  onToggleSave?: (id: string) => void;
  className?: string;
}

export function ResourceCard({
  resource,
  saved = false,
  saving = false,
  onToggleSave,
  className,
}: ResourceCardProps) {
  const TypeIcon = typeIcons[resource.type];
  const directions = directionsUrl(resource);
  const distanceLabel =
    resource.distanceMiles !== null
      ? `${resource.distanceMiles} mi away`
      : resource.modality === "virtual"
        ? "Available online"
        : null;

  return (
    <Card hover className={cn("flex flex-col", className)}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
            <TypeIcon className="h-4 w-4 text-secondary-foreground" />
          </div>
          <span
            className={cn(
              "rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
              categoryColors[resource.category]
            )}
          >
            {resource.category.replace("-", " ")}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-medium text-muted">
            <Wifi className="h-3 w-3" />
            {modalityLabel[resource.modality]}
          </span>
        </div>
        {onToggleSave && (
          <button
            type="button"
            onClick={() => onToggleSave(resource.id)}
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

      <h2 className="mb-2 text-base font-semibold text-foreground">
        {resource.title}
      </h2>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
        {resource.description}
      </p>

      <div className="mb-4 space-y-1.5 text-xs text-muted">
        {distanceLabel && (
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span>
              {distanceLabel}
              {resource.city !== "National (US)" && ` · ${resource.city}`}
            </span>
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <Languages className="h-3.5 w-3.5 shrink-0" />
          <span>{resource.languages.join(", ")}</span>
        </div>
        {resource.insuranceAccepted && (
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
            <span>Insurance accepted</span>
          </div>
        )}
      </div>

      <div className="mb-4 flex flex-wrap gap-2 text-xs text-muted">
        <span className="rounded-md bg-background px-2 py-1">
          {resource.availability}
        </span>
        <span className="rounded-md bg-background px-2 py-1">
          {resource.cost}
        </span>
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {resource.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-background px-2 py-0.5 text-xs text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {resource.phone && (
          <Button variant="outline" size="sm" href={`tel:${resource.phone}`}>
            <Phone className="h-3.5 w-3.5" />
            {resource.phone}
          </Button>
        )}
        {resource.url && (
          <Button variant="outline" size="sm" href={resource.url}>
            {resource.type === "hotline" ? "Call now" : "Visit website"}
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        )}
        {directions && (
          <Button variant="outline" size="sm" href={directions}>
            <Navigation className="h-3.5 w-3.5" />
            Directions
          </Button>
        )}
      </div>

      <p className="mt-auto text-xs text-muted/80">
        Last verified {resource.lastVerified} · sample data
      </p>
    </Card>
  );
}
