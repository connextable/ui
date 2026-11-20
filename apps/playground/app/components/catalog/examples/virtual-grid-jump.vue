<script setup lang="ts">
import { UIButton, UIVirtualGrid } from "@connextable/ui";
import { nextTick, ref } from "vue";

const grid = ref<{ scrollToID(id: number, alignment: "start"): unknown } | null>(null);
const narrow = ref(false);
const titles = Array.from({ length: 100 }, (_, index) => index + 1);
const firstVisible = ref<string | number>();

async function showItem() {
  narrow.value = true;
  await nextTick();
  grid.value?.scrollToID(75, "start");
}
</script>

<template>
  <div>
    <UIButton size="sm" variant="outline" @click="showItem">두 열에서 75번으로 이동</UIButton>
    <p aria-live="polite">화면 첫 항목 {{ firstVisible ?? "준비 중" }}</p>
    <UIVirtualGrid
      ref="grid"
      :items="titles"
      :get-i-d="id => id"
      :lane-policy="{ kind: 'fixed', count: narrow ? 2 : 4, gap: 8 }"
      :size-policy="{ kind: 'fixed', extent: 44 }"
      :row-gap="8"
      aria-label="샘플 목록"
      @plan-change="plan => firstVisible = plan.placements.find(item => item.visible)?.id"
    >
      <template #item="{ value }">샘플 {{ value }}</template>
    </UIVirtualGrid>
  </div>
</template>
