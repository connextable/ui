<script setup lang="ts">
import { UINavigationMenuPopover, type UINavigationMenuEntry } from "@connextable/ui";
import { House, LayoutGrid, SlidersHorizontal } from "@lucide/vue";

const items: readonly UINavigationMenuEntry[] = [
  { id: "settings", label: "설정", icon: SlidersHorizontal, children: [
    { id: "form", label: "폼", href: "/components/form" },
    { id: "grid", label: "그리드", href: "/components/grid", icon: LayoutGrid },
  ] },
  { id: "home", label: "홈", href: "/", icon: House },
];
</script>

<template>
  <UINavigationMenuPopover :items="items" label="설정 탐색" />
</template>
