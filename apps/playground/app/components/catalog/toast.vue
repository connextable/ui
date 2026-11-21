<script setup lang="ts">
import {
  UIButton,
  UIToast,
  UIToastClose,
  UIToastProvider,
  UIToastTitle,
  UIToastViewport,
} from "@connextable/ui";
import { CircleCheck, X } from "@lucide/vue";

let sequence = 0;
const notification = () => ({ id: `notice-${++sequence}`, title: "변경사항 저장 완료", kind: "success" as const });

</script>

<template>
  <UIToastProvider :default-duration-ms="5000" :max-visible="3" close-label="알림 닫기" v-slot="{ toasts, toast }">
    <UIButton @click="toast(notification())">알림 표시</UIButton>
    <UIToastViewport>
      <UIToast v-for="item in toasts" :key="item.id" :value="item.id">
        <CircleCheck :size="16" aria-hidden="true" class="notice-icon" />
        <UIToastTitle />
        <UIToastClose as-child>
          <UIButton size="sm" variant="ghost" icon-only aria-label="알림 닫기">
            <template #leading><X /></template>
          </UIButton>
        </UIToastClose>
      </UIToast>
    </UIToastViewport>
  </UIToastProvider>
</template>

<style scoped>
.notice-icon {
  flex: none;
  color: var(--ui-color-accent);
}

</style>
