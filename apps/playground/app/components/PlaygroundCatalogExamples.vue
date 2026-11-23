<script setup lang="ts">
import type { Component } from "vue";
import { arrangeCatalogExamples } from "~/data/catalog-example-sections";
import type { CatalogExample, CatalogExampleSection } from "~/data/catalog-guides";
import PlaygroundExampleSection from "./PlaygroundExampleSection.vue";

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
  groups: phase.groups.map(group => ({
    ...group,
    examples: group.examples.map(example => {
      const path = `./catalog/examples/${example.id}.vue`;
      const loadPreview = previews[path]!;
      return { ...example, loadPreview, source: sources[path]! };
    }),
  })),
}));

// Resolve preview modules before rendering so their teleports hydrate in document order.
const loadedPreviews = new Map(await Promise.all(
  phases.flatMap(phase => phase.groups.flatMap(group => group.examples))
    .filter((example) => !deferPreviews || example.framed)
    .map(async ({ id, loadPreview }) => [id, await loadPreview()] as const),
));
</script>

<template>
  <PlaygroundExampleSection v-for="phase in phases" :id="phase.id" :key="phase.id" :title="phase.title">
    <component
      :is="group.showHeading ? PlaygroundExampleSection : 'div'"
      v-for="group in phase.groups"
      :id="group.id"
      :key="group.id"
      v-bind="group.showHeading ? { title: group.title, headingLevel: 3 } : { class: 'playground-catalog-group-anchor' }"
    >
      <PlaygroundCatalogExample
        v-for="example in group.examples"
        :key="example.id"
        :example="{ id: example.id, title: example.title, description: example.description, source: example.source, wide }"
        :framed="example.framed"
        :load-preview="deferPreviews && !example.framed ? example.loadPreview : undefined"
        :preview="loadedPreviews.get(example.id)"
        :heading-level="group.showHeading ? 4 : 3"
      />
    </component>
  </PlaygroundExampleSection>
</template>

<style scoped>
.playground-catalog-group-anchor {
  scroll-margin-block-start: 2rem;
}
</style>
