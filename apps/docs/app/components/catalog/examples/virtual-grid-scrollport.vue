<script setup lang="ts">
import { UIVirtualGrid } from "@connextable/ui";
import { useTemplateRef } from "vue";

const scrollport = useTemplateRef<HTMLElement>("scrollport");
const tiles = Array.from({ length: 500 }, (_, index) => ({
  id: index + 1,
  label: `샘플 ${index + 1}`,
}));
</script>

<template>
  <section ref="scrollport" data-ui-virtual-scrollport aria-label="샘플 갤러리" tabindex="0">
    <p data-ui-virtual-scrollport-title>전체 샘플</p>
    <UIVirtualGrid
      v-if="scrollport"
      :items="tiles"
      :get-i-d="tile => tile.id"
      :scrollport="scrollport"
      :lane-policy="{ kind: 'fixed', count: 3, gap: 8 }"
      :size-policy="{ kind: 'fixed', extent: 40 }"
      :row-gap="8"
    >
      <template #item="{ value }">{{ value.label }}</template>
    </UIVirtualGrid>
  </section>
</template>
