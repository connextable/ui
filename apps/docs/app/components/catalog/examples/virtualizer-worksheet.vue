<script setup lang="ts">
import {
  UIButton, UIDataSurface, UIVirtualizer, UIVirtualizerItem, UIVirtualizerSurface,
  createDenseTrackGridLayout, createUniformExtentIndex, trackGridLayoutStrategy,
} from "@connextable/ui";
import { ref, useTemplateRef } from "vue";

const rows = 80;
const columns = 32;
const cells = Array.from({ length: rows * columns }, (_, index) => {
  const row = 1 + Math.floor(index / columns);
  const column = 1 + index % columns;
  return `${row}행 ${column}열`;
});
const target = cells[1399]!;
const current = ref("");
const worksheet = useTemplateRef<{ scrollTo(id: string, alignment: "center"): unknown }>("worksheet");
const state = createDenseTrackGridLayout(
  createUniformExtentIndex(rows, { kind: "exact", value: 47 }),
  createUniformExtentIndex(columns, { kind: "exact", value: 107 }),
  cells,
);
</script>

<template>
  <UIDataSurface>
    <template #toolbar>
      <output>{{ current ? `선택한 위치 · ${current}` : `${rows}행 × ${columns}열` }}</output>
      <UIButton size="sm" variant="outline" @click="current = target; worksheet?.scrollTo(target, 'center')">
        {{ target }}로 이동
      </UIButton>
    </template>
    <UIVirtualizer ref="worksheet" :default-state="state" :strategy="trackGridLayoutStrategy"
      aria-label="정산 워크시트" v-slot="{ placements }">
      <UIVirtualizerSurface>
        <UIVirtualizerItem v-for="item in placements" :key="item.id" :placement="item" size="both"
          :data-ui-virtual-current="item.id === current || undefined">
          {{ item.id }}
        </UIVirtualizerItem>
      </UIVirtualizerSurface>
    </UIVirtualizer>
  </UIDataSurface>
</template>
