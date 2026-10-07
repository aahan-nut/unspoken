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
    <AppShell
      intro={{
        title: "Create an account",
        description: "Save resources, track their status, and keep private notes.",
      }}
    >
      <PageContainer narrow>
        <div className="mx-auto max-w-sm">
          <Card padding="lg">
            <SignupForm />
          </Card>
        </div>
      </PageContainer>
    </AppShell>
  );
}
