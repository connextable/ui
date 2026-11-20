<script setup lang="ts">
import { computed, ref } from "vue";
import { Package } from "@lucide/vue";
import { UIButton, UIDataLabel, UIDataSurface, UIVirtualGrid } from "@connextable/ui";

const items = Array.from({ length: 400 }, (_, index) => ({
  id: index + 1, label: `자재 ${index + 1}`, weight: 20 + index % 41,
}));
const chosen = ref<number[]>([]);
const total = computed(() => chosen.value.reduce((sum, id) => sum + items[id - 1]!.weight, 0));

function toggle(id: number) {
  chosen.value = chosen.value.includes(id) ? chosen.value.filter(value => value !== id) : [...chosen.value, id];
}
</script>

<template>
  <UIDataSurface>
    <template #toolbar><strong>출고 자재</strong></template>
    <UIVirtualGrid :items="items" :get-i-d="item => item.id"
      :lane-policy="{ kind: 'responsive', minExtent: 145, gap: 8, maxCount: 5 }"
      :size-policy="{ kind: 'fixed', extent: 67 }" :row-gap="8"
      :item-attributes="item => ({ 'data-ui-virtual-current': chosen.includes(item.id) || undefined })"
      aria-label="무게를 비교할 자재">
      <template #item="{ value }">
        <UIButton variant="ghost" size="sm" :aria-pressed="chosen.includes(value.id)" @click="toggle(value.id)">
          <UIDataLabel :label="value.label" :detail="`${value.weight}g`">
            <template #icon><Package :size="15" aria-hidden="true" /></template>
          </UIDataLabel>
        </UIButton>
      </template>
    </UIVirtualGrid>
    <template #footer>
      <output aria-live="polite">{{ chosen.length }}개 선택 · 합계 {{ total }}g</output>
      <UIButton variant="outline" size="sm" :disabled="chosen.length === 0" @click="chosen = []">선택 지우기</UIButton>
    </template>
  </UIDataSurface>
</template>
