<script setup lang="ts">
import {
  UIDrawer,
  UIDrawerClose,
  UIDrawerContent,
  UIDrawerDescription,
  UIDrawerHandle,
  UIDrawerOverlay,
  UIDrawerTitle,
  UIDrawerTrigger,
} from "@connextable/ui";

</script>

<template>
  <UIDrawer side="bottom">
    <UIDrawerTrigger>정렬 패널 열기</UIDrawerTrigger>
    <UIDrawerOverlay />
    <UIDrawerContent>
      <UIDrawerHandle />
      <UIDrawerTitle>정렬</UIDrawerTitle>
      <UIDrawerDescription>최근 변경한 순서로 문서를 봅니다.</UIDrawerDescription>
      <UIDrawerClose>완료</UIDrawerClose>
    </UIDrawerContent>
  </UIDrawer>
</template>
