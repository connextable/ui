<script setup lang="ts">
import { Check, Minus } from "@lucide/vue";
</script>

<template>
  <span class="ui-checkbox__box">
    <slot name="control" />
    <span class="ui-checkbox__marks" aria-hidden="true">
      <slot>
        <Check class="ui-checkbox__mark ui-checkbox__mark--checked" :stroke-width="3" />
        <Minus class="ui-checkbox__mark ui-checkbox__mark--mixed" :stroke-width="3" />
      </slot>
    </span>
  </span>
</template>

<style scoped>
.ui-checkbox__box {
  position: relative;
  display: inline-grid;
  flex: none;
  place-items: center;
  box-sizing: border-box;
  inline-size: 1.25rem;
  block-size: 1.25rem;
  border: 1px solid var(--ui-color-border-strong);
  border-radius: 0.3125rem;
  background: var(--ui-color-surface);
  color: var(--ui-color-on-accent);
  vertical-align: middle;
  transition:
    background-color var(--ui-motion-fast) var(--ui-ease-out),
    border-color var(--ui-motion-fast) var(--ui-ease-out);
}

:is(.ui-checkbox, [data-scope="checkbox-group"][data-part="item"], [data-scope="checkbox-tree"][data-part="item"]):is([aria-checked="true"], [aria-checked="mixed"]) .ui-checkbox__box,
.ui-checkbox__box:has(> .ui-checkbox__control:is(:checked, :indeterminate, [aria-checked="true"], [aria-checked="mixed"])) {
  border-color: var(--ui-color-accent);
  background: var(--ui-color-accent);
}

.ui-checkbox__box > :slotted(.ui-checkbox__control) {
  position: absolute;
  inset: -1px;
  box-sizing: border-box;
  inline-size: calc(100% + 2px);
  block-size: calc(100% + 2px);
  min-inline-size: 0;
  min-block-size: 0;
  max-inline-size: none;
  margin: 0;
  padding: 0;
  border: 0;
  opacity: 0;
  cursor: pointer;
}

.ui-checkbox__box:has(> .ui-checkbox__control:focus-visible) {
  outline: var(--ui-focus-ring-width) solid var(--ui-color-focus);
  outline-offset: var(--ui-focus-ring-offset);
}

.ui-checkbox__box:has(> .ui-checkbox__control:disabled) {
  opacity: 0.55;
}

.ui-checkbox__box > :slotted(.ui-checkbox__control:disabled) {
  cursor: not-allowed;
}

.ui-checkbox__marks {
  display: grid;
  place-items: center;
  pointer-events: none;
}

.ui-checkbox__mark {
  grid-area: 1 / 1;
  opacity: 0;
  scale: 0.65;
  transition:
    opacity var(--ui-motion-fast) var(--ui-ease-out),
    scale var(--ui-motion-standard) var(--ui-ease-out);
}

:is(.ui-checkbox, [data-scope="checkbox-group"][data-part="item"], [data-scope="checkbox-tree"][data-part="item"])[aria-checked="true"] .ui-checkbox__mark--checked,
.ui-checkbox__box:has(> .ui-checkbox__control:is(:checked:not(:indeterminate), [aria-checked="true"])) .ui-checkbox__mark--checked,
:is(.ui-checkbox, [data-scope="checkbox-tree"][data-part="item"])[aria-checked="mixed"] .ui-checkbox__mark--mixed,
.ui-checkbox__box:has(> .ui-checkbox__control:is(:indeterminate, [aria-checked="mixed"])) .ui-checkbox__mark--mixed {
  opacity: 1;
  scale: 1;
}
</style>
