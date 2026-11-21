<script setup lang="ts">
import {
  UIDialog,
  UIDialogClose,
  UIDialogContent,
  UIDialogDescription,
  UIDialogOverlay,
  UIDialogTitle,
  UIDialogTrigger,
} from "@connextable/ui";

</script>

<template>
  <UIDialog>
    <UIDialogTrigger>검사 결과 열기</UIDialogTrigger>
    <UIDialogOverlay />
    <UIDialogContent>
      <UIDialogTitle>검사 결과</UIDialogTitle>
      <UIDialogDescription>항목을 확인한 뒤 대화상자를 닫을 수 있습니다.</UIDialogDescription>
      <ul style="max-block-size: min(40vh, 14rem); overflow-y: auto" tabindex="0" aria-label="검사 항목">
        <li v-for="n in 18" :key="n">검사 {{ n }} 완료</li>
      </ul>
      <UIDialogClose>닫기</UIDialogClose>
    </UIDialogContent>
  </UIDialog>
</template>
