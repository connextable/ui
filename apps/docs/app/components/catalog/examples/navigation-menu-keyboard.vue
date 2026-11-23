<script setup lang="ts">
import { UINavigationMenuPopover, type UINavigationMenuEntry } from "@connextable/ui";

const items: readonly UINavigationMenuEntry[] = [
  { id: "inputs", label: "입력", children: [
    { id: "select", label: "셀렉트", href: "/components/select" },
    { id: "input", label: "텍스트 입력", href: "/components/input" },
  ] },
  { id: "menu", label: "메뉴 버튼", href: "/components/menu-button" },
];
</script>

<template>
  <UINavigationMenuPopover :items="items" label="키보드로 UI 탐색" />
</template>
