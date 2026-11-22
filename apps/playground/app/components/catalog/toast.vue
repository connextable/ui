<script setup lang="ts">
import {
  UIButton,
  UIToast,
  UIToastProvider,
  UIToastViewport,
} from "@connextable/ui";
import { Save } from "@lucide/vue";

let sequence = 0;
const notification = () => ({ id: `notice-${++sequence}`, title: "변경사항 저장 완료", kind: "success" as const });
</script>

<template>
  <UIToastProvider :default-duration-ms="5000" :max-visible="3" close-label="알림 닫기" v-slot="{ toasts, toast }">
    <UIButton @click="toast(notification())">알림 표시</UIButton>
    <UIToastViewport>
      <UIToast v-for="item in toasts" :key="item.id" :value="item.id" :icon="Save" />
    </UIToastViewport>
  </UIToastProvider>
</template>
