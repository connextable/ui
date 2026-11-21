<script setup lang="ts">
import { UIButton, UINavigationMenuPopover, type UINavigationMenuEntry } from "@connextable/ui";
import { ChevronDown } from "@lucide/vue";

const items: readonly UINavigationMenuEntry[] = [
  { id: "form", label: "폼", href: "/components/form" },
  { id: "grid", label: "그리드", href: "/components/grid" },
];
</script>

<template>
  <UINavigationMenuPopover :items="items" label="설정 탐색">
    <template #trigger="{ open }">
      <UIButton size="sm" variant="outline" :data-menu-open="open">설정 탐색 <ChevronDown :size="16" aria-hidden="true" /></UIButton>
    </template>
  </UINavigationMenuPopover>
</template>

<style scoped>
[data-menu-open="true"] :deep(svg) {
  rotate: 180deg;
}
</style>
