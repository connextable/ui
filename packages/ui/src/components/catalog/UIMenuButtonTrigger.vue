<script setup lang="ts">
import { ChevronDown } from "@lucide/vue";
import { MenuButtonTrigger, type MenuPartProps, type MenuRootSlotProps } from "@sectile/vue/menu";

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
    <template v-else>
      <span v-if="$slots.leading" class="ui-popup-trigger__leading" aria-hidden="true"><slot name="leading" /></span>
      <slot v-bind="state" />
      <span class="ui-popup-trigger__indicator" aria-hidden="true">
        <slot name="trailing"><ChevronDown class="ui-popup-trigger__chevron" /></slot>
      </span>
    </template>
  </MenuButtonTrigger>
</template>
