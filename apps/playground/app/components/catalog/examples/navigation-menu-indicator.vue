<script setup lang="ts">
import { UINavigationMenuPopover, type UINavigationMenuEntry } from "@connextable/ui";
import { SlidersHorizontal } from "@lucide/vue";

const items: readonly UINavigationMenuEntry[] = [
  { id: "settings", label: "설정", children: [
    { id: "form", label: "폼", href: "/components/form" },
    { id: "grid", label: "그리드", href: "/components/grid" },
  ] },
  { id: "home", label: "홈", href: "/" },
];
</script>

<template>
  <UINavigationMenuPopover :items="items" label="설정 탐색">
    <template #label="{ entry }">
      <SlidersHorizontal :size="16" aria-hidden="true" />
      {{ entry.label }}
    </template>
  </UINavigationMenuPopover>
</template>
