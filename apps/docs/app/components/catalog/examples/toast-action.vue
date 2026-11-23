<script setup lang="ts">
import {
  UIButton, UIToast, UIToastClose, UIToastDescription, UIToastProvider, UIToastTitle, UIToastViewport,
} from "@connextable/ui";
import { Archive } from "@lucide/vue";
import { nextTick, ref, useTemplateRef } from "vue";

const archived = ref(false);
const archiveButton = useTemplateRef<InstanceType<typeof UIButton>>("archiveButton");
let nextID = 0;

async function restore(id: string, dismiss: (id: string) => void) {
  archived.value = false;
  dismiss(id);
  await nextTick();
  archiveButton.value?.$el.focus();
}
</script>

<template>
  <UIToastProvider :hotkey="false" :max-visible="1" close-label="보관 알림 닫기" v-slot="{ toasts, toast, dismiss, dismissAll }">
    <div class="toast-document">
      <div>
        <strong>11월 정산 검토</strong>
        <div class="toast-document__location" role="status">{{ archived ? "보관함" : "작업 목록" }}</div>
      </div>
      <UIButton v-if="archived" size="sm" variant="outline" @click="archived = false; dismissAll()">복원하기</UIButton>
      <UIButton v-else ref="archiveButton" size="sm" variant="outline"
        @click="archived = true; toast({ id: `archive-${++nextID}`, title: '문서를 보관했습니다', description: '11월 정산 검토', durationMs: 10000 })"
      >
        <template #leading><Archive /></template>
        보관하기
      </UIButton>
    </div>
    <UIToastViewport label="문서 보관 알림">
      <UIToast v-for="item in toasts" :key="item.id" :value="item.id">
        <div class="toast-action">
          <UIToastTitle />
          <UIToastDescription />
          <UIButton size="sm" variant="outline" @click="restore(item.id, dismiss)">실행 취소</UIButton>
        </div>
        <UIToastClose>닫기</UIToastClose>
      </UIToast>
    </UIToastViewport>
  </UIToastProvider>
</template>

<style scoped>
.toast-document {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: var(--ui-space-sm);
  inline-size: min(100%, 25rem);
}

.toast-document__location {
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-body-sm);
}

.toast-action {
  display: grid;
  justify-items: start;
  gap: var(--ui-space-xs);
}

.toast-action :deep(.ui-button) {
  margin-block-start: var(--ui-space-xs);
}

.toast-action + :deep([data-part="close"]) { align-self: start; }
</style>
