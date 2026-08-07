"use client";

import { Button } from "@/components/ui/Button";
import { useTheme } from "@/components/theme/ThemeProvider";
import { logout } from "@/lib/supabase/actions";
import { cn } from "@/lib/utils";
import { LifeBuoy, Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isNight = theme === "night";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-lg p-2 text-muted transition-colors hover:bg-background hover:text-foreground"
      aria-label={isNight ? "Switch to day mode" : "Switch to night mode"}
    >
      {isNight ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

/** Persistent but low-key escape hatch to the crisis page — always visible, never hidden behind the mobile menu. */
function GetImmediateHelpLink() {
  return (
    <Link
      href="/crisis"
      aria-label="Get immediate help — crisis support"
      className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
    >
      <LifeBuoy className="h-3.5 w-3.5" aria-hidden="true" />
      <span className="hidden sm:inline" aria-hidden="true">Get Immediate Help</span>
      <span className="sm:hidden" aria-hidden="true">Help</span>
    </Link>
  );
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/help-me-say-it", label: "Help Me Say It" },
  { href: "/saved", label: "Saved" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/privacy", label: "Privacy" },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sage-600 to-sage-500 shadow-sm transition-shadow group-hover:shadow-md">
        <span className="text-sm font-bold text-white">U</span>
      </div>
      <span className="text-lg font-semibold tracking-tight text-foreground">
        Unspoken
      </span>
    </Link>
  );
}

interface NavbarUser {
  email: string;
}

interface NavbarProps {
  user: NavbarUser | null;
}

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Logo />

        <div className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
                pathname === link.href
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted hover:bg-background hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <GetImmediateHelpLink />
          <ThemeToggle />
          {user ? (
            <>
              <span
                className="max-w-[10rem] truncate text-sm text-muted"
                title={user.email}
              >
                {user.email}
              </span>
              <form action={logout}>
                <Button variant="ghost" size="sm" type="submit">
                  Log out
                </Button>
              </form>
            </>
          ) : (
            <Button variant="ghost" size="sm" href="/login">
              Log in
            </Button>
          )}
          <Button variant="ghost" size="sm" href="/resources">
            Find Support
          </Button>
          <Button size="sm" href="/check-in">
            Start a Check-In
          </Button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <GetImmediateHelpLink />
          <ThemeToggle />
          <button
            className="rounded-lg p-2 text-muted transition-colors hover:bg-background"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          id="mobile-nav-menu"
          className="border-t border-border bg-card px-4 py-4 lg:hidden"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                aria-current={pathname === link.href ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted hover:bg-background hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {user ? (
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="truncate text-sm text-muted" title={user.email}>
                {user.email}
              </span>
              <form action={logout}>
                <Button variant="ghost" size="sm" type="submit">
                  Log out
                </Button>
              </form>
            </div>
          ) : (
            <div className="mt-4 border-t border-border pt-4">
              <Button
                variant="outline"
                className="w-full"
                href="/login"
                onClick={() => setMobileOpen(false)}
              >
                Log in
              </Button>
            </div>
          )}

          <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
            <Button variant="outline" href="/resources">
              Find Support
            </Button>
            <Button href="/check-in">Start a Check-In</Button>
          </div>
        </div>
      )}
    </header>
  );
}
