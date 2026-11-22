<script setup lang="ts">
import { computed } from "vue";
import { groupReferences, type ReferenceRow } from "~/data/catalog-reference";

const props = defineProps<{ parts: readonly ReferenceRow[]; api: readonly ReferenceRow[]; headingAnchors?: Record<string, string> }>();
const sections = computed(() => [
  { id: "parts", title: "구성 컴포넌트", groups: groupReferences(props.parts, "parts") },
  { id: "api", title: "주요 API", groups: groupReferences(props.api, "api") },
].filter(section => section.groups.length));
</script>

<template>
  <div v-if="sections.length" class="playground-reference">
    <PlaygroundExampleSection v-for="section in sections" :id="section.id" :key="section.id" :title="section.title">
      <div v-for="group in section.groups" :key="group.id" class="playground-reference__group">
        <h3 :id="headingAnchors?.[group.id] ?? `${section.id}-${group.id}`" class="playground-reference__group-heading" data-playground-heading tabindex="-1">{{ group.title }}</h3>
        <dl class="playground-reference__entries">
          <div v-for="entry in group.entries" :id="entry.anchor" :key="entry.name" :tabindex="entry.anchor ? -1 : undefined">
            <dt>
              <UIAnchor v-if="entry.route" :to="entry.route"><code>{{ entry.name }}</code></UIAnchor>
              <code v-else>{{ entry.name }}</code>
              <span v-if="entry.type" class="playground-reference__meta"><code>{{ entry.type }}</code></span>
              <span v-if="entry.default" class="playground-reference__meta">기본값 <code>{{ entry.default }}</code></span>
            </dt>
            <dd>
              <p>{{ entry.description }}</p>
              <UIAnchor v-if="entry.example" class="playground-reference__example" :to="{ path: $route.path, hash: `#${entry.example.id}` }">
                {{ entry.example.title }} 예제
              </UIAnchor>
            </dd>
          </div>
        </dl>
      </div>
    </PlaygroundExampleSection>
  </div>
</template>

<style scoped>
.playground-reference {
  container: playground-reference / inline-size;
  min-inline-size: 0;
}

.playground-reference__group + .playground-reference__group {
  margin-block-start: calc(var(--ui-space-md) * 2);
}

.playground-reference__group-heading {
  margin: 0 0 var(--ui-space-sm);
  font-size: var(--ui-font-size-body);
}

.playground-reference__entries {
  margin: 0;
  border-block-start: 1px solid var(--ui-color-divider);
}

.playground-reference__entries > div {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
  gap: var(--ui-space-xs) calc(var(--ui-space-md) * 2);
  padding-block: var(--ui-space-sm);
  border-block-end: 1px solid var(--ui-color-divider);
  overflow-wrap: anywhere;
}

.playground-reference__entries > div:focus-visible {
  outline: var(--ui-focus-ring-width) solid var(--ui-color-focus);
  outline-offset: var(--ui-focus-ring-offset);
}

.playground-reference__entries dt > code,
.playground-reference__entries dt a > code {
  font-weight: 600;
}

.playground-reference__entries code {
  font-family: var(--ui-font-mono);
  font-size: var(--ui-font-size-body-sm);
}

.playground-reference__entries dd,
.playground-reference__entries p {
  margin: 0;
}

.playground-reference__entries dd,
.playground-reference__meta {
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-body-sm);
  word-break: keep-all;
}

.playground-reference__meta,
.playground-reference__example {
  display: block;
  margin-block-start: var(--ui-space-2xs);
}

@container playground-reference (width < 30rem) {
  .playground-reference__entries > div {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
