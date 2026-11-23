<script setup lang="ts">
import { UINavigationMenuPopover, type UINavigationMenuEntry } from "@connextable/ui";

const items: readonly UINavigationMenuEntry[] = [
  { id: "component", label: "컴포넌트", children: [
    { id: "tabular", label: "표와 그리드", children: [
      { id: "data", label: "데이터 테이블", href: "/components/data-table" },
      { id: "grid", label: "데이터 그리드", href: "/components/data-grid" },
    ] },
    { id: "input", label: "입력", children: [
      { id: "checkbox", label: "체크박스", href: "/components/checkbox" },
      { id: "select", label: "셀렉트", href: "/components/select" },
    ] },
  ] },
  { id: "navigation", label: "탐색", children: [
    { id: "nav-menu", label: "내비게이션 메뉴", href: "/components/navigation-menu" },
    { id: "tabs", label: "탭", href: "/components/tabs" },
  ] },
];
</script>

<template>
  <UINavigationMenuPopover :items="items" label="컴포넌트 탐색" />
</template>
