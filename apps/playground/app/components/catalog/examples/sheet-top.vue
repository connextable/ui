<script setup lang="ts">
import { UIButton, UIFormActions, UISheet, UISheetClose, UISheetContent, UISheetDescription, UISheetHandle, UISheetOverlay, UISheetTitle, UISheetTrigger } from "@connextable/ui";
import { ref } from "vue";

const read = ref(false);
</script>

<template>
  <UISheet side="top">
    <UISheetTrigger as-child><UIButton variant="outline">{{ read ? "확인한 공지 보기" : "점검 공지 보기" }}</UIButton></UISheetTrigger>
    <UISheetOverlay />
    <UISheetContent width="32rem">
      <UISheetTitle>정산 화면 점검</UISheetTitle>
      <UISheetDescription>11월 24일 오전 2시부터 30분 동안 정산 내역을 조회할 수 없습니다.</UISheetDescription>
      <UIFormActions>
        <UISheetClose as-child><UIButton @click="read = true">확인했습니다</UIButton></UISheetClose>
      </UIFormActions>
      <UISheetHandle class="notice-handle" />
    </UISheetContent>
  </UISheet>
</template>

<style scoped>
.notice-handle { margin-block: var(--ui-space-md) 0; }
</style>
