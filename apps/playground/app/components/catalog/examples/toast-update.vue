<script setup lang="ts">
import {
  UIButton, UISpinner, UIToast, UIToastClose, UIToastDescription, UIToastProvider, UIToastTitle, UIToastViewport,
  type UIToastProviderSlotProps,
} from "@connextable/ui";
import { CircleAlert, CircleCheck } from "@lucide/vue";
import { onBeforeUnmount, ref, shallowRef } from "vue";

type ToastInput = Parameters<UIToastProviderSlotProps["toast"]>[0];
const reportID = "report-update";
const notices = shallowRef<readonly ToastInput[]>([]);
const running = ref(false);
const status = ref("");
let timer: ReturnType<typeof setTimeout> | undefined;

function generate(toast: UIToastProviderSlotProps["toast"], update: UIToastProviderSlotProps["update"], retry = false) {
  const loading = { title: "정산 보고서 생성 중", description: "11월 주문 내역을 모으고 있습니다.", kind: "loading", durationMs: null };
  running.value = true;
  status.value = retry ? "다시 생성 중" : "생성 중";
  if (retry) update(reportID, loading);
  else toast({ id: reportID, ...loading });

  timer = setTimeout(() => {
    running.value = false;
    status.value = retry ? "보고서 생성 완료" : "생성 실패";
    if (!notices.value.some(({ id }) => id === reportID)) return;

    update(reportID, retry
      ? { title: "정산 보고서 생성 완료", description: "11월 주문 128건을 정리했습니다.", kind: "success", durationMs: 5000 }
      : { title: "정산 보고서를 생성하지 못했습니다", description: "보고서 서버 응답이 지연됐습니다. 다시 시도할 수 있습니다.", kind: "error" });
  }, 900);
}

onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <UIToastProvider v-model:toasts="notices" :hotkey="false" close-label="보고서 알림 닫기" v-slot="{ toasts, toast, update }">
    <div class="toast-job">
      <UIButton :disabled="running || notices.length > 0" @click="generate(toast, update)">보고서 생성</UIButton>
      <span v-if="status" class="toast-job__status">{{ status }}</span>
    </div>
    <UIToastViewport label="정산 보고서 알림">
      <UIToast v-for="item in toasts" :key="item.id" :value="item.id">
        <UISpinner v-if="item.kind === 'loading'" />
        <CircleAlert v-else-if="item.kind === 'error'" :size="17" aria-hidden="true" class="toast-job__error" />
        <CircleCheck v-else :size="17" aria-hidden="true" class="toast-job__success" />
        <div class="toast-job__body">
          <UIToastTitle />
          <UIToastDescription />
          <UIButton v-if="item.kind === 'error'" size="sm" variant="outline" @click="generate(toast, update, true)">다시 시도</UIButton>
        </div>
        <UIToastClose>닫기</UIToastClose>
      </UIToast>
    </UIToastViewport>
  </UIToastProvider>
</template>

<style scoped>
.toast-job { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ui-space-md); }
.toast-job__status { color: var(--ui-color-text-muted); font-size: var(--ui-font-size-body-sm); }
.toast-job__body { display: grid; justify-items: start; }
.toast-job__body :deep(.ui-button) { margin-block-start: var(--ui-space-sm); }
.toast-job__body + :deep([data-part="close"]) { align-self: start; }
.toast-job__error { color: var(--ui-color-danger); }
.toast-job__success { color: var(--ui-color-accent); }
</style>
