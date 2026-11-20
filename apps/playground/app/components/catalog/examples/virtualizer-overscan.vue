<script setup lang="ts">
import { ref } from "vue";
import {
  UIButton, UIDataActions, UIVirtualizer, UIVirtualizerItem, UIVirtualizerSurface,
  createDenseTrackGridLayout, createUniformExtentIndex, trackGridLayoutStrategy,
} from "@connextable/ui";

const columns = 24;
const rows = 120;
const ids = Array.from({ length: rows * columns }, (_, index) => index);
const state = createDenseTrackGridLayout(
  createUniformExtentIndex(rows, { kind: "exact", value: 40 }),
  createUniformExtentIndex(columns, { kind: "exact", value: 112 }),
  ids,
);
const overscan = ref(false);
const counts = ref({ visible: 0, mounted: 0 });
</script>

<template>
  <UIVirtualizer :default-state="state" :strategy="trackGridLayoutStrategy"
    :overscan="overscan ? 160 : 0" aria-label="버퍼 범위를 비교하는 좌석 배치" v-slot="{ placements }"
    @plan-change="plan => counts = { visible: plan.placements.filter(item => item.visible).length, mounted: plan.placements.length }">
    <UIVirtualizerSurface>
      <UIVirtualizerItem v-for="item in placements" :key="item.id" :placement="item" size="both">
        R{{ Math.floor(Number(item.id) / columns) + 1 }} · C{{ Number(item.id) % columns + 1 }}
      </UIVirtualizerItem>
    </UIVirtualizerSurface>
  </UIVirtualizer>
  <UIDataActions>
    <output>보이는 셀 {{ counts.visible }}개 · 준비한 셀 {{ counts.mounted }}개</output>
    <UIButton size="sm" variant="outline" :aria-pressed="overscan" @click="overscan = !overscan">준비 범위 확장</UIButton>
  </UIDataActions>
</template>
