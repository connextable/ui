<script setup lang="ts">
import type { Component } from "vue";
import { catalog, catalogBySlug } from "~/data/catalog";
import { catalogGuides } from "~/data/catalog-guides";
import { describeCatalogPart } from "~/data/catalog-parts";

definePageMeta({
  key: (route) => String(route.params.name),
  validate: (route) => catalogBySlug.has(String(route.params.name)),
});

const previews = import.meta.glob<Component>(
  "../../components/catalog/*.vue",
  { import: "default" },
);
const sources = import.meta.glob<string>(
  "../../components/catalog/*.vue",
  { import: "default", query: "?example-code&raw" },
);
const route = useRoute();
const entry = catalogBySlug.get(String(route.params.name))!;
const guide = catalogGuides[entry.slug];
const path = `../../components/catalog/${entry.slug}.vue`;
const Preview = await previews[path]!();
const source = sources[path]!;
const parts = (entry.parts ?? []).map((name) => {
  const related = catalog.find((component) => component.title === name);
  const example = guide?.examples?.find((scenario) => scenario.parts?.includes(name));
  return { name, related, example, description: related?.description ?? describeCatalogPart(name) };
});
</script>

<template>
  <div class="catalog-document">
    <PlaygroundExampleSection id="usage" title="기본 사용법">
      <PlaygroundExample
        id="basic-example"
        :title="guide?.title ?? entry.title"
        :description="guide?.description"
        :source="source"
        :wide="entry.wide"
        :heading-level="3"
      >
        <Preview />
      </PlaygroundExample>
    </PlaygroundExampleSection>
    <PlaygroundCatalogExamples
      v-if="guide?.examples?.length"
      :examples="guide.examples"
      :groups="guide.sections"
      :wide="entry.wide"
      :defer-previews="entry.deferPreviews"
    />
    <section v-if="parts.length" class="catalog-section" aria-labelledby="parts">
      <h2 id="parts" class="catalog-heading" data-playground-heading tabindex="-1">구성 컴포넌트</h2>
      <dl class="catalog-reference">
        <div v-for="part in parts" :id="part.name" :key="part.name" class="catalog-reference__part" tabindex="-1">
          <dt>
            <NuxtLink v-if="part.related" :to="`/components/${part.related.slug}`"><code>{{ part.name }}</code></NuxtLink>
            <code v-else>{{ part.name }}</code>
          </dt>
          <dd v-if="part.description || part.example">
            {{ part.description }}
            <NuxtLink v-if="part.example" class="catalog-reference__example" :to="{ path: route.path, hash: `#${part.example.id}` }">
              {{ part.example.title }} 예제
            </NuxtLink>
          </dd>
        </div>
      </dl>
    </section>
    <section v-if="guide?.api" class="catalog-section" aria-labelledby="api">
      <h2 id="api" class="catalog-heading" data-playground-heading tabindex="-1">주요 API</h2>
      <dl class="catalog-reference">
        <div v-for="(description, name) in guide.api" :key="name">
          <dt><code>{{ name }}</code></dt>
          <dd>{{ description }}</dd>
        </div>
      </dl>
    </section>
  </div>
</template>

<style scoped>
.catalog-document {
  container: catalog-document / inline-size;
  min-inline-size: 0;
}

.catalog-section + .catalog-section {
  margin-block-start: clamp(3rem, 6vw, 5rem);
}

.catalog-heading {
  margin: 0 0 calc(var(--ui-space-md) * 2);
  font-size: clamp(1.25rem, 2.5vw, 1.625rem);
  font-weight: 680;
  letter-spacing: -0.025em;
}

.catalog-reference {
  margin: 0;
  border-block-start: 1px solid var(--ui-color-divider);
}

.catalog-reference > div {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
  gap: var(--ui-space-xs) calc(var(--ui-space-md) * 2);
  padding-block: var(--ui-space-sm);
  border-block-end: 1px solid var(--ui-color-divider);
  overflow-wrap: anywhere;
}

.catalog-reference code {
  font-family: var(--ui-font-mono);
  font-size: var(--ui-font-size-body-sm);
  font-weight: 600;
}

.catalog-reference__part {
  scroll-margin-block-start: 2rem;
}

.catalog-reference__part:focus-visible {
  outline: var(--ui-focus-ring-width) solid var(--ui-color-focus);
  outline-offset: var(--ui-focus-ring-offset);
}

.catalog-reference dd {
  margin: 0;
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-body-sm);
  word-break: keep-all;
}

.catalog-reference a {
  color: var(--ui-color-accent);
  text-underline-offset: 0.15em;
}

.catalog-reference__example {
  display: block;
  margin-block-start: var(--ui-space-xs);
}

@container catalog-document (width < 30rem) {
  .catalog-reference > div {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
