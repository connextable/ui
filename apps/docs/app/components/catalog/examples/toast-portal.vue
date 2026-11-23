<script setup lang="ts">
import { UIButton, UIToast, UIToastClose, UIToastProvider, UIToastTitle, UIToastViewport, UIToastPortal } from "@connextable/ui";

let nextID = 0;
</script>

<template>
  <UIToastProvider :hotkey="false" close-label="포털 알림 닫기" v-slot="{ toasts, toast }">
    <UIButton @click="toast({ id: `portal-${++nextID}`, title: '작업이 저장됐습니다.' })">포털에 알림 표시</UIButton>
    <UIToastPortal>
      <UIToastViewport label="포털 알림">
        <UIToast v-for="item in toasts" :key="item.id" :value="item.id">
          <UIToastTitle />
          <UIToastClose>닫기</UIToastClose>
        </UIToast>
      </UIToastViewport>
    </UIToastPortal>
  </UIToastProvider>
</template>
