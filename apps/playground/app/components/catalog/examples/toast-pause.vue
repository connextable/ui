<script setup lang="ts">
import { UIButton, UIToast, UIToastClose, UIToastProvider, UIToastTitle, UIToastViewport } from "@connextable/ui";

let nextID = 0;
</script>

<template>
  <UIToastProvider :default-duration-ms="5000" :hotkey="false" close-label="알림 닫기" pause-on-window-blur v-slot="{ toasts, paused, toast }">
    <UIButton @click="toast({ id: `pause-${++nextID}`, title: '브라우저에서 떠나면 알림을 잠시 멈춥니다.' })">5초 알림 표시</UIButton>
    <output v-if="toasts.length">{{ paused ? "자동 닫힘 일시 정지" : "자동 닫힘 진행 중" }}</output>
    <UIToastViewport label="자동 닫힘 예제 알림">
      <UIToast v-for="item in toasts" :key="item.id" :value="item.id">
        <UIToastTitle />
        <UIToastClose>닫기</UIToastClose>
      </UIToast>
    </UIToastViewport>
  </UIToastProvider>
</template>
