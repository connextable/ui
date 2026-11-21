<script setup lang="ts">
import { UINavigationMenuPopover, type UINavigationMenuEntry } from "@connextable/ui";

const items: readonly UINavigationMenuEntry[] = [
  { id: "table", label: "데이터 테이블", href: "/components/data-table" },
  { id: "grid", label: "가상 그리드", href: "/components/virtual-grid", disabled: true },
];
</script>

<template>
  <UINavigationMenuPopover :items="items" label="사용 가능한 도구" />
</template>
