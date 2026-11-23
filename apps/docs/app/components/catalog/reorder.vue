<script setup lang="ts">
import { UIReorderFeedback, UIReorderGroup, UISequenceReorder, UISequenceReorderItem } from "@connextable/ui";
import { ref } from "vue";

const durations: Record<string, number> = {
  "서비스 소개": 5,
  "신기능 시연": 15,
  "고객 사례 발표": 10,
  "질의응답": 15,
};
const items = ref<readonly string[]>(Object.keys(durations));
</script>

<template>
  <UISequenceReorder
    v-model:items="items"
    class="session-order"
    label="행사 프로그램 순서"
    keyboard-mode="preview"
    v-slot="{ interaction, getPreviewState }"
  >
    <UIReorderGroup
      as="ol"
      class="session-order__list"
      framed
      :interaction="interaction"
      :get-preview-state="getPreviewState"
    >
      <UISequenceReorderItem v-for="id in items" :key="id" :value="id" as="li">
        <strong>{{ id }}</strong>
        <span class="session-order__duration">{{ durations[id] }}분</span>
      </UISequenceReorderItem>
      <template #preview="{ id }">
        <strong>{{ id }}</strong>
        <span class="session-order__duration">{{ durations[id] }}분</span>
      </template>
    </UIReorderGroup>
    <UIReorderFeedback :interaction="interaction">
      <template #lift="{ id }">
        <strong>{{ id }}</strong>
        <span class="session-order__duration">{{ durations[id] }}분</span>
      </template>
    </UIReorderFeedback>
  </UISequenceReorder>
</template>

<style scoped>
.session-order {
  inline-size: min(100%, 30rem);
  margin-inline: auto;
}

.session-order :deep(.session-order__list) {
  counter-reset: session;
}

.session-order :deep(.session-order__list > li)::before {
  counter-increment: session;
  content: counter(session) / "";
  display: grid;
  flex: none;
  place-items: center;
  inline-size: 1.75rem;
  block-size: 1.75rem;
  border-radius: var(--ui-radius-sm);
  background: var(--ui-color-accent-soft);
  color: var(--ui-color-accent);
  font-size: var(--ui-font-size-body-sm);
  font-variant-numeric: tabular-nums;
}

.session-order__duration {
  flex: none;
  margin-inline-start: auto;
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-body-sm);
  font-variant-numeric: tabular-nums;
}
</style>
