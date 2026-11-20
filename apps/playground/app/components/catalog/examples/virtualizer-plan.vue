<script setup lang="ts">
import {
  createDenseTrackGridLayout,
  createUniformExtentIndex,
  trackGridLayoutStrategy,
  useUIVirtualizer,
} from "@connextable/ui";
import { computed, shallowRef } from "vue";

const count = 30;
const ids = Array.from({ length: count * count }, (_, index) =>
  `${Math.floor(index / count) + 1}행 ${index % count + 1}열`,
);
const state = shallowRef(createDenseTrackGridLayout(
  createUniformExtentIndex(count, { kind: "exact", value: 36 }),
  createUniformExtentIndex(count, { kind: "exact", value: 96 }),
  ids,
));
const scrollport = shallowRef<HTMLElement | null>(null);
const surface = shallowRef<HTMLElement | null>(null);
const { plan } = useUIVirtualizer({ state, strategy: trackGridLayoutStrategy, scrollport, surface });
const visibleCount = computed(() => plan.value?.placements.filter(item => item.visible).length ?? 0);
const firstVisible = computed(() => plan.value?.placements.find(item => item.visible)?.id);
</script>

<template>
  <div>
    <p>보이는 항목 {{ visibleCount }}개 · 첫 셀 {{ firstVisible ?? "준비 중" }}</p>
    <section ref="scrollport" class="viewport" aria-label="렌더 범위를 관찰하는 가상 배치" tabindex="0">
      <div ref="surface" class="surface" :style="{
        width: `${plan?.contentSize.width ?? 0}px`,
        height: `${plan?.contentSize.height ?? 0}px`,
      }">
        <div v-for="{ id, rect } in plan?.placements" :key="id" class="cell" :style="{
          left: `${rect.x}px`,
          top: `${rect.y}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`,
        }">{{ id }}</div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.viewport {
  inline-size: min(100%, 32rem);
  block-size: 15rem;
  overflow: auto;
  border: 1px solid var(--ui-color-divider);
  border-radius: var(--ui-control-radius);
}

.surface {
  position: relative;
}

.cell {
  position: absolute;
  box-sizing: border-box;
  padding: var(--ui-space-xs);
  border: 1px solid var(--ui-color-divider);
  background: var(--ui-color-surface-muted);
}
</style>
