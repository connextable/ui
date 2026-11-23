<script setup lang="ts">
import { UIIconButton } from "@connextable/ui";
import { Check, Copy } from "@lucide/vue";
import { ref, shallowRef, useTemplateRef, watch } from "vue";

const props = defineProps<{ code?: string }>();
const highlighted = shallowRef<{ code: string; html: string }>();
const content = useTemplateRef<HTMLDivElement>("content");
const copyStatus = ref<"idle" | "copied" | "failed">("idle");

async function copyCode() {
  const source = props.code ?? content.value?.querySelector("pre code")?.textContent;
  if (source == null) return;
  try {
    await navigator.clipboard.writeText(source);
    copyStatus.value = "copied";
  } catch {
    copyStatus.value = "failed";
  }
}

watch(() => props.code, () => { copyStatus.value = "idle"; });

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
    <div ref="content" class="playground-code-block__content">
      <div v-if="highlighted && highlighted.code === code" v-html="highlighted.html" />
      <pre v-else-if="code !== undefined" tabindex="0"><code>{{ code }}</code></pre>
      <slot v-else />
    </div>
    <div class="playground-code-block__actions">
      <span role="status">{{ copyStatus === "copied" ? "복사됨" : copyStatus === "failed" ? "복사 실패" : "" }}</span>
      <UIIconButton
        class="playground-code-block__copy"
        aria-label="Vue 코드 복사"
        title="Vue 코드 복사"
        size="sm"
        variant="ghost"
        @click="copyCode"
      >
        <Check v-if="copyStatus === 'copied'" />
        <Copy v-else />
      </UIIconButton>
    </div>
  </div>
</template>

<style scoped>
.playground-code-block {
  position: relative;
}

.playground-code-block__actions {
  position: absolute;
  inset-block-start: var(--ui-space-xs);
  inset-inline-end: var(--ui-space-xs);
  display: flex;
  align-items: center;
  gap: var(--ui-space-xs);
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-metadata);
}

.playground-code-block__actions > .playground-code-block__copy[data-variant="ghost"] {
  --ui-button-hover: transparent;
  --ui-button-pressed: transparent;
}

.playground-code-block :deep(pre) {
  box-sizing: border-box;
  max-block-size: 20rem;
  margin: 0;
  overflow: auto;
  padding: 0.875rem 1rem;
  padding-inline-end: 3.25rem;
  color: var(--ui-color-text);
  font: var(--ui-font-size-metadata)/1.65 var(--ui-font-mono);
}

.playground-code-block :deep(pre:focus-visible) {
  outline: var(--ui-focus-ring-width) solid var(--ui-color-focus);
  outline-offset: var(--ui-focus-ring-offset);
}
</style>
