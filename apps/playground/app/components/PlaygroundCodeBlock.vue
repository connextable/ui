<script setup lang="ts">
import { shallowRef, watch } from "vue";

const props = defineProps<{ code?: string }>();
const highlighted = shallowRef<{ code: string; html: string }>();

if (import.meta.client) {
  watch(() => props.code, async (code, _, onCleanup) => {
    if (code === undefined) return;
    let current = true;
    onCleanup(() => { current = false; });
    try {
      const { highlightExampleCode } = await import("~/utils/highlight-example-code");
      const html = await highlightExampleCode(code);
      if (current) highlighted.value = { code, html };
    } catch {
      // The plain source stays available while highlighting is unavailable.
    }
  }, { immediate: true });
}
</script>

<template>
  <div class="playground-code-block">
    <div v-if="highlighted && highlighted.code === code" v-html="highlighted.html" />
    <pre v-else-if="code !== undefined" tabindex="0"><code>{{ code }}</code></pre>
    <slot v-else />
  </div>
</template>

<style scoped>
.playground-code-block :deep(pre) {
  box-sizing: border-box;
  max-block-size: 20rem;
  margin: 0;
  overflow: auto;
  padding: 0.875rem 1rem;
  color: var(--ui-color-text);
  font: var(--ui-font-size-metadata)/1.65 var(--ui-font-mono);
}

.playground-code-block :deep(pre:focus-visible) {
  outline: var(--ui-focus-ring-width) solid var(--ui-color-focus);
  outline-offset: var(--ui-focus-ring-offset);
}
</style>
