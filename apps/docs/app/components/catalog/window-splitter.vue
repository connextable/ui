<script setup lang="ts">
import { UIWindowSplitter } from "@connextable/ui";

import { ref } from "vue";

const size = ref("34");
const sources = {
  "App.vue": `<script setup lang="ts">
const release = 'stable'
<\/script>

<template>
  <ReleaseCard :channel="release" />
</template>`,
  "tokens.ts": `export const tokens = {
  gap: '0.75rem',
  radius: '0.5rem',
}`,
};
const selected = ref<keyof typeof sources>("App.vue");
</script>

<template>
  <UIWindowSplitter v-model="size" class="split-example" orientation="horizontal" :min="22" :max="72" label="프로젝트와 편집기 너비 조정">
    <template #before>
      <header class="split-example__header"><strong>프로젝트</strong></header>
      <div class="split-example__files">
        <span class="split-example__folder">src</span>
        <button
          v-for="(_, file) in sources"
          :key="file"
          type="button"
          class="split-example__file"
          :aria-pressed="selected === file"
          @click="selected = file"
        >{{ file }}</button>
      </div>
    </template>
    <template #after>
      <header class="split-example__header"><strong>{{ selected }}</strong><small>읽기 전용</small></header>
      <slot name="source" :filename="selected" :code="sources[selected]">
        <pre tabindex="0" :aria-label="`${selected} 소스`"><code>{{ sources[selected] }}</code></pre>
      </slot>
    </template>
  </UIWindowSplitter>
</template>

<style scoped>
.split-example {
  inline-size: 100%;
  min-block-size: 13rem;
}

.split-example :deep([data-part="pane"]) {
  padding: 0;
}

.split-example__header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--ui-space-xs) var(--ui-space-sm);
  min-block-size: 2.75rem;
  padding: var(--ui-space-xs) var(--ui-space-md);
  border-block-end: 1px solid var(--ui-color-divider);
  font-size: var(--ui-font-size-body-sm);
  overflow-wrap: anywhere;
}

.split-example__header small,
.split-example__folder {
  color: var(--ui-color-text-muted);
}

.split-example__files {
  display: grid;
  gap: var(--ui-space-2xs);
  padding: var(--ui-space-sm);
}

.split-example__folder,
.split-example__file {
  padding: var(--ui-space-xs);
  border: 0;
  border-radius: var(--ui-radius-sm);
  background: transparent;
  font: inherit;
  font-size: var(--ui-font-size-body-sm);
  text-align: start;
  overflow-wrap: anywhere;
}

.split-example__file {
  padding-inline-start: var(--ui-space-sm);
  color: var(--ui-color-text);
  cursor: pointer;
}

.split-example__file[aria-pressed="true"] {
  background: var(--ui-color-accent-soft);
  color: var(--ui-color-accent);
}

.split-example__file:hover {
  background: var(--ui-color-surface-active);
}

.split-example pre {
  margin: 0;
  padding: var(--ui-space-md);
  font: 400 var(--ui-font-size-metadata)/1.65 var(--ui-font-mono);
}
</style>
