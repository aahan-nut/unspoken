# Manual production test checklist

Run against the live Vercel deployment (not `localhost`) before calling a
release done. Use two separate test accounts (Account A / Account B) for the
account-isolation checks.

## Core pages
- [ ] Landing page (`/`) loads, no console errors
- [ ] Navigation: every navbar/footer link resolves, mobile menu opens/closes
- [ ] "Get Immediate Help" / crisis banner is visible from every major page

## Auth
- [ ] Signup with a real email → confirmation email arrives and its link points to the production domain (not `localhost`)
- [ ] Clicking the confirmation link successfully confirms the account
- [ ] Login with the confirmed account succeeds
- [ ] Login with a wrong password shows a clear error, not a raw Supabase error string
- [ ] Logout clears the session (protected pages redirect to `/login` afterward)
- [ ] **Password reset is not implemented in this app** — there is no "forgot password" flow to test; skip or flag if one is expected

## Protected routes
- [ ] Logged out: visiting `/saved` redirects to `/login?redirectedFrom=...`
- [ ] After logging in from that redirect, you land back on `/saved`

## AI features
- [ ] "Help Me Say It" generates a message for a normal (non-crisis) scenario
- [ ] Editing and copying the generated message both work
- [ ] Forcing a failure (e.g. temporarily bad network) shows the safe fallback message, not a raw error

## Safety routing
- [ ] Check-in with everyday stress (e.g. "stressed about an exam") → lands on `/support` with a generated, non-template-looking response
- [ ] Check-in with explicit crisis wording (e.g. "I want to kill myself") → redirects straight to `/crisis`, no intermediate support page
- [ ] `/crisis` shows 911/988 call-or-text actions and does not resemble a chatbot

## Location / resources
- [ ] "Use my location" with permission **accepted** returns real nearby listings labeled "Nearby listing"
- [ ] "Use my location" with permission **denied** shows a clear message and doesn't crash
- [ ] Manual ZIP search (e.g. `90703`) returns results
- [ ] Manual city search (e.g. `Austin, Texas`) returns results
- [ ] An invalid/nonsense location search shows a clean no-results or error state, not a raw API error

## Saved resources
- [ ] Saving a resource while logged in succeeds and appears on `/saved`
- [ ] Saving a live "Nearby listing" result works the same way
- [ ] Updating a saved resource's status and private note persists after a page refresh
- [ ] Removing a saved resource removes it from `/saved` and doesn't reappear on refresh
- [ ] Saving the same resource twice does not create a duplicate row

## Mobile & accessibility
- [ ] Test at a phone-width viewport: nav collapses to a menu, no horizontal scrolling, forms are usable
- [ ] Tab through the check-in flow using only the keyboard
- [ ] Run an automated accessibility scan (e.g. axe or Lighthouse) on `/`, `/check-in`, and `/resources` — no critical violations
- [ ] Color contrast is readable in both day and night theme

## API error states (simulate via DevTools network throttling/blocking, or by temporarily removing an env var in Preview)
- [ ] `GOOGLE_PLACES_API_KEY` missing/invalid → nearby search shows a friendly "not available" message, not a 500 stack trace
- [ ] `GEMINI_API_KEY` missing/invalid → message builder and check-in fall back to safe template responses
- [ ] Slow/offline network during check-in submission → a timeout message appears with a way to retry, not an infinite spinner
- [ ] Refreshing `/support` directly (no active check-in) shows the "No check-in found" empty state, not a crash

## Account isolation (Account A vs Account B)
- [ ] Account A saves 2–3 resources
- [ ] Log out, log in as Account B
- [ ] Account B's `/saved` page is empty (does not show Account A's saves)
- [ ] Account B cannot see Account A's private notes anywhere in the UI
- [ ] (Optional, technical) Using Account B's browser session, attempt a direct Supabase REST call for Account A's `saved_resources` row ID — should be rejected by RLS with no rows returned
