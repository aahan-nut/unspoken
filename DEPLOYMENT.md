# Deploying Unspoken to Vercel

## 1. Push the project to GitHub

```bash
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

If the repo isn't on GitHub yet: create an empty repository on GitHub, then
`git remote add origin <repo-url>` and push. `.env.local` is git-ignored and
will not be pushed — this is correct and expected.

## 2. Import into Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import the GitHub repo.
2. Framework preset: Vercel auto-detects Next.js — no changes needed.
3. Build command / output directory: leave as the Next.js defaults.
4. Add the environment variables (below) **before** the first deploy, or the
   build will succeed but auth/AI/location features will fail at runtime.

## 3. Required environment variables

Names only — copy actual values from your own `.env.local` or the
Supabase/Google Cloud dashboards. Never commit real values.

| Variable | Public? | Where it's used |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Browser + server Supabase clients |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Browser + server Supabase clients (protected by RLS, not secrecy) |
| `NEXT_PUBLIC_SITE_URL` | Yes | Absolute URLs for auth email redirects and page metadata |
| `GEMINI_API_KEY` | **No — secret** | Server-only, `src/lib/ai/gemini.ts` |
| `GOOGLE_PLACES_API_KEY` | **No — secret** | Server-only, `src/lib/geo/places.ts` |

See `.env.example` for the exact names to paste into Vercel's environment
variable form.

### Production / Preview / Development

| Variable | Production | Preview | Development |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | ✅ | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | ✅ | ✅ |
| `NEXT_PUBLIC_SITE_URL` | your production domain | your preview domain (or leave unset — Vercel Preview URLs still work, just without a clean canonical URL) | not needed (falls back to `localhost:3000`) |
| `GEMINI_API_KEY` | ✅ | ✅ (or a separate low-quota key) | set in local `.env.local` |
| `GOOGLE_PLACES_API_KEY` | ✅ | ✅ (or a separate low-quota key) | set in local `.env.local` |

If you don't want Preview deployments spending your production AI/Places
quota, create separate API keys for Preview and use Vercel's per-environment
variable scoping (the "Environment" dropdown when adding a variable).

## 4. Trigger a redeployment

- **Automatic**: push a new commit to the branch connected to that
  environment (`main` → Production, any other branch/PR → Preview).
- **Manual, no code change**: Vercel dashboard → your project → **Deployments**
  tab → find the deployment you want to rebuild → **⋯** menu → **Redeploy**.
- Changing an environment variable does **not** automatically redeploy —
  redeploy manually after editing variables.

## 5. Find build logs

Vercel dashboard → your project → **Deployments** → click the deployment →
the build log streams automatically. Runtime logs (from API routes, e.g. the
`console.error` calls in this app) appear under the same deployment's
**Runtime Logs** tab, or via `vercel logs <deployment-url>` with the Vercel
CLI.

## 6. Roll back to an earlier deployment

Vercel dashboard → **Deployments** → find a previous, working deployment →
**⋯** menu → **Promote to Production**. This is instant and doesn't require a
new build or a code revert.

## 7. Test the deployed version

1. Open the production URL and confirm the landing page renders.
2. Sign up with a real, non-throwaway email address you can check — Supabase
   sends a confirmation email by default.
3. Confirm the email, then log in.
4. Run a check-in through to `/support` and confirm a generated (not just
   template) response appears for an everyday-stress scenario.
5. On `/resources`, try "Use my location" (must be served over HTTPS —
   Vercel does this automatically) and a manual ZIP/city search.
6. Save a resource while logged in, then confirm it appears on `/saved`.
7. Open browser DevTools → Network tab → confirm no request ever includes
   `GEMINI_API_KEY` or `GOOGLE_PLACES_API_KEY` in its URL, headers, or body.

See the full manual test checklist below for complete coverage.

## 8. Supabase settings that must be updated for production

In the Supabase dashboard → **Authentication** → **URL Configuration**:

- **Site URL**: set to your production domain (e.g.
  `https://your-app.vercel.app`), matching `NEXT_PUBLIC_SITE_URL`.
- **Redirect URLs**: add `https://your-app.vercel.app/login` (and your
  Preview domain(s) if you want email confirmation links to work from
  Preview deployments too). This app's signup flow passes
  `emailRedirectTo` explicitly (`src/lib/supabase/actions.ts`) — Supabase
  will only honor it if it's on this allow-list; otherwise it silently
  falls back to the Site URL.

Nothing else in Supabase needs to change — RLS policies, table schema, and
auth providers are unaffected by deployment target.

**Database migrations**: if you haven't already, run
`supabase/migrations/0001_init.sql` and
`supabase/migrations/0002_external_saved_resources.sql` in the Supabase SQL
Editor. This deployment pass did not add or change any SQL — see the
completion report for confirmation.

## 9. Google Cloud settings

Confirm the **Places API (New)** is enabled and billing is active on the
Google Cloud project tied to `GOOGLE_PLACES_API_KEY`, and that the key has no
HTTP-referrer restriction (it's called from Vercel's servers, not a browser,
so referrer/domain restrictions will block it — use IP or no restriction, or
an API-restriction limited to just "Places API (New)").

## 10. Common deployment problems and fixes

| Symptom | Likely cause | Fix |
|---|---|---|
| Build succeeds, but every page 500s | Missing `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Add them in Vercel → Settings → Environment Variables → redeploy |
| Login/signup redirects to the wrong domain, or confirmation emails link to `localhost` | `NEXT_PUBLIC_SITE_URL` not set, or Supabase Site URL/Redirect URLs still point at localhost | Set `NEXT_PUBLIC_SITE_URL` in Vercel; update Supabase URL Configuration (§8) |
| "Help Me Say It" or check-in always shows the fallback/template response | `GEMINI_API_KEY` missing, invalid, or the Gemini model was deprecated | Check Runtime Logs for the specific error; verify the key in Google AI Studio |
| Nearby resource search always fails or 503s | `GOOGLE_PLACES_API_KEY` missing, Places API (New) not enabled, or billing not active | Enable the API + billing in Google Cloud Console (§9) |
| Saved resources don't appear / RLS errors | Migrations not run, or logged in as a different Supabase project than expected | Run both migration files in the correct Supabase project's SQL Editor |
| CSP blocks something in the browser console | A new external asset/domain was added without updating `next.config.ts`'s CSP | Add the specific domain to the relevant CSP directive in `next.config.ts`, redeploy |
| Rate-limit (429) errors under normal use during testing | The in-memory rate limiters reset per server instance/restart and aren't shared across Vercel's serverless instances — fine for this project's scale, but bursts across multiple instances can behave unevenly | Expected for a small-scale deployment; upgrade to a shared store (e.g. Upstash Redis) only if traffic grows |
