import { Card } from "@/components/ui/Card";
import { ArrowRight, type LucideIcon } from "lucide-react";
import Link from "next/link";

interface ConditionCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export function ConditionCard({ title, description, href, icon: Icon }: ConditionCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <Card
        hover
        padding="lg"
        className="flex h-full flex-col transition-colors group-hover:border-primary/40"
      >
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
          <Icon className="h-6 w-6 text-secondary-foreground" aria-hidden="true" />
        </div>
        <h2 className="mb-2 text-xl font-semibold text-foreground">{title}</h2>
        <p className="mb-6 flex-1 text-sm leading-relaxed text-muted">{description}</p>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
          Explore {title} support
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </Card>
    </Link>
  );
}
