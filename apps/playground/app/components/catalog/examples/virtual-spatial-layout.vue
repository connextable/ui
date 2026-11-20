<script setup lang="ts">
import { computed, ref } from "vue";
import { UIButton, UIDataActions, UIVirtualSpatial } from "@connextable/ui";

const compact = ref(false);
const stations = Array.from({ length: 96 }, (_, index) => ({
  id: index + 1,
  name: `점검 구역 ${index + 1}`,
}));
const position = computed(() => {
  const columns = compact.value ? 4 : 8;
  return (station: typeof stations[number]) => {
    const index = station.id - 1;
    return { x: 8 + index % columns * 122, y: 8 + Math.floor(index / columns) * 59, width: 114, height: 51 };
  };
});
</script>

<template>
  <UIVirtualSpatial :items="stations" :get-i-d="station => station.id" :get-rect="position"
    :item-attributes="station => ({ 'data-ui-virtual-current': station.id % 11 === 0 || undefined })"
    size-ownership="declared" data-ui-virtual-layout-motion aria-label="점검 구역 배치도">
    <template #item="{ value }">{{ value.name }}</template>
  </UIVirtualSpatial>
  <UIDataActions>
    <output>{{ compact ? '4열 배치' : '8열 배치' }} · 구역 {{ stations.length }}개</output>
    <UIButton size="sm" variant="outline" :aria-pressed="compact" @click="compact = !compact">4열로 배치</UIButton>
  </UIDataActions>
</template>
