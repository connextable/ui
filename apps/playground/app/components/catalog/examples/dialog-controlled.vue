<script setup lang="ts">
import { UIButton, UIDialog, UIDialogClose, UIDialogContent, UIDialogDescription, UIDialogOverlay, UIDialogTitle } from "@connextable/ui";
import { ref, shallowRef } from "vue";

const open = ref(false);
const trigger = shallowRef<HTMLElement | null>(null);

function showDialog(event: MouseEvent) {
  trigger.value = event.currentTarget instanceof HTMLElement ? event.currentTarget : null;
  open.value = true;
}
</script>

<template>
  <UIButton aria-haspopup="dialog" :aria-expanded="open" @click="showDialog">배송 안내 열기</UIButton>
  <UIDialog v-model:open="open" :restore-focus-target="trigger">
    <UIDialogOverlay />
    <UIDialogContent>
      <UIDialogTitle>배송 안내</UIDialogTitle>
      <UIDialogDescription>출고 후 영업일 기준 1~2일 내에 도착합니다.</UIDialogDescription>
      <UIDialogClose>닫기</UIDialogClose>
    </UIDialogContent>
  </UIDialog>
</template>
