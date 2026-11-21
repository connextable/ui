<script setup lang="ts">
import {
  UIButton,
  UIToast,
  UIToastClose,
  UIToastProvider,
  UIToastTitle,
  UIToastViewport,
} from "@connextable/ui";

const durations = [
  { label: "2초", title: "클립보드에 복사했습니다", durationMs: 2000 },
  { label: "8초", title: "변경사항을 저장했습니다", durationMs: 8000 },
  { label: "직접 닫기", title: "검토가 필요한 변경사항이 있습니다", durationMs: null },
];
let sequence = 0;

</script>

<template>
  <UIToastProvider :hotkey="false" :max-visible="1" close-label="알림 닫기" v-slot="{ toasts, toast }">
    <div class="toast-durations" role="group" aria-label="알림 표시 시간">
      <UIButton
        v-for="option in durations" :key="option.label" size="sm" variant="outline"
        @click="toast({ id: `duration-${++sequence}`, title: option.title, durationMs: option.durationMs })"
      >
        {{ option.label }}
      </UIButton>
    </div>
    <UIToastViewport label="표시 시간 비교 알림">
      <UIToast v-for="item in toasts" :key="item.id" :value="item.id">
        <UIToastTitle /><UIToastClose>닫기</UIToastClose>
      </UIToast>
    </UIToastViewport>
  </UIToastProvider>
</template>

<style scoped>
.toast-durations { display: flex; flex-wrap: wrap; gap: var(--ui-space-sm); }
</style>
