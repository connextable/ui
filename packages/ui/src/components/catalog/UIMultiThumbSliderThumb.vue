<script setup lang="ts">
import {
  MultiThumbSliderThumb,
  type MultiThumbSliderThumbProps,
  type MultiThumbSliderThumbSlotProps,
} from "@sectile/vue/multi-thumb-slider";
import { Primitive } from "@sectile/vue/primitive";

defineProps<MultiThumbSliderThumbProps>();
defineSlots<{
  default?(state: MultiThumbSliderThumbSlotProps): unknown;
}>();

function canSeparateAtEdge({ index, percentage, percentages }: MultiThumbSliderThumbSlotProps) {
  // At a shared endpoint, bring forward the thumb that can move back into the range.
  if (percentage === 100) {
    return index === percentages.indexOf(100) && percentages.lastIndexOf(100) > index;
  }
  if (percentage === 0) {
    return index === percentages.lastIndexOf(0) && percentages.indexOf(0) < index;
  }
  return false;
}
</script>

<template>
  <MultiThumbSliderThumb :value="value" as-child v-slot="state">
    <Primitive :as="as ?? 'span'" :as-child="asChild"
      :data-ui-thumb-at-shared-edge="canSeparateAtEdge(state) || undefined">
      <slot v-bind="state" />
    </Primitive>
  </MultiThumbSliderThumb>
</template>
