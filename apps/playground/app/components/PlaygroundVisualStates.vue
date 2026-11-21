<script setup lang="ts">
import { UIButton, UISelect } from "@connextable/ui";
import { computed, provide, ref, shallowReactive, useId, useTemplateRef } from "vue";
import { playgroundVisualStatesKey, type PlaygroundVisualExample } from "~/utils/playground-visual-states";

const { enabled } = defineProps<{ enabled: boolean }>();
const examples = shallowReactive(new Map<string, PlaygroundVisualExample>());
const open = ref(false);
const requestedId = ref<string | null>(null);
const target = useTemplateRef<HTMLElement>("target");
const panelId = useId();
const options = computed(() => [...examples.values()].map(({ id, title }) => ({ value: id, label: title })));
const selected = computed(() =>
  examples.get(requestedId.value ?? "") ?? examples.values().next().value,
);
const activeId = computed(() => open.value ? selected.value?.id ?? null : null);

function register(example: PlaygroundVisualExample) {
  examples.set(example.id, example);
  return () => {
    if (examples.get(example.id) === example) examples.delete(example.id);
  };
}

if (enabled) provide(playgroundVisualStatesKey, { activeId, target, register });
</script>

<template>
  <section v-if="enabled" class="playground-visual-states" aria-labelledby="visual-states">
    <div class="playground-visual-states__header">
      <h2 id="visual-states" data-playground-heading tabindex="-1">시각 상태</h2>
      <UIButton
        size="sm"
        variant="outline"
        :disabled="options.length === 0"
        :aria-expanded="open"
        :aria-controls="panelId"
        @click="open = !open"
      >{{ open ? "상태 보기 닫기" : "상태 보기" }}</UIButton>
    </div>
    <div v-show="open" :id="panelId" class="playground-visual-states__panel">
      <div v-if="open && selected" class="playground-visual-states__controls">
        <UISelect
          size="sm"
          aria-label="시각 상태 예제"
          :model-value="selected.id"
          :options="options"
          @update:model-value="requestedId = $event"
        />
        <p>예제를 고른 뒤 클릭하거나 Tab 키로 이동해 상태 차이를 확인하세요.</p>
        <p v-if="selected.description">{{ selected.description }}</p>
      </div>
      <div ref="target" class="playground-visual-states__preview" />
    </div>
  </section>
  <slot />
</template>

<style scoped>
.playground-visual-states {
  min-inline-size: 0;
  margin-block-end: clamp(2rem, 4vw, 3rem);
  border-block-end: 1px solid var(--ui-color-divider);
}

.playground-visual-states__header,
.playground-visual-states__controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--ui-space-sm) var(--ui-space-md);
  padding-block-end: var(--ui-space-md);
}

.playground-visual-states__header {
  justify-content: space-between;
}

.playground-visual-states h2 {
  margin: 0;
  font-size: clamp(1.25rem, 2.5vw, 1.625rem);
  font-weight: 680;
  letter-spacing: -0.025em;
}

.playground-visual-states__panel {
  padding-block-end: var(--ui-space-md);
}

.playground-visual-states__controls p {
  margin: 0;
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-body-sm);
}

.playground-visual-states__preview {
  --ui-form-max-inline-size: 26rem;

  display: grid;
  grid-template-columns: minmax(0, 1fr);
  justify-items: center;
  padding: var(--ui-space-sm);
  border: 1px solid var(--ui-color-border);
  border-radius: var(--ui-radius-md);
}

.playground-visual-states__preview > :deep(*) {
  grid-column: 1;
}

.playground-visual-states__preview > :deep(.playground-example__preview--wide) {
  inline-size: 100%;
}
</style>
