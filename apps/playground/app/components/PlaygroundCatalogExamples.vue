<script setup lang="ts">
import type { Component } from "vue";
import { arrangeCatalogExamples } from "~/data/catalog-example-sections";
import type { CatalogExample, CatalogExampleSection } from "~/data/catalog-guides";

const { examples, groups, wide, deferPreviews } = defineProps<{
  examples: readonly CatalogExample[];
  groups?: readonly CatalogExampleSection[];
  wide?: boolean;
  deferPreviews?: boolean;
}>();

const previews = import.meta.glob<Component>("./catalog/examples/*.vue", { import: "default" });
const sources = import.meta.glob<string>("./catalog/examples/*.vue", { import: "default", query: "?example-code&raw" });

const phases = arrangeCatalogExamples(examples, groups).map(phase => ({
  ...phase,
  examples: phase.examples.map(example => {
    const path = `./catalog/examples/${example.id}.vue`;
    const loadPreview = previews[path]!;
    return { ...example, loadPreview, source: sources[path]! };
  }),
}));

// Resolve preview modules before rendering so their teleports hydrate in document order.
const loadedPreviews = new Map(await Promise.all(
  phases.flatMap(phase => phase.examples)
    .filter((example) => !deferPreviews || example.framed)
    .map(async ({ id, loadPreview }) => [id, await loadPreview()] as const),
));
</script>

<template>
  <PlaygroundExampleSection v-for="phase in phases" :id="phase.id" :key="phase.id" :title="phase.title">
    <PlaygroundCatalogExample
      v-for="example in phase.examples"
      :key="example.id"
      :example="{ id: example.id, title: example.title, description: example.description, source: example.source, wide }"
      :framed="example.framed"
      :load-preview="deferPreviews && !example.framed ? example.loadPreview : undefined"
      :preview="loadedPreviews.get(example.id)"
    />
  </PlaygroundExampleSection>
</template>
