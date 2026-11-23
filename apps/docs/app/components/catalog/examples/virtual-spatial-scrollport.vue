<script setup lang="ts">
import { UIVirtualSpatial } from "@connextable/ui";
import { useTemplateRef } from "vue";

const scrollport = useTemplateRef<HTMLElement>("scrollport");
const places = Array.from({ length: 240 }, (_, index) => ({
  id: `좌석 ${index + 1}`,
  x: (index % 20) * 108,
  y: Math.floor(index / 20) * 56,
  width: 96,
  height: 44,
}));
</script>

<template>
  <section ref="scrollport" data-ui-virtual-scrollport aria-label="좌석 배치도" tabindex="0">
    <p class="caption" data-ui-virtual-scrollport-title>좌석 배치도</p>
    <UIVirtualSpatial
      v-if="scrollport"
      :scrollport="scrollport"
      :viewport-insets="{ top: 38 }"
      :items="places"
      :get-i-d="place => place.id"
      :get-rect="place => place"
      size-ownership="declared"
    >
      <template #item="{ value }">{{ value.id }}</template>
    </UIVirtualSpatial>
  </section>
</template>

<style scoped>
.caption {
  position: sticky;
  z-index: 1;
  inset-block-start: 0;
  inset-inline-start: 0;
  box-sizing: border-box;
  block-size: 38px;
}
</style>
