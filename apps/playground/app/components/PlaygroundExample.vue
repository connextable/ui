<script setup lang="ts">
import { UIDisclosure, UIDisclosureContent, UIDisclosureTrigger } from "@connextable/ui";
import { computed, ref } from "vue";
import PlaygroundCodeBlock from "./PlaygroundCodeBlock.vue";

const props = defineProps<{
  id: string;
  title: string;
  description?: string;
  source: string | (() => Promise<string>);
  wide?: boolean;
  headingLevel?: 2 | 3;
}>();

const hasOpenedCode = ref(false);
const loadedSource = ref<string>();
const sourceFailed = ref(false);
const renderedSource = computed(() => typeof props.source === "string" ? props.source : loadedSource.value);
let loadingSource = false;

async function revealSource(open: boolean) {
  if (!open) return;
  hasOpenedCode.value = true;
  if (typeof props.source === "string" || loadingSource || loadedSource.value !== undefined) return;

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
</script>

<template>
  <section class="playground-example" :aria-labelledby="id">
    <component
      :is="headingLevel === 3 ? 'h3' : 'h2'"
      :id="id"
      data-playground-heading
      tabindex="-1"
    >{{ title }}</component>
    <p v-if="description" class="playground-example__description">{{ description }}</p>
    <UIDisclosure
      class="playground-example__frame"
      variant="outline"
      :content-id="`${id}-source`"
      @update:model-value="revealSource"
      v-slot="{ open }"
    >
      <div class="playground-example__demo">
        <div class="playground-example__preview ui-field-layout" :class="{ 'playground-example__preview--wide': wide }">
          <slot />
        </div>
        <UIDisclosureTrigger
          class="playground-example__toggle"
          size="sm"
          variant="ghost"
          :aria-label="`${title} 코드 ${open ? '접기' : '보기'}`"
        >
          {{ open ? "코드 접기" : "코드 보기" }}
        </UIDisclosureTrigger>
      </div>
      <UIDisclosureContent divided flush role="region" :aria-label="`${title} Vue 코드`">
        <PlaygroundCodeBlock v-if="hasOpenedCode && renderedSource">
          <div v-html="renderedSource" />
        </PlaygroundCodeBlock>
        <p v-else-if="hasOpenedCode" class="playground-example__source-status" role="status">
          {{ sourceFailed ? "코드를 불러오지 못했습니다. 코드를 다시 열어 주세요." : "코드를 불러오는 중입니다." }}
        </p>
      </UIDisclosureContent>
    </UIDisclosure>
  </section>
</template>

<style scoped>
.playground-example {
  container: playground-example / inline-size;
  min-inline-size: 0;
  margin-block-end: 3rem;
}

.playground-example > :is(h2, h3, p) {
  margin: 0;
}

.playground-example :is(h2, h3) {
  font-size: clamp(1.25rem, 2.5vw, 1.625rem);
  font-weight: 680;
  letter-spacing: -0.025em;
  overflow-wrap: anywhere;
}

.playground-example h3 {
  font-size: clamp(1.125rem, 2vw, 1.375rem);
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

.playground-example__demo {
  --ui-form-max-inline-size: 26rem;

  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: flex-end;
  gap: var(--ui-space-xs) var(--ui-space-md);
  padding: var(--ui-space-sm);
}

.playground-example__preview {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  flex: 1 1 var(--playground-preview-inline-size, max-content);
  grid-column: 2;
  justify-items: center;
  box-sizing: border-box;
  inline-size: var(--playground-preview-inline-size, auto);
  min-inline-size: 0;
  max-inline-size: min(100%, var(--playground-preview-inline-size, 100%));
  padding: var(--ui-space-md) clamp(var(--ui-space-xs), 1vw, var(--ui-space-md));
}

.playground-example__preview--wide {
  flex-basis: min(100%, 42rem);
  justify-items: stretch;
}

.playground-example__preview > :deep(*) {
  max-inline-size: 100%;
}

.playground-example__toggle {
  flex: none;
  grid-column: 3;
  justify-self: end;
  white-space: nowrap;
}

@container playground-example (inline-size >= 36rem) {
  .playground-example__demo:not(:has(.playground-example__preview--wide)) {
    display: grid;
    grid-template-columns: 1fr minmax(0, max-content) minmax(max-content, 1fr);
  }
}
</style>
