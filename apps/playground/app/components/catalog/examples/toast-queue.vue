<script setup lang="ts">
import {
  UIButton,
  UIToast,
  UIToastClose,
  UIToastProvider,
  UIToastTitle,
  UIToastViewport,
} from "@connextable/ui";

let sequence = 0;
const notification = () => ({ id: `notice-${++sequence}`, title: `처리 완료 ${sequence}건`, kind: "success" as const });

</script>

<template>
  <UIToastProvider :default-duration-ms="5000" :max-visible="2" v-slot="{ toasts, toast }">
    <UIButton @click="toast(notification())">알림 추가</UIButton>
    <UIToastViewport>
      <UIToast v-for="item in toasts" :key="item.id" :value="item.id">
        <UIToastTitle /><UIToastClose>Dismiss</UIToastClose>
      </UIToast>
    </UIToastViewport>
  </UIToastProvider>
</template>
