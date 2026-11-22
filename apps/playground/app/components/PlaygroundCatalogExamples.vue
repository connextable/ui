<script setup lang="ts">
import type { Component } from "vue";
import type { CatalogExample, CatalogExampleSection } from "~/data/catalog-guides";

const { examples, groups, wide, deferPreviews } = defineProps<{
  examples: readonly CatalogExample[];
  groups?: readonly CatalogExampleSection[];
  wide?: boolean;
  deferPreviews?: boolean;
}>();

const previews = import.meta.glob<Component>("./catalog/examples/*.vue", { import: "default" });
const sources = import.meta.glob<string>("./catalog/examples/*.vue", { import: "default", query: "?example-code&raw" });

const defaults: readonly CatalogExampleSection[] = [
  { id: "examples", title: "동작별 예제", section: undefined },
  { id: "appearance", title: "모양", section: "appearance" },
  { id: "form", title: "폼", section: "form" },
];
const sections = (groups ?? defaults).map((group) => ({
  ...group,
  examples: examples.filter((example) => example.section === group.section).map((example) => {
    const path = `./catalog/examples/${example.id}.vue`;
    const loadPreview = previews[path]!;
    return { ...example, loadPreview, source: sources[path]! };
  }),
})).filter((group) => group.examples.length);

// Resolve preview modules before rendering so their teleports hydrate in document order.
const loadedPreviews = new Map(await Promise.all(
  sections.flatMap((section) => section.examples)
    .filter((example) => !deferPreviews || example.framed)
    .map(async ({ id, loadPreview }) => [id, await loadPreview()] as const),
));
</script>

<template>
  <PlaygroundExampleSection v-for="section in sections" :id="section.id" :key="section.id" :title="section.title">
    <PlaygroundCatalogExample
      v-for="example in section.examples"
      :key="example.id"
      :example="{ id: example.id, title: example.title, description: example.description, source: example.source, wide }"
      :framed="example.framed"
      :load-preview="deferPreviews && !example.framed ? example.loadPreview : undefined"
      :preview="loadedPreviews.get(example.id)"
    />
  </PlaygroundExampleSection>
</template>
