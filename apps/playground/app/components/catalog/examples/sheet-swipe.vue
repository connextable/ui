<script setup lang="ts">
import {
  UISheet,
  UISheetClose,
  UISheetContent,
  UISheetDescription,
  UISheetHandle,
  UISheetOverlay,
  UISheetTitle,
  UISheetTrigger,
} from "@connextable/ui";

</script>

<template>
  <UISheet side="bottom" swipe-to-dismiss>
    <UISheetTrigger>보기 설정 열기</UISheetTrigger>
    <UISheetOverlay />
    <UISheetContent>
      <UISheetHandle />
      <UISheetTitle>보기 설정</UISheetTitle>
      <UISheetDescription>손잡이를 아래로 끌어 창을 닫을 수 있습니다.</UISheetDescription>
      <UISheetClose>닫기</UISheetClose>
    </UISheetContent>
  </UISheet>
</template>
