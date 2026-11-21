<script setup lang="ts">
import { UINavigationMenuPopover, type UINavigationMenuEntry } from "@connextable/ui";

const items: readonly UINavigationMenuEntry[] = [
  { id: "data", label: "데이터 표현", children: [
    { id: "table", label: "데이터 테이블", href: "/components/data-table" },
    { id: "grid", label: "가상 그리드", href: "/components/virtual-grid", disabled: true },
  ] },
  { id: "chart", label: "차트", href: "/components/chart" },
];
</script>

<template>
  <UINavigationMenuPopover :items="items" label="사용 가능한 도구" />
</template>
