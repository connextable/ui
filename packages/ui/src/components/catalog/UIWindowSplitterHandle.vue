<script setup lang="ts">
import { WindowSplitterHandle } from "@sectile/vue/window-splitter";
import type { SliderPartProps, SliderSlotProps } from "@sectile/vue/slider";

defineProps<SliderPartProps & { thumb?: boolean }>();

defineSlots<{
  default?(state: SliderSlotProps): unknown;
}>();
</script>

<template>
  <WindowSplitterHandle :as="as" :as-child="asChild" :data-thumb="thumb || undefined">
    <template v-if="$slots.default" #default="state"><slot v-bind="state" /></template>
  </WindowSplitterHandle>
</template>
