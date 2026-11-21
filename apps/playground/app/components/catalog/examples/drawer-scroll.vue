<script setup lang="ts">
import {
  UIDrawer,
  UIDrawerContent,
  UIDrawerDescription,
  UIDrawerOverlay,
  UIDrawerTitle,
  UIDrawerTrigger,
} from "@connextable/ui";

const recent = Array.from({ length: 36 }, (_, index) => `기록 ${index + 1}`);
</script>

<template>
  <UIDrawer side="right">
    <UIDrawerTrigger>활동 기록 열기</UIDrawerTrigger>
    <UIDrawerOverlay />
    <UIDrawerContent>
      <UIDrawerTitle>최근 활동 기록</UIDrawerTitle>
      <UIDrawerDescription>아래로 스크롤해 마지막 기록을 확인합니다.</UIDrawerDescription>
      <ol>
        <li v-for="activity in recent" :key="activity">{{ activity }}</li>
      </ol>
    </UIDrawerContent>
  </UIDrawer>
</template>
