<script setup lang="ts">
import { UIButton, UIToast, UIToastProvider, UIToastViewport } from "@connextable/ui";
import { Download } from "@lucide/vue";

let sequence = 0;
</script>

<template>
  <UIToastProvider v-slot="{ toast, toasts }">
    <UIButton @click="toast({ id: String(++sequence), title: '보고서 내보내기 완료' })">완료 알림 표시</UIButton>
    <UIToastViewport>
      <UIToast v-for="item in toasts" :key="item.id" :value="item.id" :icon="Download" />
    </UIToastViewport>
  </UIToastProvider>
</template>
