// Test-only stand-in for the "server-only" package. Next.js's webpack build
// replaces "server-only" with a real guard (throws if bundled into a client
// component) or a no-op, depending on which bundle is being built — that
// special resolution doesn't exist under Vitest, so this vitest.config.mts
// alias points "server-only" here instead. It intentionally does nothing.
export {};
