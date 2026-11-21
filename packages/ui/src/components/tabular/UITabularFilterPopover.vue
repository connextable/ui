<script setup lang="ts">
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTitle, PopoverTrigger } from "@sectile/vue/popover";
import UITabularColumnAction from "./UITabularColumnAction.vue";

defineProps<{ label: string; value?: string }>();
defineSlots<{ default?(scope: { value: string }): unknown }>();
</script>

<template>
  <PopoverRoot class="ui-tabular-filter-root" side="bottom" align="start" :side-offset="6" strategy="fixed"
    auto-focus restore-focus unmount-on-exit
  >
    <PopoverTrigger as-child>
      <UITabularColumnAction kind="filter" :label="label" :active="Boolean(value)" />
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent class="ui-tabular-filter-popover">
        <PopoverTitle class="ui-tabular-filter-popover__title">{{ label }}</PopoverTitle>
        <slot :value="value ?? ''" />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<style>
.ui-tabular-filter-root {
  display: flex;
}

.ui-tabular-filter-popover {
  inline-size: 15rem;
}

.ui-tabular-filter-popover:not([hidden]) {
  display: grid;
  gap: var(--ui-space-sm);
}

.ui-tabular-filter-popover__title {
  margin: 0;
  color: var(--ui-color-text);
  font-size: var(--ui-font-size-body-sm);
  font-weight: 650;
}

.ui-tabular-filter-popover [data-part="filter-control"] {
  inline-size: 100%;
  margin: 0;
}
</style>
