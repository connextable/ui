<script setup lang="ts">
import {
  UIButton,
  UIAlertDialog,
  UIAlertDialogClose,
  UIAlertDialogContent,
  UIAlertDialogDescription,
  UIAlertDialogOverlay,
  UIAlertDialogTitle,
  UIAlertDialogTrigger,
} from "@connextable/ui";

</script>

<template>
  <UIAlertDialog>
    <UIAlertDialogTrigger>프로젝트 삭제</UIAlertDialogTrigger>
    <UIAlertDialogOverlay />
    <UIAlertDialogContent>
      <UIAlertDialogTitle>프로젝트를 삭제할까요?</UIAlertDialogTitle>
      <UIAlertDialogDescription>
        프로젝트와 배포 기록이 영구적으로 삭제됩니다.
      </UIAlertDialogDescription>
      <template #actions>
        <UIAlertDialogClose as-child><UIButton size="sm" variant="outline">취소</UIButton></UIAlertDialogClose>
        <UIAlertDialogClose as-child><UIButton size="sm">프로젝트 삭제</UIButton></UIAlertDialogClose>
      </template>
    </UIAlertDialogContent>
  </UIAlertDialog>
</template>
