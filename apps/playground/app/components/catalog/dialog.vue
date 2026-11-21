<script setup lang="ts">
import {
  UIButton,
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
    <UIDialogTrigger as-child><UIButton variant="outline">배포 요약 열기</UIButton></UIDialogTrigger>
    <UIDialogOverlay />
    <UIDialogContent>
      <UIDialogTitle>결제 서비스 배포 요약</UIDialogTitle>
      <UIDialogDescription>결제 재시도 과정에서 중복 승인을 방지하는 수정 사항이 포함됩니다.</UIDialogDescription>
      <dl class="release-details">
        <dt>버전</dt><dd>v2.8.4</dd>
        <dt>대상 리전</dt><dd>서울</dd>
        <dt>배포 예정</dt><dd>11월 24일 오후 2시</dd>
      </dl>
    </UIDialogContent>
  </UIDialog>
</template>

<style scoped>
.release-details {
  display: grid;
  grid-template-columns: minmax(0, auto) minmax(0, 1fr);
  gap: var(--ui-space-sm) var(--ui-space-md);
  font-size: var(--ui-font-size-body-sm);
}
.release-details dt { color: var(--ui-color-text-muted); }
.release-details dd { margin: 0; }
</style>
