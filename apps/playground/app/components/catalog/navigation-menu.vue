<script setup lang="ts">
import { UINavigationMenuPopover, type UINavigationMenuEntry } from "@connextable/ui";

const items: readonly UINavigationMenuEntry[] = [
  { id: "design", label: "디자인 시스템", href: "/" },
  { id: "components", label: "컴포넌트", children: [
    { id: "button", label: "버튼", href: "/components/button", description: "작업 실행과 아이콘 버튼" },
    { id: "input", label: "텍스트 입력", href: "/components/input", description: "한 줄 입력과 상태 표시" },
    { id: "select", label: "선택 목록", href: "/components/select", description: "정해진 값 중 하나 선택" },
  ] },
  { id: "data", label: "데이터 표현", children: [
    { id: "table", label: "데이터 테이블", href: "/components/data-table", description: "행과 열로 데이터 탐색" },
    { id: "chart", label: "차트", href: "/components/chart", description: "추세와 분포 시각화" },
  ] },
  { id: "overlays", label: "오버레이", children: [
    { id: "popover", label: "팝오버", href: "/components/popover" },
    { id: "dialog", label: "다이얼로그", href: "/components/dialog" },
    { id: "context", label: "컨텍스트 메뉴", href: "/components/context-menu" },
  ] },
];
</script>

<template>
  <UINavigationMenuPopover :items="items" label="Playground 탐색" />
</template>
