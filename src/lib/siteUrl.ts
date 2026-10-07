/**
 * Canonical absolute site URL, for contexts that need one (auth email
 * redirects, metadataBase, etc.) rather than a relative path. Reads
 * NEXT_PUBLIC_SITE_URL and falls back to localhost in development so this
 * never needs a config change to work locally.
 *
 * Deliberately does NOT read request headers (e.g. Host/X-Forwarded-Host) —
 * those are client-supplied and unsuitable for building security-sensitive
 * redirect URLs. Set NEXT_PUBLIC_SITE_URL in Vercel instead.
 */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    return configured.replace(/\/+$/, "");
  }
  return "http://localhost:3000";
}

/** Joins a relative path onto the canonical site URL. */
export function absoluteUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}
