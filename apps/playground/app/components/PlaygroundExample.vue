<script setup lang="ts">
import { UIDisclosure, UIDisclosureContent, UIDisclosureTrigger } from "@connextable/ui";
import { computed, inject, onBeforeUnmount, ref, useTemplateRef, watch } from "vue";
import { playgroundPrimaryExampleKey } from "~/utils/playground-primary-example";
import { playgroundHeadingLevelKey } from "~/utils/playground-heading";
import PlaygroundCodeBlock from "./PlaygroundCodeBlock.vue";

const props = defineProps<{
  id: string;
  title: string;
  description?: string;
  source?: string | (() => Promise<string>);
  code?: string;
  wide?: boolean;
  inline?: boolean;
  headingLevel?: 2 | 3 | 4;
}>();

const primaryExample = inject(playgroundPrimaryExampleKey, undefined);
const parentLevel = inject(playgroundHeadingLevelKey, undefined);
const level = computed(() => Math.max(props.headingLevel ?? 2, (parentLevel?.value ?? 1) + 1));
const unregisterExample = primaryExample?.register(props.id);
const isPrimaryExample = computed(() => primaryExample?.id.value === props.id);
const preview = useTemplateRef<HTMLElement>("preview");
onBeforeUnmount(() => unregisterExample?.());

const codeOpen = ref(isPrimaryExample.value);
const hasOpenedCode = ref(false);
const loadedSource = ref<string>();
const sourceFailed = ref(false);
const renderedSource = computed(() => typeof props.source === "string" ? props.source : loadedSource.value);
let loadingSource = false;

async function revealSource(open: boolean) {
  if (!open) return;
  hasOpenedCode.value = true;
  if (typeof props.source !== "function" || loadingSource || loadedSource.value !== undefined) return;

  loadingSource = true;
  sourceFailed.value = false;
  try {
    loadedSource.value = await props.source();
  } catch {
    sourceFailed.value = true;
  } finally {
    loadingSource = false;
  }
}

watch(codeOpen, revealSource, { immediate: true });
</script>

<template>
  <section class="playground-example" :aria-labelledby="id">
    <component
      :is="`h${level}`"
      :id="id"
      data-playground-heading
      tabindex="-1"
    >{{ title }}</component>
    <p v-if="description" class="playground-example__description">{{ description }}</p>
    <UIDisclosure
      v-model="codeOpen"
      class="playground-example__frame"
      variant="outline"
      :content-id="`${id}-source`"
    >
      <header v-if="$slots.header" class="playground-example__header ui-field-layout">
        <slot name="header" />
      </header>
      <div
        ref="preview"
        class="playground-example__preview ui-field-layout"
        :class="{ 'playground-example__preview--wide': wide, 'playground-example__preview--inline': inline }"
      >
        <slot />
      </div>
      <footer v-if="$slots.footer" class="playground-example__footer">
        <slot name="footer" />
      </footer>
      <div class="playground-example__code-bar">
        <UIDisclosureTrigger
          class="playground-example__toggle"
          size="sm"
          variant="ghost"
          :aria-label="`${title} 코드 ${codeOpen ? '접기' : '보기'}`"
        >
          {{ codeOpen ? "코드 접기" : "코드 보기" }}
        </UIDisclosureTrigger>
      </div>
      <UIDisclosureContent
        divided flush role="region"
        :aria-label="`${title} Vue 코드`"
      >
        <PlaygroundCodeBlock v-if="hasOpenedCode && code !== undefined" :code="code" />
        <PlaygroundCodeBlock v-else-if="hasOpenedCode && renderedSource">
          <div v-html="renderedSource" />
        </PlaygroundCodeBlock>
        <p v-else-if="hasOpenedCode" class="playground-example__source-status" role="status">
          {{ sourceFailed ? "코드를 불러오지 못했습니다. 코드를 다시 열어 주세요." : "코드를 불러오는 중입니다." }}
        </p>
      </UIDisclosureContent>
    </UIDisclosure>
  </section>
  <PlaygroundVisualStates v-if="primaryExample?.visualStates && isPrimaryExample && preview" :source="preview" />
</template>

<style scoped>
.playground-example {
  container: playground-example / inline-size;
  min-inline-size: 0;
  margin-block-end: 3rem;
}

.playground-example > :is(h2, h3, h4, p) {
  margin: 0;
}

.playground-example > :is(h2, h3, h4) {
  font-size: clamp(1.25rem, 2.5vw, 1.625rem);
  font-weight: 680;
  letter-spacing: -0.025em;
  overflow-wrap: anywhere;
}

.playground-example > h3 {
  font-size: clamp(1.125rem, 2vw, 1.375rem);
}

.playground-example > h4 {
  font-size: clamp(1.0625rem, 1.6vw, 1.1875rem);
}

.playground-example .playground-example__description {
  margin-block-start: 0.625rem;
  color: var(--ui-color-text-muted);
  word-break: keep-all;
  overflow-wrap: anywhere;
}

.playground-example .playground-example__source-status {
  padding: var(--ui-space-sm) var(--ui-space-md);
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-body-sm);
}

.playground-example__frame {
  margin-block-start: 1rem;
}

.playground-example__preview {
  --ui-form-max-inline-size: 26rem;

  display: grid;
  grid-template-columns: minmax(0, 1fr);
  row-gap: var(--ui-space-md);
  justify-items: center;
  box-sizing: border-box;
  inline-size: 100%;
  min-inline-size: 0;
  max-inline-size: min(100%, var(--playground-preview-inline-size, 100%));
  margin-inline: auto;
  padding: calc(var(--ui-space-md) + var(--ui-space-sm)) var(--ui-space-md);
}

.playground-example__preview--wide {
  justify-items: stretch;
}

.playground-example__preview--inline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--ui-space-sm);
}

.playground-example__header,
.playground-example__footer {
  --ui-form-max-inline-size: 26rem;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--ui-space-sm) var(--ui-space-md);
  min-inline-size: 0;
  padding: var(--ui-space-sm) var(--ui-space-md);
}

.playground-example__header {
  border-block-end: 1px solid var(--ui-color-divider);
}

.playground-example__footer {
  border-block-start: 1px solid var(--ui-color-divider);
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-body-sm);
  line-height: var(--ui-line-height-body);
  overflow-wrap: anywhere;
}

.playground-example__preview > :deep(*) {
  max-inline-size: 100%;
}

.playground-example__code-bar {
  display: grid;
  border-block-start: 1px solid var(--ui-color-divider);
}

.playground-example__toggle {
  --ui-control-size-height: 1.75rem;
  --ui-control-size-padding-block: var(--ui-space-2xs);
  --ui-control-size-font: var(--ui-font-size-metadata);
  --ui-control-size-radius: 0;
  --ui-focus-ring-offset: calc(-1 * var(--ui-focus-ring-width));

  inline-size: 100%;
  white-space: nowrap;
}

.playground-example__toggle[aria-expanded="false"] {
  border-end-start-radius: calc(var(--ui-expandable-radius) - var(--ui-frame-border-width));
  border-end-end-radius: calc(var(--ui-expandable-radius) - var(--ui-frame-border-width));
}

.playground-example__toggle :deep(.ui-button__content) {
  inline-size: 100%;
  justify-content: space-between;
}

</style>
