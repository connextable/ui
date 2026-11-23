<script setup lang="ts">
import {
  UIDrawer, UIDrawerContent, UIDrawerDescription,
  UIDrawerOverlay, UIDrawerPortal, UIDrawerTitle, UIDrawerTrigger,
} from "@connextable/ui";

const directions = [
  { side: "left", label: "왼쪽", title: "프로젝트 탐색", description: "프로젝트와 문서 목록을 여는 위치입니다." },
  { side: "right", label: "오른쪽", title: "문서 속성", description: "열어 둔 문서의 속성을 확인하는 위치입니다." },
  { side: "top", label: "위", title: "공지 사항", description: "서비스 상태나 공지를 펼치는 위치입니다." },
  { side: "bottom", label: "아래", title: "작업 내역", description: "최근에 실행한 작업을 확인하는 위치입니다." },
] as const;
</script>

<template>
  <div class="direction-options">
    <UIDrawer v-for="direction in directions" :key="direction.side" :side="direction.side" :swipe-to-dismiss="false">
      <UIDrawerTrigger>{{ direction.label }}</UIDrawerTrigger>
      <UIDrawerPortal>
        <UIDrawerOverlay />
        <UIDrawerContent>
          <UIDrawerTitle>{{ direction.title }}</UIDrawerTitle>
          <UIDrawerDescription>{{ direction.description }}</UIDrawerDescription>
        </UIDrawerContent>
      </UIDrawerPortal>
    </UIDrawer>
  </div>
</template>

<style scoped>
.direction-options {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--ui-space-sm);
}
</style>
