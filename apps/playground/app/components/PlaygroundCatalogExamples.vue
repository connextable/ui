<script setup lang="ts">
import { defineAsyncComponent, type Component } from "vue";
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
    return { ...example, loadPreview, preview: deferPreviews ? undefined : defineAsyncComponent(loadPreview), source: sources[path]! };
  }),
})).filter((group) => group.examples.length);
</script>

<template>
  <PlaygroundExampleSection v-for="section in sections" :id="section.id" :key="section.id" :title="section.title">
    <PlaygroundExample
      v-for="example in section.examples"
      :id="example.id"
      :key="example.id"
      :title="example.title"
      :description="example.description"
      :source="example.source"
      :wide="wide"
      :heading-level="3"
    >
      <PlaygroundDeferredPreview v-if="deferPreviews" :load="example.loadPreview" />
      <component :is="example.preview" v-else />
    </PlaygroundExample>
  </PlaygroundExampleSection>
</template>
