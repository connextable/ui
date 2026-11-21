<script setup lang="ts">
import { UINavigationMenuPopover, type UINavigationMenuEntry } from "@connextable/ui";

const items: readonly UINavigationMenuEntry[] = [
  { id: "table", label: "데이터 테이블", href: "/components/data-table", description: "행과 열을 중심으로 데이터를 탐색합니다." },
  { id: "chart", label: "차트", href: "/components/chart", description: "시계열과 분포를 시각화합니다." },
  { id: "virtual", label: "가상 목록", href: "/components/virtual-list", description: "긴 목록을 스크롤합니다." },
];
</script>

<template>
  <UINavigationMenuPopover :items="items" label="데이터 도구" />
</template>
