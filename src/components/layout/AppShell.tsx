import { CrisisBanner } from "@/components/ui/CrisisBanner";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { createClient } from "@/lib/supabase/server";
import type { ReactNode } from "react";

interface AppShellProps {
  children: ReactNode;
  showCrisisBanner?: boolean;
}

export async function AppShell({
  children,
  showCrisisBanner = true,
}: AppShellProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      {showCrisisBanner && <CrisisBanner />}
      <Navbar user={user ? { email: user.email ?? "" } : null} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
