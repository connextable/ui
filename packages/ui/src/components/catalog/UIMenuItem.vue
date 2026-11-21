<script setup lang="ts">
import { ChevronRight } from "@lucide/vue";
import { MenuItem, type MenuItemProps, type MenuItemSlotProps } from "@sectile/vue/menu";

defineOptions({ inheritAttrs: false });
const props = defineProps<MenuItemProps>();
defineSlots<{
  default?(state: MenuItemSlotProps): unknown;
  trailing?(state: MenuItemSlotProps): unknown;
}>();
</script>

<template>
  <MenuItem v-bind="{ ...$attrs, ...props }" v-slot="state">
    <slot v-bind="state" />
    <template v-if="!asChild">
      <slot name="trailing" v-bind="state">
        <ChevronRight v-if="state.branch" class="ui-menu-item__chevron" aria-hidden="true" />
      </slot>
    </template>
  </MenuItem>
</template>
