import { AppShell } from "@/components/layout/AppShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import { SignupForm } from "@/components/auth/SignupForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create an account to save resources and track your notes.",
};

export default function SignupPage() {
  return (
    <AppShell>
      <PageContainer narrow>
        <div className="mx-auto max-w-sm">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
              Create an account
            </h1>
            <p className="mt-2 text-muted">
              Save resources, track their status, and keep private notes.
            </p>
          </div>
          <Card padding="lg">
            <SignupForm />
          </Card>
        </div>
      </PageContainer>
    </AppShell>
  );
}
