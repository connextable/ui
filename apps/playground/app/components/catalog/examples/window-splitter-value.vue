<script setup lang="ts">
import { UIWindowSplitter, UIWindowSplitterHandle, UIWindowSplitterPane } from "@connextable/ui";
import { GripVertical } from "@lucide/vue";
</script>

<template>
  <UIWindowSplitter class="report-preview" :min="28" :max="66" default-value="40" label="보고서 목록 너비 조절">
    <UIWindowSplitterPane side="before" class="report-pane">
      <strong>월별 보고서</strong>
      <ul class="report-list">
        <li aria-current="true">11월 정산 보고서</li>
        <li>10월 정산 보고서</li>
        <li>9월 정산 보고서</li>
      </ul>
    </UIWindowSplitterPane>
    <UIWindowSplitterHandle>
      <span class="split-handle" aria-hidden="true"><GripVertical :size="14" /></span>
    </UIWindowSplitterHandle>
    <UIWindowSplitterPane side="after" class="report-pane">
      <strong>11월 정산 보고서</strong>
      <p>거래 내역 128건을 정리했습니다. 카드 결제와 계좌 이체의 합계 및 환불 내역을 확인할 수 있습니다.</p>
    </UIWindowSplitterPane>
  </UIWindowSplitter>
</template>

<style scoped>
.report-preview {
  block-size: 12rem;
}

.report-pane {
  padding: var(--ui-space-md) calc(var(--ui-space-md) + 0.5rem);
  overflow-wrap: anywhere;
}

.report-list {
  display: grid;
  gap: var(--ui-space-xs);
  margin: var(--ui-space-sm) 0 0;
  padding: 0;
  list-style: none;
}

.report-list [aria-current="true"] {
  color: var(--ui-color-accent);
  font-weight: 650;
}

.report-pane p {
  margin: var(--ui-space-sm) 0 0;
  color: var(--ui-color-text-muted);
}

.split-handle {
  display: grid;
  place-items: center;
  inline-size: 1rem;
  block-size: 1.5rem;
  border: 1px solid var(--ui-color-divider);
  border-radius: var(--ui-radius-sm);
  background: var(--ui-color-surface);
  color: var(--ui-color-text-muted);
}
</style>
