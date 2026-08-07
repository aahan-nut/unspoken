import Link from "next/link";

const footerLinks = {
  platform: [
    { href: "/check-in", label: "Check In" },
    { href: "/resources", label: "Resources" },
    { href: "/how-it-works", label: "How It Works" },
  ],
  safety: [
    { href: "/crisis", label: "Crisis Help" },
    { href: "tel:988", label: "988 Crisis Lifeline" },
    { href: "https://www.crisistextline.org", label: "Crisis Text Line" },
    { href: "tel:911", label: "Emergency (911)" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/privacy#safety", label: "Safety Information" },
    { href: "/privacy#prototype", label: "Data & Storage" },
  ],
};

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sage-600 to-sage-500">
                <span className="text-xs font-bold text-white">U</span>
              </div>
              <span className="font-semibold text-foreground">Unspoken</span>
            </div>
            <p className="text-sm leading-relaxed text-muted">
              A calm space to reflect, prepare, and find support — designed for
              teens and young adults.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Platform
            </h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Crisis & Safety
            </h3>
            <ul className="space-y-2">
              {footerLinks.safety.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                    {...(link.href.startsWith("http") && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Privacy & Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-xs leading-relaxed text-muted">
            Unspoken is not a substitute for professional mental health care,
            therapy, or emergency services. If you are in crisis, please contact
            the 988 Suicide & Crisis Lifeline or call 911.
          </p>
          <p className="mt-2 text-center text-xs text-muted/70">
            &copy; {new Date().getFullYear()} Unspoken. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
