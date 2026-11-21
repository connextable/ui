<script setup lang="ts">
import { UINavigationMenuPopover, type UINavigationMenuEntry } from "@connextable/ui";

const items: readonly UINavigationMenuEntry[] = [
  { id: "design", label: "디자인 시스템", href: "/" },
  { id: "components", label: "컴포넌트", children: [
    { id: "button", label: "버튼", href: "/components/button" },
    { id: "input", label: "텍스트 입력", href: "/components/input" },
    { id: "select", label: "선택 목록", href: "/components/select" },
  ] },
  { id: "data", label: "데이터 표현", children: [
    { id: "table", label: "데이터 테이블", href: "/components/data-table" },
    { id: "chart", label: "차트", href: "/components/chart" },
  ] },
];
</script>

<template>
  <UINavigationMenuPopover :items="items" label="Playground 둘러보기" />
</template>
