<script setup lang="ts">
import { UIWindowSplitter, UIWindowSplitterHandle, UIWindowSplitterPane } from "@connextable/ui";
import { GripVertical } from "@lucide/vue";

function formatWidth(value: string) {
  return `탐색 영역 ${value}퍼센트`;
}
</script>

<template>
  <UIWindowSplitter :min="25" :max="60" :step="5" :default-value="40" :format-value="formatWidth" label="탐색 영역 너비">
    <UIWindowSplitterPane side="before">탐색</UIWindowSplitterPane>
    <UIWindowSplitterHandle>
      <span class="split-handle" aria-hidden="true"><GripVertical :size="16" /></span>
    </UIWindowSplitterHandle>
    <UIWindowSplitterPane side="after">본문</UIWindowSplitterPane>
  </UIWindowSplitter>
</template>

<style scoped>
.split-handle {
  display: grid;
  place-items: center;
  inline-size: 1.5rem;
  block-size: 2rem;
  border: 1px solid var(--ui-split-line-color);
  border-radius: var(--ui-radius-sm);
  background: var(--ui-color-surface);
}
</style>
