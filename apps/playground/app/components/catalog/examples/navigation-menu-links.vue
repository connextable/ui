<script setup lang="ts">
import { UINavigationMenuPopover, type UINavigationMenuEntry } from "@connextable/ui";

const items: readonly UINavigationMenuEntry[] = [
  { id: "nav", label: "네비게이션 메뉴", href: "/components/navigation-menu" },
  { id: "tabs", label: "탭", href: "/components/tabs" },
  { id: "popover", label: "팝오버", href: "/components/popover" },
];
</script>

<template>
  <UINavigationMenuPopover :items="items" label="현재 페이지와 관련 링크" current="nav" />
</template>
