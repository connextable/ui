<script setup lang="ts">
import { ChevronRight } from "@lucide/vue";
import { MenuItem, type MenuItemProps, type MenuItemSlotProps } from "@sectile/vue/menu";
import type { Component } from "vue";

defineOptions({ inheritAttrs: false });
defineProps<MenuItemProps & {
  icon?: Component;
  tone?: "danger";
}>();
defineSlots<{
  default?(state: MenuItemSlotProps): unknown;
  leading?(state: MenuItemSlotProps): unknown;
  trailing?(state: MenuItemSlotProps): unknown;
}>();
</script>

<template>
  <MenuItem v-bind="$attrs" :value="value" :disabled="disabled" :as="as" :as-child="asChild" :data-ui-menu-tone="tone" v-slot="state">
    <span v-if="!asChild && (icon || $slots.leading)" class="ui-menu-item__leading" aria-hidden="true">
      <slot name="leading" v-bind="state"><component :is="icon" v-if="icon" /></slot>
    </span>
    <slot v-bind="state" />
    <template v-if="!asChild">
      <slot name="trailing" v-bind="state">
        <ChevronRight v-if="state.branch" class="ui-menu-item__chevron" aria-hidden="true" />
      </slot>
    </template>
  </MenuItem>
</template>
