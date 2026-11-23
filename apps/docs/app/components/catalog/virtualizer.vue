<script setup lang="ts">
import {
  createDenseTrackGridLayout,
  createUniformExtentIndex,
  trackGridLayoutStrategy,
  UIDataSurface,
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
  <UIDataSurface>
    <template #toolbar><strong>행·열 배치</strong><output>{{ count }}행 × {{ count }}열</output></template>
    <UIVirtualizer :default-state="state" :strategy="trackGridLayoutStrategy" role="region" tabindex="0" aria-label="행·열 배치" v-slot="{ placements }">
      <UIVirtualizerSurface>
        <UIVirtualizerItem v-for="item in placements" :key="item.id" :placement="item" size="both">
          {{ item.id }}
        </UIVirtualizerItem>
      </UIVirtualizerSurface>
    </UIVirtualizer>
  </UIDataSurface>
</template>
