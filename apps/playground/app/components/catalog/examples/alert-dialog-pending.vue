<script setup lang="ts">
import {
  UIAlertDialog,
  UIAlertDialogClose,
  UIAlertDialogContent,
  UIAlertDialogDescription,
  UIAlertDialogOverlay,
  UIAlertDialogTitle,
  UIAlertDialogTrigger,
  UIButton,
} from "@connextable/ui";
import { ref } from "vue";

const open = ref(false);
const pending = ref(false);
const saved = ref(false);

async function confirm() {
  if (pending.value) return;
  pending.value = true;
  try {
    await new Promise<void>(resolve => setTimeout(resolve, 700));
    saved.value = true;
    open.value = false;
  } finally {
    pending.value = false;
  }
}
</script>

<template>
  <div>
    <UIAlertDialog v-model:open="open" :close-on-escape="!pending">
      <UIAlertDialogTrigger>검토 완료 처리</UIAlertDialogTrigger>
      <UIAlertDialogOverlay />
      <UIAlertDialogContent>
        <UIAlertDialogTitle>검토를 완료할까요?</UIAlertDialogTitle>
        <UIAlertDialogDescription>이 항목을 검토 완료 상태로 표시합니다.</UIAlertDialogDescription>
        <UIAlertDialogClose :disabled="pending">취소</UIAlertDialogClose>
        <UIButton :loading="pending" :disabled="pending" @click="confirm">완료 처리</UIButton>
      </UIAlertDialogContent>
    </UIAlertDialog>
    <output v-if="saved">검토를 완료했습니다.</output>
  </div>
</template>
