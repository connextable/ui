<script setup lang="ts">
import {
  createDenseTrackGridLayout,
  createUniformExtentIndex,
  trackGridLayoutStrategy,
  UIVirtualizer,
  UIVirtualizerItem,
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
  <UIVirtualizer :initial-viewport="{ x: 0, y: 0, width: 380, height: 230 }" :default-state="state" :strategy="trackGridLayoutStrategy" v-slot="{ placements }">
    <UIVirtualizerSurface>
      <UIVirtualizerItem v-for="item in placements" :key="item.id" :placement="item" size="both">
        {{ item.id }}
      </UIVirtualizerItem>
    </UIVirtualizerSurface>
  </UIVirtualizer>
</template>
