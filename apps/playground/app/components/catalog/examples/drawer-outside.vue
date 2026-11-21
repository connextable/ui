<script setup lang="ts">
import {
  UIDrawer,
  UIDrawerClose,
  UIDrawerContent,
  UIDrawerDescription,
  UIDrawerOverlay,
  UIDrawerTitle,
  UIDrawerTrigger,
} from "@connextable/ui";
</script>

<template>
  <UIDrawer :close-on-interact-outside="false">
    <UIDrawerTrigger>필터 열기</UIDrawerTrigger>
    <UIDrawerOverlay />
    <UIDrawerContent>
      <UIDrawerTitle>작업 필터</UIDrawerTitle>
      <UIDrawerDescription>선택한 조건을 확인하고 닫기 버튼을 누릅니다.</UIDrawerDescription>
      <UIDrawerClose>닫기</UIDrawerClose>
    </UIDrawerContent>
  </UIDrawer>
</template>
