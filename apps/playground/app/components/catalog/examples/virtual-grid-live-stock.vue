<script setup lang="ts">
import { computed, ref } from "vue";
import { Package } from "@lucide/vue";
import { UIButton, UIDataLabel, UIDataStatus, UIDataSurface, UIVirtualGrid } from "@connextable/ui";

const initial = Array.from({ length: 320 }, (_, index) => ({
  id: index + 1, name: ["라벨 롤", "유리 물병", "접이식 박스", "휴대용 조명"][index % 4]!,
  stock: 6 + (17 * index) % 89,
}));
const levels = ref(initial);
const ordered = computed(() => [...levels.value].sort((a, b) => a.stock - b.stock));
const incoming = ref(0);

function receiveShipment() {
  const first = ordered.value[0]!;
  levels.value = levels.value.map(item => item.id === first.id ? { ...item, stock: item.stock + 18 } : item);
  incoming.value = first.id;
}
</script>

<template>
  <UIDataSurface>
    <template #toolbar>
      <strong>재고가 적은 품목부터</strong>
      <UIButton size="sm" variant="outline" @click="receiveShipment">첫 품목에 18개 입고</UIButton>
    </template>
    <UIVirtualGrid :items="ordered" :get-i-d="item => item.id"
      :lane-policy="{ kind: 'responsive', minExtent: 139, maxCount: 5, gap: 8 }"
      :size-policy="{ kind: 'fixed', extent: 96 }" :row-gap="8"
      :item-attributes="item => ({ 'data-ui-virtual-current': item.id === incoming || undefined })"
      data-ui-virtual-layout-motion aria-label="재고 순으로 정렬한 품목">
      <template #item="{ value }">
        <UIDataLabel :label="value.name" :detail="`품목 #${value.id}`">
          <template #icon><Package :size="15" aria-hidden="true" /></template>
        </UIDataLabel>
        <div><UIDataStatus :tone="value.stock < 12 ? 'warning' : 'success'">{{ value.stock }}개</UIDataStatus></div>
      </template>
    </UIVirtualGrid>
    <template #footer><output aria-live="polite">{{ incoming ? `품목 #${incoming}에 18개 입고됨` : `품목 ${initial.length}개` }}</output></template>
  </UIDataSurface>
</template>
