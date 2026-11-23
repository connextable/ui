<script setup lang="ts">
import type { Component } from "vue";
import { catalog, catalogBySlug } from "~/data/catalog";
import { catalogGuides } from "~/data/catalog-guides";
import { describeCatalogPart } from "~/data/catalog-parts";
import { helperGroup, stateApiNotes, type ReferenceRow } from "~/data/catalog-reference";
import referenceExamples from "virtual:catalog-reference-examples";

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
const [Preview, source] = await Promise.all([previews[path]!(), sources[path]!()]);
const links = referenceExamples[entry.slug] ?? {};
const stateNotes = stateApiNotes(entry.slug);
const notes = { ...guide?.api };
for (const [name, note] of Object.entries(stateNotes)) notes[name] ??= note;
const api: ReferenceRow[] = Object.entries(notes).map(([name, note]) => {
  const stateNote = stateNotes[name];
  return {
    name,
    example: links[name],
    ...(typeof stateNote === "object" ? stateNote : {}),
    ...(typeof note === "string" ? { description: note } : note),
  };
});
const parts: ReferenceRow[] = [];
for (const name of entry.parts ?? []) {
  const related = catalog.find((component) => component.title === name);
  const description = describeCatalogPart(name) ?? related?.description;
  if (!description) throw new Error(`Missing reference description for ${entry.slug} / ${name}`);
  const row = { name, description, anchor: name, route: related && `/components/${related.slug}`, example: links[name] };
  const group = helperGroup(name);
  if (!group) {
    const duplicate = api.findIndex(item => item.name === name);
    if (duplicate === -1) parts.push(row);
    else {
      const [note] = api.splice(duplicate, 1);
      parts.push({ ...row, ...note, example: note?.example ?? row.example });
    }
    continue;
  }
  const existing = api.find(item => item.name === name || item.name.startsWith(`${name}(`));
  if (existing) Object.assign(existing, { anchor: name, group, example: existing.example ?? row.example });
  else api.push({ ...row, group });
}
</script>

<template>
  <div class="catalog-document">
    <PlaygroundExampleSection id="usage" title="기본 사용법">
      <PlaygroundCatalogExample
        :example="{
          id: 'basic-example',
          title: guide?.title ?? entry.title,
          description: guide?.description,
          source,
          wide: entry.wide,
        }"
        :framed="guide?.framed"
        :preview="Preview"
      >
        <template v-if="entry.slug === 'window-splitter'" #default>
          <component :is="Preview">
            <template #source="{ filename, code }">
              <PlaygroundCodeBlock
                :code="code"
                :language="filename === 'App.vue' ? 'vue' : 'typescript'"
                :label="`${filename} 소스`"
              />
            </template>
          </component>
        </template>
      </PlaygroundCatalogExample>
    </PlaygroundExampleSection>
    <PlaygroundCatalogExamples
      v-if="guide?.examples?.length"
      :examples="guide.examples"
      :groups="guide.sections"
      :wide="entry.wide"
      :tall-previews="entry.tallPreviews"
    />
    <PlaygroundReference :component="entry.title" :parts="parts" :api="api" :declared-parts="entry.parts" />
  </div>
</template>

<style scoped>
.catalog-document {
  container: catalog-document / inline-size;
  min-inline-size: 0;
}

</style>
