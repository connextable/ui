<script setup lang="ts">
import {
  UIDrawer,
  UIDrawerContent,
  UIDrawerDescription,
  UIDrawerOverlay,
  UIDrawerPortal,
  UIDrawerTitle,
  UIDrawerTrigger,
} from "@connextable/ui";

</script>

<template>
  <UIDrawer side="left">
    <UIDrawerTrigger>배포 조건 보기</UIDrawerTrigger>
    <UIDrawerPortal>
      <UIDrawerOverlay />
      <UIDrawerContent>
        <UIDrawerTitle>배포 조건</UIDrawerTitle>
        <UIDrawerDescription>서울 리전에서 진행 중인 작업과 실패한 작업을 표시합니다.</UIDrawerDescription>
      </UIDrawerContent>
    </UIDrawerPortal>
  </UIDrawer>
</template>
