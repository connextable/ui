<script setup lang="ts">
import {
  UIButton, UIToast, UIToastClose, UIToastDescription, UIToastProvider, UIToastTitle, UIToastViewport,
} from "@connextable/ui";
import { FileSpreadsheet } from "@lucide/vue";

const report = {
  file: "november-orders.csv",
  rows: 128,
  size: "24 KB",
};
let nextID = 0;
</script>

<template>
  <UIToastProvider :hotkey="false" :max-visible="1" close-label="내보내기 알림 닫기" v-slot="{ toasts, toast }">
    <UIButton @click="toast({ id: `export-summary-${++nextID}`, title: '주문 내보내기 완료', description: '선택한 주문을 CSV로 정리했습니다.', durationMs: 8000 })">
      내보내기 결과 미리 보기
    </UIButton>
    <UIToastViewport label="내보내기 결과 알림">
      <UIToast v-for="item in toasts" :key="item.id" :value="item.id">
        <div class="toast-report">
          <UIToastTitle />
          <UIToastDescription />
          <div class="toast-report__file">
            <FileSpreadsheet :size="17" aria-hidden="true" />
            <div>
              <strong>{{ report.file }}</strong>
              <div class="toast-report__meta">주문 {{ report.rows }}건 ({{ report.size }})</div>
            </div>
          </div>
        </div>
        <UIToastClose>닫기</UIToastClose>
      </UIToast>
    </UIToastViewport>
  </UIToastProvider>
</template>

<style scoped>
.toast-report {
  flex: 1 1 auto;
}

.toast-report__file {
  display: flex;
  align-items: center;
  gap: var(--ui-space-sm);
  margin-block-start: var(--ui-space-sm);
  padding: var(--ui-space-sm);
  border-radius: calc(var(--ui-radius-md) - var(--ui-space-xs) - var(--ui-space-2xs) - 1px);
  background: var(--ui-color-surface-muted);
  overflow-wrap: anywhere;
}

.toast-report__file svg { flex: none; color: var(--ui-color-accent); }
.toast-report__meta { font-size: var(--ui-font-size-metadata); color: var(--ui-color-text-muted); }
.toast-report + :deep([data-part="close"]) { align-self: start; }
</style>
