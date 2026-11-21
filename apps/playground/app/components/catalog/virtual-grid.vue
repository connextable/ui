<script setup lang="ts">
import { UIDataLabel, UIDataStatus, UIDataSurface, UIVirtualGrid } from "@connextable/ui";
import { Package } from "@lucide/vue";

const items = Array.from({ length: 1000 }, (_, index) => ({
  id: `tile-${index}`,
  title: ["휴대용 조명", "유리 물병", "수납 바구니", "책상 매트", "종이 노트"][index % 5]!,
  code: `SKU-${String(index + 1).padStart(4, "0")}`,
  quantity: 10 + (index * 41) % 180,
}));
</script>

<template>
  <UIDataSurface>
    <template #toolbar><strong>품목별 재고</strong><output>품목 {{ items.length.toLocaleString("ko-KR") }}개</output></template>
    <UIVirtualGrid
      :items="items"
      :get-i-d="(item: typeof items[number]) => item.id"
      :lane-policy="{ kind: 'responsive', minExtent: 146, maxCount: 4, gap: 8 }"
      :size-policy="{ kind: 'fixed', extent: 93 }"
      :row-gap="8"
      role="region"
      tabindex="0"
      aria-label="품목별 재고"
    >
      <template #item="{ value }">
        <UIDataLabel :label="value.title" :detail="value.code">
          <template #icon><Package :size="16" aria-hidden="true" /></template>
        </UIDataLabel>
        <div class="tile-stock">
          <UIDataStatus :tone="value.quantity < 20 ? 'warning' : 'success'">재고 {{ value.quantity }}개</UIDataStatus>
        </div>
      </template>
    </UIVirtualGrid>
  </UIDataSurface>
</template>

<style scoped>
.tile-stock {
  margin-block-start: var(--ui-space-xs);
  color: var(--ui-color-text-muted);
  font-variant-numeric: tabular-nums;
}
</style>
