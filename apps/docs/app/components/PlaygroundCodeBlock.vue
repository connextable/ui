<script setup lang="ts">
import { UICopyToClipboard, UIIconButton } from "@connextable/ui";
import { Check, Copy } from "@lucide/vue";
import { useId, useTemplateRef } from "vue";
import type { CodeLanguage } from "~/utils/highlight-example-code";

const props = withDefaults(defineProps<{
  code?: string;
  language?: CodeLanguage;
  label?: string;
  filename?: string;
}>(), { language: "vue" });
const content = useTemplateRef<HTMLDivElement>("content");
const getSource = () => content.value?.querySelector("pre code")?.textContent;

const { data: highlighted } = useAsyncData(
  `playground-code:${useId()}`,
  async () => {
    const { code, language } = props;
    if (code === undefined) return { code, language };
    try {
      const { highlightExampleCode } = await import("~/utils/highlight-example-code");
      return { code, language, html: await highlightExampleCode(code, language) };
    } catch {
      return { code, language };
    }
  },
  { immediate: props.code !== undefined, lazy: true, deep: false, watch: [() => props.code, () => props.language] },
);
</script>

<template>
  <div class="playground-code-block">
    <div v-if="filename" class="playground-code-block__filename"><code>{{ filename }}</code></div>
    <div
      ref="content"
      class="playground-code-block__content"
      :role="label || filename ? 'region' : undefined"
      :aria-label="label ?? filename"
    >
      <div v-if="highlighted?.html && highlighted.code === code && highlighted.language === language" v-html="highlighted.html" />
      <pre v-else-if="code !== undefined" tabindex="0"><code>{{ code }}</code></pre>
      <slot v-else />
    </div>
    <div class="playground-code-block__actions">
      <UICopyToClipboard :value="code ?? getSource" v-slot="{ status, pending, copied, copy }">
        <span role="status">{{ copied ? "복사됨" : status === "failed" ? "복사 실패" : "" }}</span>
        <UIIconButton
          class="playground-code-block__copy"
          aria-label="코드 복사"
          title="코드 복사"
          size="sm"
          variant="ghost"
          :loading="pending"
          @click="copy()"
        >
          <Check v-if="copied" />
          <Copy v-else />
        </UIIconButton>
      </UICopyToClipboard>
    </div>
  </div>
</template>

<style scoped>
.playground-code-block {
  position: relative;
}

.playground-code-block__filename {
  display: flex;
  align-items: center;
  min-block-size: 2.75rem;
  padding-inline: 1rem 3.25rem;
  border-block-end: 1px solid var(--ui-color-divider);
  color: var(--ui-color-text-muted);
  font: var(--ui-font-size-metadata)/1.65 var(--ui-font-mono);
  overflow-wrap: anywhere;
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
