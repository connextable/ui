import { highlightExamples } from "./build/highlight-examples";

export default defineNuxtConfig({
  compatibilityDate: "2026-11-20",
  css: ["@connextable/ui/styles.css"],
  vite: { plugins: [highlightExamples()] },
});
