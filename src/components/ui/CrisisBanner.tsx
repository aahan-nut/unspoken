import { Button } from "@/components/ui/Button";
import { Phone } from "lucide-react";
import Link from "next/link";

export function CrisisBanner() {
  return (
    <div className="border-b border-red-100 bg-red-50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-3 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-center text-sm text-red-900 sm:text-left">
          <Link href="/crisis" className="font-medium underline underline-offset-2">
            In immediate danger or crisis?
          </Link>{" "}
          You deserve real-time support from trained professionals.
        </p>
        <Button
          variant="destructive"
          size="sm"
          href="tel:988"
          className="shrink-0"
        >
          <Phone className="h-4 w-4" />
          Call or text 988
        </Button>
      </div>
    </div>
  );
}
