<script setup lang="ts">
import { DisclosureRoot, type DisclosureRootProps, type DisclosureSlotProps } from "@sectile/vue/disclosure";

const { variant = "plain", modelValue = undefined, ...rootProps } = defineProps<
  DisclosureRootProps & { variant?: "plain" | "outline" }
>();

defineEmits<{ "update:modelValue": [open: boolean] }>();
defineSlots<{ default?(state: DisclosureSlotProps): unknown }>();
</script>

<template>
  <DisclosureRoot
    v-bind="rootProps"
    class="ui-disclosure"
    :data-variant="variant"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    v-slot="state"
  >
    <slot v-bind="state" />
  </DisclosureRoot>
</template>

<style scoped>
.ui-disclosure[data-variant="outline"] {
  border: 1px solid var(--ui-color-divider);
  border-radius: var(--ui-control-radius);
}
</style>
