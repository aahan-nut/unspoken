import type { NextConfig } from "next";

// Supabase auth/REST calls happen from the browser client
// (src/lib/supabase/client.ts), so connect-src needs the Supabase API
// domain. Google Places and Gemini are called only from server routes
// (src/lib/geo/places.ts, src/lib/ai/gemini.ts) — never from the browser —
// so neither needs a CSP entry here.
//
// script-src/style-src include 'unsafe-inline': Next.js's App Router
// streams inline hydration scripts for Suspense boundaries, and
// ProgressIndicator.tsx sets an inline width style for the check-in
// progress bar. Tightening this further would need a per-request nonce
// wired through middleware — a reasonable future improvement, but more
// than this pass's scope.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "geolocation=(self), camera=(), microphone=()" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: CSP },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
