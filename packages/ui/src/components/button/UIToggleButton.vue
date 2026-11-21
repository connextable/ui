<script setup lang="ts">
import { ToggleButton, type ToggleButtonProps, type ToggleButtonSlotProps } from "@sectile/vue/toggle-button";
import UIButton, { type UIButtonProps } from "./UIButton.vue";

const { size, variant, iconOnly, modelValue = undefined, ...toggleProps } = defineProps<
  Omit<ToggleButtonProps, "as" | "asChild"> & Pick<UIButtonProps, "size" | "variant" | "iconOnly">
>();
defineEmits<{ "update:modelValue": [pressed: boolean] }>();
defineSlots<{
  default?(state: ToggleButtonSlotProps): unknown;
  leading?(state: ToggleButtonSlotProps): unknown;
  trailing?(state: ToggleButtonSlotProps): unknown;
}>();
</script>

<template>
  <ToggleButton
    v-bind="toggleProps"
    v-slot="state"
    :model-value="modelValue"
    as-child
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <UIButton :size="size" :variant="variant" :icon-only="iconOnly">
      <template v-if="$slots.leading" #leading><slot name="leading" v-bind="state" /></template>
      <slot v-bind="state" />
      <template v-if="$slots.trailing" #trailing><slot name="trailing" v-bind="state" /></template>
    </UIButton>
  </ToggleButton>
</template>
