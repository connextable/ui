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
  <UIDrawer side="bottom" swipe-to-dismiss>
    <UIDrawerTrigger>보기 설정 열기</UIDrawerTrigger>
    <UIDrawerOverlay />
    <UIDrawerContent>
      <UIDrawerHandle />
      <UIDrawerTitle>보기 설정</UIDrawerTitle>
      <UIDrawerDescription>손잡이를 아래로 끌어 닫습니다.</UIDrawerDescription>
      <UIDrawerClose>닫기</UIDrawerClose>
    </UIDrawerContent>
  </UIDrawer>
</template>
