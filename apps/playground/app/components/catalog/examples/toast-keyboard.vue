<script setup lang="ts">
import {
  UIButton, UICheckbox, UIToast, UIToastClose, UIToastProvider, UIToastTitle, UIToastViewport,
} from "@connextable/ui";
import { X } from "@lucide/vue";
import { ref } from "vue";

const closeOnEscape = ref(true);
let nextID = 0;
</script>

<template>
  <UIToastProvider :hotkey="['F9']" :dismiss-on-escape="closeOnEscape" :default-duration-ms="null"
    :max-visible="1" close-label="검토 알림 닫기" v-slot="{ toasts, toast }"
  >
    <div class="toast-shortcuts">
      <UIButton @click="toast({ id: `keyboard-${++nextID}`, title: '새 검토 요청이 도착했습니다' })">검토 알림 표시</UIButton>
      <UICheckbox v-model="closeOnEscape" label="Escape로 닫기" />
    </div>
    <UIToastViewport label="검토 알림">
      <UIToast v-for="item in toasts" :key="item.id" :value="item.id">
        <UIToastTitle />
        <UIToastClose><X :size="16" aria-hidden="true" /></UIToastClose>
      </UIToast>
    </UIToastViewport>
  </UIToastProvider>
</template>

<style scoped>
.toast-shortcuts { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: var(--ui-space-md); }
</style>
