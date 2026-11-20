<script setup lang="ts">
import { UIVirtualGrid } from "@connextable/ui";

const items = Array.from({ length: 1000 }, (_, index) => ({
  id: `tile-${index}`,
  title: `항목 ${index + 1}`,
}));
</script>

<template>
  <UIVirtualGrid
    :items="items"
    :get-i-d="(item: typeof items[number]) => item.id"
    :lane-policy="{ kind: 'fixed', count: 2, gap: 8 }"
    :size-policy="{ kind: 'fixed', extent: 44 }"
    :row-gap="8"
    aria-label="가상 그리드"
  >
    <template #item="{ value }">{{ value.title }}</template>
  </UIVirtualGrid>
</template>
