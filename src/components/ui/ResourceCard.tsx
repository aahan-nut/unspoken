import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Resource } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  ExternalLink,
  Globe,
  MapPin,
  MessageSquare,
  Phone,
  Smartphone,
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
  counseling: "bg-sage-100 text-sage-800 border-sage-200",
  peer: "bg-warm-100 text-sage-600 border-warm-200",
  education: "bg-warm-200/60 text-warm-900 border-warm-200",
  "self-care": "bg-sage-100 text-sage-600 border-sage-200",
};

interface ResourceCardProps {
  resource: Resource;
  className?: string;
}

export function ResourceCard({ resource, className }: ResourceCardProps) {
  const TypeIcon = typeIcons[resource.type];

  return (
    <Card hover className={cn("flex flex-col", className)}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
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
        </div>
      </div>

      <h3 className="mb-2 text-base font-semibold text-foreground">
        {resource.title}
      </h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
        {resource.description}
      </p>

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

      {resource.url && (
        <Button
          variant="outline"
          size="sm"
          href={resource.url}
          className="w-full"
        >
          {resource.type === "hotline" ? "Call now" : "Visit resource"}
          <ExternalLink className="h-3.5 w-3.5" />
        </Button>
      )}
    </Card>
  );
}
