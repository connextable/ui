import { fileURLToPath } from "node:url";
import { highlightExamples } from "./build/highlight-examples";

export default defineNuxtConfig({
  compatibilityDate: "2026-11-20",
  css: ["@connextable/ui/styles.css"],
  // Rebuild Vite's dependency graph when pnpm changes a workspace peer resolution.
  watch: [fileURLToPath(new URL("../../pnpm-lock.yaml", import.meta.url))],
  vite: {
    // Sectile form parts and controls must share the same Vue injection context.
    optimizeDeps: { exclude: ["@sectile/vue"] },
    plugins: [highlightExamples()],
  },
});
