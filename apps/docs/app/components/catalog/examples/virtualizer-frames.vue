<script setup lang="ts">
import {
  createDenseTrackGridLayout,
  createUniformExtentIndex,
  trackGridLayoutStrategy,
  UIVirtualizer,
  UIVirtualizerItem,
  UIVirtualizerHeader,
  UIVirtualizerFooter,
  UIVirtualizerSurface,
} from "@connextable/ui";

const count = 30;
const ids = Array.from({ length: count * count }, (_, index) =>
  `${Math.floor(index / count) + 1}행 ${index % count + 1}열`,
);
const state = createDenseTrackGridLayout(
  createUniformExtentIndex(count, { kind: "exact", value: 36 }),
  createUniformExtentIndex(count, { kind: "exact", value: 96 }),
  ids,
);
</script>

<template>
  <UIVirtualizer :default-state="state" :strategy="trackGridLayoutStrategy" v-slot="{ placements }">
    <UIVirtualizerHeader>가상 배치 시작</UIVirtualizerHeader>
    <UIVirtualizerSurface>
      <UIVirtualizerItem v-for="item in placements" :key="item.id" :placement="item" size="both">
        {{ item.id }}
      </UIVirtualizerItem>
    </UIVirtualizerSurface>
    <UIVirtualizerFooter>배치 끝</UIVirtualizerFooter>
  </UIVirtualizer>
</template>
