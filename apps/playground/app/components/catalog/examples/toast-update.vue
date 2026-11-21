<script setup lang="ts">
import { UIButton, UIToast, UIToastClose, UIToastProvider, UIToastTitle, UIToastViewport } from "@connextable/ui";

const report = { id: "report-update", title: "보고서 생성 중", durationMs: null };
</script>

<template>
  <UIToastProvider v-slot="{ toasts, toast, update }">
    <UIButton :disabled="toasts.length > 0" @click="toast(report)">보고서 생성 시작</UIButton>
    <UIButton variant="outline" :disabled="!toasts.length" @click="update(report.id, { title: '보고서 생성 완료', kind: 'success' })">
      생성 완료 처리
    </UIButton>
    <UIToastViewport>
      <UIToast v-for="item in toasts" :key="item.id" :value="item.id">
        <UIToastTitle />
        <UIToastClose>닫기</UIToastClose>
      </UIToast>
    </UIToastViewport>
  </UIToastProvider>
</template>
