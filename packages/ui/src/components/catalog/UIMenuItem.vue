<script setup lang="ts">
import { ChevronRight } from "@lucide/vue";
import type { MenuItemProps, MenuItemSlotProps } from "@sectile/vue/menu";
import type { Component } from "vue";
import type { RouteLocationRaw } from "vue-router";
import type { LinkPrefetchProps } from "../link-component";
import { MenuItemLink } from "./menu-item-link";

defineOptions({ inheritAttrs: false });
withDefaults(defineProps<MenuItemProps & LinkPrefetchProps & {
  icon?: Component;
  tone?: "danger";
  href?: string;
  to?: RouteLocationRaw;
  external?: boolean;
  replace?: boolean;
}>(), { prefetch: undefined, noPrefetch: undefined });
defineSlots<{
  default?(state: MenuItemSlotProps): unknown;
  leading?(state: MenuItemSlotProps): unknown;
  trailing?(state: MenuItemSlotProps): unknown;
}>();
</script>

<template>
  <MenuItemLink
    v-bind="$attrs"
    :value="value"
    :disabled="disabled"
    :as="as"
    :as-child="asChild"
    :href="href"
    :to="to"
    :external="external"
    :replace="replace"
    :prefetch="prefetch"
    :prefetch-on="prefetchOn"
    :no-prefetch="noPrefetch"
    :data-ui-menu-tone="tone"
    v-slot="state"
  >
    <span v-if="!asChild && (icon || $slots.leading)" class="ui-menu-item__leading" aria-hidden="true">
      <slot name="leading" v-bind="state"><component :is="icon" v-if="icon" /></slot>
    </span>
    <slot v-bind="state" />
    <template v-if="!asChild">
      <slot name="trailing" v-bind="state">
        <span v-if="state.branch" class="ui-inset-icon ui-menu-item__chevron" aria-hidden="true">
          <ChevronRight />
        </span>
      </slot>
    </template>
  </MenuItemLink>
</template>
