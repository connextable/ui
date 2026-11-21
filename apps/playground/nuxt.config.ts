import { fileURLToPath } from "node:url";
import { highlightExamples } from "./build/highlight-examples";
import { interactionStyles } from "./build/interaction-styles";

export default defineNuxtConfig({
  compatibilityDate: "2026-11-20",
  css: ["@connextable/ui/styles.css"],
  // Rebuild Vite's dependency graph when pnpm changes a workspace peer resolution.
  watch: [fileURLToPath(new URL("../../pnpm-lock.yaml", import.meta.url))],
  vite: {
    // Share Vue injection keys and the registry that issues temporal field formats.
    optimizeDeps: { exclude: ["@sectile/vue", "@sectile/temporal"] },
    plugins: [highlightExamples(), interactionStyles()],
  },
});
