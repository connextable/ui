<script setup lang="ts">
import { CheckboxGroupIndicator } from "@sectile/vue/checkbox-group";
import type { CheckboxSlotProps } from "@sectile/vue/checkbox";
import type { PrimitiveAs } from "@sectile/vue/primitive";
import UICheckboxBox from "./UICheckboxBox.vue";

const { as, asChild, forcePresent = undefined } = defineProps<{
  as?: PrimitiveAs;
  asChild?: boolean;
  forcePresent?: boolean;
}>();
defineSlots<{ default?(state: CheckboxSlotProps): unknown }>();
</script>

<template>
  <CheckboxGroupIndicator :as="as" :as-child="asChild" :force-present="forcePresent ?? !asChild" v-slot="state">
    <slot v-if="asChild" v-bind="state" />
    <UICheckboxBox v-else>
      <template v-if="$slots.default" #default>
        <slot v-if="state.isChecked" v-bind="state" />
      </template>
    </UICheckboxBox>
  </CheckboxGroupIndicator>
</template>
