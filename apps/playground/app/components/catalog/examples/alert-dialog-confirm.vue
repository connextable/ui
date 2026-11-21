<script setup lang="ts">
import {
  UIAlertDialog,
  UIAlertDialogClose,
  UIAlertDialogContent,
  UIAlertDialogDescription,
  UIAlertDialogOverlay,
  UIAlertDialogTitle,
  UIAlertDialogTrigger,
} from "@connextable/ui";

import { ref } from "vue";

const archived = ref(false);
</script>

<template>
  <UIAlertDialog>
    <UIAlertDialogTrigger>기록 보관</UIAlertDialogTrigger>
    <UIAlertDialogOverlay />
    <UIAlertDialogContent>
      <UIAlertDialogTitle>기록을 보관할까요?</UIAlertDialogTitle>
      <UIAlertDialogDescription>
        이 기록을 활성 목록에서 보관함으로 옮깁니다.
      </UIAlertDialogDescription>
      <UIAlertDialogClose>취소</UIAlertDialogClose>
      <UIAlertDialogClose @click="archived = true">보관</UIAlertDialogClose>
    </UIAlertDialogContent>
  </UIAlertDialog>
  <output>{{ archived ? '보관함에 있습니다.' : '활성 목록에 있습니다.' }}</output>
</template>
