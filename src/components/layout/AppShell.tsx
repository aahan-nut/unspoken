import { CrisisBanner } from "@/components/ui/CrisisBanner";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import type { ReactNode } from "react";

interface AppShellProps {
  children: ReactNode;
  showCrisisBanner?: boolean;
}

export function AppShell({
  children,
  showCrisisBanner = true,
}: AppShellProps) {
  return (
    <>
      {showCrisisBanner && <CrisisBanner />}
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
