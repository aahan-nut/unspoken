import { AppShell } from "@/components/layout/AppShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import { LoginForm } from "@/components/auth/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to manage your saved resources.",
};

interface LoginPageProps {
  searchParams: Promise<{ redirectedFrom?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { redirectedFrom } = await searchParams;

  return (
    <AppShell
      intro={{
        title: "Welcome back",
        description: "Log in to save resources and pick up where you left off.",
      }}
    >
      <PageContainer narrow>
        <div className="mx-auto max-w-sm">
          <Card padding="lg">
            <LoginForm redirectedFrom={redirectedFrom} />
          </Card>
        </div>
      </PageContainer>
    </AppShell>
  );
}
