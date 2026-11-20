<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import { UIButton, UIDataActions, UIVirtualSpatial } from "@connextable/ui";

const map = useTemplateRef("map");
const current = ref<number>();
const bins = Array.from({ length: 6000 }, (_, index) => ({
  id: index + 1,
  x: 8 + (index % 100) * 89,
  y: 8 + Math.floor(index / 100) * 54,
  width: 81,
  height: 46,
}));

function locate(id: number) {
  const result = map.value?.scrollToID(id, "center");
  if (result?.ok) current.value = id;
}
</script>

<template>
  <UIVirtualSpatial ref="map" :items="bins" :get-i-d="bin => bin.id" :get-rect="bin => bin"
    :item-attributes="bin => ({ 'data-ui-virtual-current': bin.id === current || undefined })"
    size-ownership="declared" aria-label="창고 선반 좌표">
    <template #item="{ id }">선반 {{ id }}</template>
  </UIVirtualSpatial>
  <UIDataActions>
    <output aria-live="polite">{{ current ? `선반 ${current} 위치` : '창고 선반 6,000개' }}</output>
    <UIButton size="sm" variant="outline" @click="locate(1)">입구</UIButton>
    <UIButton size="sm" variant="outline" @click="locate(4785)">선반 4785</UIButton>
  </UIDataActions>
</template>
