<script setup lang="ts">
import { MenuButtonTrigger, type MenuPartProps, type MenuRootSlotProps } from "@sectile/vue/menu";
import UIPopupTriggerContent from "./UIPopupTriggerContent.vue";

defineOptions({ inheritAttrs: false });
const { as, asChild, size = "md", variant = "outline" } = defineProps<MenuPartProps & {
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "soft";
}>();
defineSlots<{
  default?(state: MenuRootSlotProps): unknown;
  leading?(): unknown;
  trailing?(): unknown;
}>();
</script>

<template>
  <MenuButtonTrigger
    v-bind="$attrs"
    v-slot="state"
    :as="as"
    :as-child="asChild"
    :class="asChild ? undefined : 'ui-field-control ui-popup-trigger'"
    :data-ui-control-size="asChild ? undefined : size"
    :data-variant="asChild ? undefined : variant"
  >
    <slot v-if="asChild" v-bind="state" />
    <UIPopupTriggerContent v-else>
      <template v-if="$slots.leading" #leading><slot name="leading" /></template>
      <slot v-bind="state" />
      <template v-if="$slots.trailing" #trailing><slot name="trailing" /></template>
    </UIPopupTriggerContent>
  </MenuButtonTrigger>
</template>
