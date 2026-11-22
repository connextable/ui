<script setup lang="ts">
import { CascadeSelectTrigger } from "@sectile/vue/cascade-select";
import type { MenuPartProps } from "@sectile/vue/menu";
import UIControlClearFrame from "../clear/UIControlClearFrame.vue";
import UIPopupTriggerContent from "./UIPopupTriggerContent.vue";

defineOptions({ inheritAttrs: false });
const { as, asChild, size = "md", variant = "outline" } = defineProps<MenuPartProps & {
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "soft";
}>();
</script>

<template>
  <UIControlClearFrame :indicator="!asChild" :size="size" :active="!asChild">
    <CascadeSelectTrigger
      v-bind="$attrs"
      v-slot="state"
      :as="as"
      :as-child="asChild"
      :class="asChild ? undefined : 'ui-field-control ui-popup-trigger'"
      :data-ui-control-size="asChild ? undefined : size"
      :data-variant="asChild ? undefined : variant"
    >
      <slot v-if="asChild" v-bind="state" />
      <UIPopupTriggerContent v-else :hide-indicator="state.readonly">
        <template v-if="$slots.leading" #leading><slot name="leading" /></template>
        <slot v-bind="state" />
        <template v-if="$slots.trailing" #trailing><slot name="trailing" /></template>
      </UIPopupTriggerContent>
    </CascadeSelectTrigger>
  </UIControlClearFrame>
</template>
