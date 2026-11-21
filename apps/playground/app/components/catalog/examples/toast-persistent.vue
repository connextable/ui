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
const notification = () => ({ id: `notice-${++sequence}`, title: "변경사항 저장 완료", kind: "success" as const });

</script>

<template>
  <UIToastProvider :default-duration-ms="null" v-slot="{ toasts, toast }">
    <UIButton @click="toast(notification())">알림 표시</UIButton>
    <UIToastViewport>
      <UIToast v-for="item in toasts" :key="item.id" :value="item.id">
        <UIToastTitle /><UIToastClose>닫기</UIToastClose>
      </UIToast>
    </UIToastViewport>
  </UIToastProvider>
</template>
