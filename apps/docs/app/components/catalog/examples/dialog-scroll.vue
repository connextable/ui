<script setup lang="ts">
import {
  UIDialog,
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
      <ul tabindex="0" aria-label="검사 항목">
        <li v-for="n in 48" :key="n">검사 {{ n }} 완료</li>
      </ul>
    </UIDialogContent>
  </UIDialog>
</template>
