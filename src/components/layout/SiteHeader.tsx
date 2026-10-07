"use client";

import { panelGutterX } from "@/components/layout/surface";
import { logout } from "@/lib/supabase/actions";
import { cn } from "@/lib/utils";
import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/help-me-say-it", label: "Help Me Say It" },
  { href: "/parents", label: "Parent Support" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/saved", label: "Saved" },
];

const linkBase =
  "whitespace-nowrap uppercase tracking-[0.08em] text-[15px] text-white transition-opacity hover:opacity-75";

export interface SiteUser {
  email: string;
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function AccountLink({ user, className }: { user: SiteUser | null; className?: string }) {
  if (user) {
    return (
      <form action={logout} className={className}>
        <button type="submit" title={user.email} className={cn(linkBase, "cursor-pointer")}>
          Log out
        </button>
      </form>
    );
  }
  return (
    <Link href="/login" className={cn(linkBase, className)}>
      Log in
    </Link>
  );
}

/**
 * The Unspoken Hero header row. It sits on a gradient surface — the home hero or
 * the page header card in AppShell — so all text is white.
 */
export function SiteHeader({ user }: { user: SiteUser | null }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "relative z-20 flex items-center justify-between gap-5 pt-[clamp(24px,3.4vw,48px)]",
        panelGutterX
      )}
    >
      <Link
        href="/"
        className="text-[clamp(28px,3vw,44px)] font-medium leading-none tracking-[-0.02em] transition-opacity hover:opacity-75"
      >
        Unspoken
      </Link>

      <nav aria-label="Main navigation" className="hidden gap-[clamp(18px,1.9vw,36px)] xl:flex">
        {navLinks.map((link) => {
          const active = isActive(pathname, link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(linkBase, active && "underline decoration-white/70 underline-offset-8")}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-[clamp(12px,2vw,28px)]">
        <AccountLink user={user} className="hidden xl:block" />
        <Link
          href="/crisis"
          aria-label="Get immediate help — crisis support"
          className={cn(
            "flex items-center gap-2.5 rounded-full border border-white/85 bg-white/[0.08] px-[18px] py-3 sm:px-[22px] sm:py-3.5",
            linkBase
          )}
        >
          <Phone className="h-4 w-4 flex-none" strokeWidth={1.6} aria-hidden="true" />
          {/* Short label on phones, and where the full desktop nav would otherwise crowd it. */}
          <span className="hidden sm:inline xl:hidden min-[87.5rem]:inline" aria-hidden="true">
            Get Immediate Help
          </span>
          <span className="sm:hidden xl:inline min-[87.5rem]:hidden" aria-hidden="true">
            Get Help
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/60 transition-opacity hover:opacity-75 xl:hidden"
        >
          {menuOpen ? (
            <X className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
          )}
        </button>
      </div>

      {menuOpen && (
        <div id="site-menu" className={cn("absolute inset-x-0 top-full mt-4 xl:hidden", panelGutterX)}>
          <div className="rounded-2xl bg-ink/90 p-3 shadow-xl backdrop-blur-md">
            <nav aria-label="Main navigation" className="flex flex-col">
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      linkBase,
                      "rounded-xl px-4 py-3.5 hover:bg-white/10 hover:opacity-100",
                      active && "bg-white/10"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-2 border-t border-white/15 px-4 pb-2 pt-4">
              <AccountLink user={user} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
