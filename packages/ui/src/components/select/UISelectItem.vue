<script setup lang="ts">
import { SelectItem, SelectItemIndicator, SelectItemText } from "@sectile/vue/select";
import { useId } from "vue";

defineProps<{ value: string; label: string; description?: string; disabled?: boolean }>();
const id = useId();
</script>

<template>
  <SelectItem
    class="ui-select-item"
    :value="value"
    :disabled="disabled"
    :aria-label="label"
    :aria-describedby="description ? id : undefined"
  >
    <span v-if="$slots.leading" class="ui-select-item__leading" aria-hidden="true">
      <slot name="leading" />
    </span>
    <span class="ui-select-item__copy">
      <SelectItemText class="ui-select-item__label"><slot>{{ label }}</slot></SelectItemText>
      <span v-if="description" :id="id" class="ui-select-item__description">{{ description }}</span>
    </span>
    <SelectItemIndicator class="ui-select-item__indicator" force-present>
      <slot name="indicator"><span class="ui-select-item__check"></span></slot>
    </SelectItemIndicator>
  </SelectItem>
</template>

<style scoped>
.ui-select-item {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  gap: var(--ui-space-md);
  min-block-size: 2.75rem;
  padding: 0.625rem var(--ui-space-md);
  border-radius: calc(var(--ui-select-content-radius) - var(--ui-select-content-padding) - 1px);
  font-size: var(--ui-font-size-body-sm);
  font-weight: 500;
  line-height: 1.35;
  cursor: pointer;
  transition: background-color var(--ui-motion-fast) var(--ui-ease-out);
}

.ui-select-item:has(.ui-select-item__description) {
  min-block-size: 4rem;
  padding-block: var(--ui-space-md);
}

.ui-select-item:focus-visible {
  outline: 1px solid var(--ui-color-focus);
  outline-offset: -1px;
}

.ui-select-item[data-highlighted]:not([aria-selected="true"], [aria-disabled="true"]) {
  background: var(--ui-color-surface-hover);
}

.ui-select-item:active:not([aria-selected="true"], [aria-disabled="true"]) {
  background: var(--ui-color-surface-active);
}

@media (hover: hover) {
  .ui-select-item:hover:not(:active, [aria-selected="true"], [aria-disabled="true"]) {
    background: var(--ui-color-surface-hover);
  }
}

.ui-select-item[aria-disabled="true"] {
  color: var(--ui-color-disabled);
  cursor: not-allowed;
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

.ui-select-item__leading,
.ui-select-item__indicator {
  color: var(--ui-color-accent);
  display: grid;
  flex: none;
  place-items: center;
  inline-size: 1rem;
}

.ui-select-item__indicator {
  opacity: 0;
  scale: 0.75;
  transition:
    opacity var(--ui-motion-fast) var(--ui-ease-out),
    scale var(--ui-motion-fast) var(--ui-ease-out);
}

.ui-select-item__indicator[data-state="checked"] {
  opacity: 1;
  scale: 1;
}

.ui-select-item__check {
  inline-size: 0.3125rem;
  block-size: 0.5625rem;
  border: solid currentColor;
  border-width: 0 0.125rem 0.125rem 0;
  transform: translateY(-0.0625rem) rotate(45deg);
}
</style>
