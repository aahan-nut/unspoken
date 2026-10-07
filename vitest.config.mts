import { defineConfig } from "vitest/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(dirname, "./src"),
      // Next.js's webpack build resolves "server-only" specially; Vitest
      // doesn't, so point it at a no-op stub. See src/lib/testStubs/serverOnly.ts.
      "server-only": path.resolve(dirname, "./src/lib/testStubs/serverOnly.ts"),
    },
  },
});
