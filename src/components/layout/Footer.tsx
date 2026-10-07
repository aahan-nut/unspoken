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

const headingClass = "mb-3 text-[13px] font-medium uppercase tracking-[0.08em] text-white/75";
const linkClass = "text-[15px] text-white transition-opacity hover:opacity-75";

/** Slate footer that continues the page frame. */
export function Footer() {
  return (
    <footer className="mt-auto bg-frame text-white">
      {/* Gutter = frame gap + panel gutter, so columns line up with panel content. */}
      <div className="px-[clamp(32px,7.6vw,132px)] pb-12 pt-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="mb-3 text-[28px] font-medium leading-none tracking-[-0.02em]">
              Unspoken
            </div>
            <p className="text-sm leading-relaxed text-white/75">
              A calm space to reflect, prepare, and find support — designed for
              teens and young adults.
            </p>
          </div>

          <div>
            <h3 className={headingClass}>Platform</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={headingClass}>Crisis & Safety</h3>
            <ul className="space-y-2">
              {footerLinks.safety.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={linkClass}
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
            <h3 className={headingClass}>Privacy & Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6">
          <p className="text-center text-xs leading-relaxed text-white/75">
            Unspoken is not a substitute for professional mental health care,
            therapy, or emergency services. If you are in crisis, please contact
            the 988 Suicide & Crisis Lifeline or call 911.
          </p>
          <p className="mt-2 text-center text-xs text-white/75">
            &copy; {new Date().getFullYear()} Unspoken. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
