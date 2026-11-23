<script setup lang="ts">
import { ArrowRight } from "@lucide/vue";
import { computed } from "vue";
import { referenceBlocks, type ReferenceRow } from "~/data/catalog-reference";
import declarationLoaders from "virtual:public-component-api";

const props = defineProps<{
  component: string;
  parts: readonly ReferenceRow[];
  api: readonly ReferenceRow[];
  declaredParts?: readonly string[];
}>();
const declaredNames = computed(() => [...new Set([props.component, ...(props.declaredParts ?? []), ...props.parts.map(part => part.name)])]);
const { data: publicApi } = useAsyncData(`public-api:${useRoute().path}`, async () => {
  const names = new Set([...declaredNames.value, ...props.api.flatMap(entry => entry.owner ? [entry.owner] : [])]);
  const loaders = new Set([...names].flatMap(name => declarationLoaders[name] ?? []));
  const loaded = await Promise.all([...loaders].map(load => load()));
  return Object.fromEntries(loaded.flatMap(family => Object.entries(family).filter(([name]) => names.has(name))));
});
const declarations = computed(() => declaredNames.value.flatMap(name => {
  const members = publicApi.value?.[name];
  return members?.length ? [{ name, members }] : [];
}));
const documentedApi = computed(() => props.api.map(entry => {
  if (entry.type) return entry;
  const name = entry.name === "v-model" ? "model-value" : entry.name.replace(/^v-model:/, "");
  const declaration = publicApi.value?.[entry.owner ?? props.component]?.find(member => member.name === name);
  return declaration ? { ...entry, type: declaration.type } : entry;
}));
const sections = computed(() => [
  { id: "parts" as const, title: "구성 컴포넌트", entries: props.parts },
  { id: "api" as const, title: "주요 API", entries: documentedApi.value },
].filter(section => section.entries.length).map(section => ({
  ...section,
  blocks: referenceBlocks(section.entries, section.id, props.component),
})));

</script>

<template>
  <div v-if="sections.length" class="playground-reference">
    <PlaygroundExampleSection v-for="section in sections" :id="section.id" :key="section.id" :title="section.title">
      <div
        v-for="block in section.blocks"
        :key="block.id"
        class="playground-reference__block"
      >
        <section
          v-for="group in block.groups"
          :key="group.id"
          class="playground-reference__group"
          :aria-labelledby="`${section.id}-${group.id}`"
        >
          <h3
            :id="`${section.id}-${group.id}`"
            class="playground-reference__group-heading"
            data-playground-heading
            tabindex="-1"
          >{{ block.owner ? `${block.owner} · ${group.title}` : group.title }}</h3>
          <dl class="playground-reference__entries">
            <div v-for="entry in group.entries" :id="entry.anchor" :key="entry.name" :tabindex="entry.anchor ? -1 : undefined">
              <dt>
                <UIAnchor v-if="entry.route" :to="entry.route"><code>{{ entry.label ?? entry.name }}</code></UIAnchor>
                <code v-else>{{ entry.label ?? entry.name }}</code>
                <span v-if="entry.type" class="playground-reference__meta">
                  <span>타입</span><code>{{ entry.type }}</code>
                </span>
                <span v-if="entry.default" class="playground-reference__meta">
                  <span>기본값</span><code>{{ entry.default }}</code>
                </span>
              </dt>
              <dd>
                <p>{{ entry.description }}</p>
                <UIAnchor v-if="entry.example" class="playground-reference__example" :to="{ path: $route.path, hash: `#${entry.example.id}` }">
                  <span>{{ entry.example.title }} 예제</span><ArrowRight aria-hidden="true" />
                </UIAnchor>
              </dd>
            </div>
          </dl>
        </section>
      </div>
      <details v-if="section.id === 'api' && declarations.length" id="declared-api" class="playground-reference__declarations">
        <summary>전체 속성, 이벤트와 슬롯</summary>
        <div v-for="declaration in declarations" :key="declaration.name" :data-api-component="declaration.name">
          <h3><code>{{ declaration.name }}</code></h3>
          <dl>
            <div v-for="member in declaration.members" :key="member.name" :data-api-name="member.name">
              <dt><code>{{ member.name }}</code><small v-if="member.required">필수</small></dt>
              <dd><code>{{ member.type }}</code></dd>
            </div>
          </dl>
        </div>
      </details>
    </PlaygroundExampleSection>
  </div>
</template>

<style scoped>
.playground-reference {
  container: playground-reference / inline-size;
  min-inline-size: 0;
}

.playground-reference__declarations {
  margin-block-start: var(--ui-space-lg);
  border: 1px solid var(--ui-color-border);
  border-radius: var(--ui-radius-md);
  padding: var(--ui-space-sm) var(--ui-space-md);
}

.playground-reference__declarations summary { cursor: pointer; font-weight: 600; }
.playground-reference__declarations h3 { font-size: var(--ui-font-size-body); overflow-wrap: anywhere; }
.playground-reference__declarations dl > div {
  display: grid;
  grid-template-columns: minmax(8rem, 1fr) minmax(0, 2fr);
  gap: var(--ui-space-sm);
  border-block-start: 1px solid var(--ui-color-border);
  padding-block: var(--ui-space-xs);
  overflow-wrap: anywhere;
  font-size: var(--ui-font-size-body-sm);
}
.playground-reference__declarations :is(dd, dt) { margin: 0; }
.playground-reference__declarations small { margin-inline-start: var(--ui-space-xs); }

.playground-reference__block + .playground-reference__block {
  margin-block-start: 2.5rem;
}

.playground-reference__group {
  border: 1px solid var(--ui-color-border);
  border-radius: var(--ui-radius-md);
}

.playground-reference__group + .playground-reference__group {
  margin-block-start: var(--ui-space-md);
}

.playground-reference__group-heading {
  margin: 0;
  padding: var(--ui-space-sm) 1rem;
  border-block-end: 1px solid var(--ui-color-divider);
  border-start-start-radius: calc(var(--ui-radius-md) - 1px);
  border-start-end-radius: calc(var(--ui-radius-md) - 1px);
  background: var(--ui-color-surface-muted);
  color: var(--ui-color-text);
  font-size: 0.9375rem;
  font-weight: 700;
  overflow-wrap: anywhere;
}

.playground-reference__entries {
  margin: 0;
}

.playground-reference__entries > div {
  display: grid;
  grid-template-columns: minmax(0, min(15rem, 34%)) minmax(0, 1fr);
  gap: var(--ui-space-sm) 1.25rem;
  align-items: start;
  padding: var(--ui-space-md) 1rem;
  overflow-wrap: anywhere;
}

.playground-reference__entries > div + div {
  border-block-start: 1px solid var(--ui-color-divider);
}

.playground-reference__entries > div:target {
  background: var(--ui-color-accent-soft);
}

.playground-reference__entries > div:focus-visible {
  outline: var(--ui-focus-ring-width) solid var(--ui-color-focus);
  outline-offset: var(--ui-focus-ring-offset);
}

.playground-reference__entries dt > code,
.playground-reference__entries dt a > code {
  color: var(--ui-color-accent);
  font-weight: 700;
}

.playground-reference__entries code {
  font-family: var(--ui-font-mono);
  font-size: var(--ui-font-size-body-sm);
}

.playground-reference__entries dd,
.playground-reference__entries p {
  margin: 0;
}

.playground-reference__entries dd {
  color: var(--ui-color-text);
  font-size: var(--ui-font-size-body);
  line-height: 1.55;
  word-break: keep-all;
}

.playground-reference__meta {
  display: grid;
  grid-template-columns: 2.75rem minmax(0, 1fr);
  gap: var(--ui-space-xs);
  align-items: baseline;
  margin-block-start: var(--ui-space-2xs);
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-metadata);
}

.playground-reference__meta code {
  color: var(--ui-color-text);
  font-size: inherit;
}

.playground-reference__example {
  display: inline-flex;
  align-items: center;
  gap: var(--ui-space-xs);
  max-inline-size: 100%;
  margin-block-start: var(--ui-space-xs);
  font-size: var(--ui-font-size-body-sm);
}

.playground-reference__example svg {
  flex: none;
}

@container playground-reference (width < 34rem) {
  .playground-reference__entries > div {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
