<script setup lang="ts">
import {
  UIButton,
  UIToast,
  UIToastClose,
  UIToastDescription,
  UIToastProvider,
  UIToastTitle,
  UIToastViewport,
} from "@connextable/ui";

let sequence = 0;
const notification = () => ({ id: `notice-${++sequence}`, title: "문서 저장 완료", description: "새 버전이 변경 내역에 추가됐습니다.", kind: "success" as const });

</script>

<template>
  <UIToastProvider :default-duration-ms="5000" :max-visible="3" :hotkey="false" close-label="저장 알림 닫기" v-slot="{ toasts, toast }">
    <UIButton @click="toast(notification())">알림 표시</UIButton>
    <UIToastViewport>
      <UIToast v-for="item in toasts" :key="item.id" :value="item.id">
        <div>
          <UIToastTitle />
          <UIToastDescription />
        </div>
        <UIToastClose>닫기</UIToastClose>
      </UIToast>
    </UIToastViewport>
  </UIToastProvider>
</template>
