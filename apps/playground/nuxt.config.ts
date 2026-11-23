import { fileURLToPath } from "node:url";
import { highlightExamples } from "./build/highlight-examples";
import { interactionStyles } from "./build/interaction-styles";
import { catalogReferenceExamples } from "./build/catalog-reference-examples";
import { publicComponentApi } from "./build/public-component-api";

export default defineNuxtConfig({
  compatibilityDate: "2026-11-20",
  modules: ["@connextable/ui/nuxt"],
  watch: [
    // Changes to config-time catalog data need to reload the reference generator.
    ...["catalog", "catalog-guides", "catalog-reference", "catalog-example-sections"].map(file =>
      fileURLToPath(new URL(`./app/data/${file}.ts`, import.meta.url))),
    fileURLToPath(new URL("../../pnpm-lock.yaml", import.meta.url)),
  ],
  vite: {
    // Share Vue injection keys and the registry that issues temporal field formats.
    optimizeDeps: { exclude: ["@sectile/vue", "@sectile/temporal"] },
    plugins: [highlightExamples(), interactionStyles(), catalogReferenceExamples(), publicComponentApi()],
  },
});
