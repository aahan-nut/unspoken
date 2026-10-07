import { AppShell } from "@/components/layout/AppShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <AppShell
      intro={{
        title: "Page not found",
        description:
          "The page you're looking for doesn't exist or may have been moved. Let's get you back on track.",
      }}
    >
      <PageContainer>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <Compass className="h-8 w-8 text-secondary-foreground" aria-hidden="true" />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/">Go home</Button>
            <Button variant="outline" href="/check-in">
              Start a check-in
            </Button>
          </div>
        </div>
      </PageContainer>
    </AppShell>
  );
}
