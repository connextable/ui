<script setup lang="ts">
import { UIVirtualGrid } from "@connextable/ui";

const items = Array.from({ length: 1000 }, (_, index) => ({
  id: `tile-${index}`,
  title: `SKU-${String(index + 1).padStart(4, "0")}`,
  quantity: 10 + (index * 41) % 180,
}));
</script>

<template>
  <UIVirtualGrid
    :items="items"
    :get-i-d="(item: typeof items[number]) => item.id"
    :lane-policy="{ kind: 'responsive', minExtent: 116, maxCount: 4, gap: 8 }"
    :size-policy="{ kind: 'fixed', extent: 68 }"
    :row-gap="8"
    aria-label="품목별 재고"
  >
    <template #item="{ value }">
      <strong>{{ value.title }}</strong>
      <div class="tile-stock">재고 {{ value.quantity }}개</div>
    </template>
  </UIVirtualGrid>
</template>

<style scoped>
.tile-stock {
  margin-block-start: var(--ui-space-xs);
  color: var(--ui-color-text-muted);
  font-variant-numeric: tabular-nums;
}
</style>
