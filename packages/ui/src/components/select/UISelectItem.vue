<script setup lang="ts">
import { Check } from "@lucide/vue";
import { SelectItem, SelectItemIndicator, SelectItemText, type SelectItemSlotProps } from "@sectile/vue/select";
import { useId, type Component } from "vue";
import UIItemIcon from "../UIItemIcon.vue";

defineProps<{ value: string; label: string; description?: string; disabled?: boolean; icon?: Component }>();
defineSlots<{
  default?(state: SelectItemSlotProps): unknown;
  leading?(state: SelectItemSlotProps): unknown;
  indicator?(state: SelectItemSlotProps): unknown;
}>();
const id = useId();
</script>

<template>
  <SelectItem
    v-slot="state"
    class="ui-select-item"
    :value="value"
    :disabled="disabled"
    :aria-label="label"
    :aria-describedby="description ? id : undefined"
  >
    <span v-if="icon || $slots.leading" class="ui-select-item__leading" aria-hidden="true">
      <slot name="leading" v-bind="state"><UIItemIcon v-if="icon" :icon="icon" /></slot>
    </span>
    <span class="ui-select-item__copy">
      <SelectItemText class="ui-select-item__label"><slot v-bind="state">{{ label }}</slot></SelectItemText>
      <span v-if="description" :id="id" class="ui-select-item__description">{{ description }}</span>
    </span>
    <SelectItemIndicator class="ui-select-item__indicator" force-present>
      <slot name="indicator" v-bind="state"><Check aria-hidden="true" /></slot>
    </SelectItemIndicator>
  </SelectItem>
</template>

<style scoped>
.ui-select-item:has(.ui-select-item__description) {
  min-block-size: 4rem;
}

.ui-select-item__copy {
  display: grid;
  flex: 1 1 auto;
  gap: var(--ui-space-2xs);
  min-inline-size: 0;
  word-break: keep-all;
  overflow-wrap: anywhere;
}

.ui-select-item__description {
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-metadata);
}

.ui-select-item[aria-disabled="true"] .ui-select-item__description {
  color: inherit;
}

.ui-select-item__leading {
  color: var(--ui-color-accent);
  display: grid;
  flex: none;
  place-items: center;
  inline-size: 1rem;
}

.ui-select-item__indicator {
  color: var(--ui-color-accent);
}
</style>
