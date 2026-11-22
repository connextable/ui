<script setup lang="ts">
import { UIButton, UIAlertDialog } from "@connextable/ui";

</script>

<template>
  <UIAlertDialog
    trigger-label="프로젝트 삭제"
    title="프로젝트를 삭제할까요?"
    description="프로젝트와 배포 기록이 영구적으로 삭제됩니다."
  >
    <template #actions="{ close }">
      <UIButton size="sm" variant="outline" @click="close">취소</UIButton>
      <UIButton size="sm" @click="close">프로젝트 삭제</UIButton>
    </template>
  </UIAlertDialog>
</template>
