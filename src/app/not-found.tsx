import { AppShell } from "@/components/layout/AppShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <AppShell>
      <PageContainer>
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
            <Compass className="h-8 w-8 text-secondary-foreground" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground">
            Page not found
          </h1>
          <p className="mt-3 max-w-md text-muted">
            The page you&apos;re looking for doesn&apos;t exist or may have been
            moved. Let&apos;s get you back on track.
          </p>
          <div className="mt-8 flex gap-3">
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
