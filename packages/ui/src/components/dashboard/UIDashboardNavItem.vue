<script setup lang="ts">
import { ChevronRight } from "@lucide/vue";
import { DisclosureTrigger } from "@sectile/vue/disclosure";
import UIButton from "../button/UIButton.vue";
import UIDisclosure from "../disclosure/UIDisclosure.vue";
import UIDisclosureContent from "../disclosure/UIDisclosureContent.vue";

const { disclosureLabel, expanded = undefined } = defineProps<{
  disclosureLabel?: string;
  expanded?: boolean;
}>();
const emit = defineEmits<{ "update:expanded": [expanded: boolean] }>();
</script>

<template>
  <UIDisclosure
    v-if="disclosureLabel && $slots.children"
    as="li"
    class="ui-dashboard-nav-item"
    :model-value="expanded"
    @update:model-value="emit('update:expanded', $event)"
  >
    <div class="ui-dashboard-nav-item__row">
      <DisclosureTrigger as-child>
        <UIButton
          class="ui-dashboard-nav-item__toggle"
          variant="ghost"
          size="sm"
          icon-only
          :aria-label="disclosureLabel"
        >
          <template #leading><ChevronRight /></template>
        </UIButton>
      </DisclosureTrigger>
      <slot />
    </div>
    <UIDisclosureContent>
      <ul class="ui-dashboard-nav-item__children" role="list">
        <slot name="children" />
      </ul>
    </UIDisclosureContent>
  </UIDisclosure>
  <li v-else class="ui-dashboard-nav-item">
    <slot />
    <ul v-if="$slots.children" class="ui-dashboard-nav-item__children" role="list"><slot name="children" /></ul>
  </li>
</template>

<style scoped>
.ui-dashboard-nav-item {
  min-inline-size: 0;
}

.ui-dashboard-nav-item__row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  border-radius: var(--ui-control-radius);
  background: var(--ui-dashboard-nav-row-fill, transparent);
}

.ui-dashboard-nav-item__row:hover {
  --ui-dashboard-nav-row-fill: var(--ui-color-surface-hover);
}

.ui-dashboard-nav-item__row:has(> a[aria-current]:not([aria-current="false"])) {
  --ui-dashboard-nav-row-fill: var(--ui-color-accent-soft);
  --ui-dashboard-nav-chevron-color: var(--ui-color-accent);
}

.ui-dashboard-nav-item__toggle {
  color: var(--ui-dashboard-nav-chevron-color, var(--ui-color-text));
}

.ui-dashboard-nav-item__toggle :deep(svg) {
  transition: rotate var(--ui-motion-fast) var(--ui-ease-out);
}

.ui-dashboard-nav-item__toggle[aria-expanded="true"] :deep(svg) {
  rotate: 90deg;
}

.ui-dashboard-nav-item__row :slotted(a) {
  padding-inline-start: var(--ui-space-xs);
}

:slotted(a) {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  gap: 0.625rem;
  min-block-size: var(--ui-dashboard-nav-item-height, var(--ui-control-height));
  padding: var(--ui-dashboard-nav-item-padding-block, 0.5rem) var(--ui-control-padding-inline);
  border-radius: var(--ui-control-radius);
  color: var(--ui-color-text);
  font-size: var(--ui-dashboard-nav-item-font-size, 0.9375rem);
  text-decoration: none;
  overflow-wrap: anywhere;
}

:slotted(a:hover) {
  background: var(--ui-color-surface-hover);
}

:slotted(a[aria-current]:not([aria-current="false"])) {
  background: var(--ui-color-accent-soft);
  color: var(--ui-color-accent);
  font-weight: 650;
}

.ui-dashboard-nav-item__row :slotted(a:is(:hover, [aria-current])) {
  background: transparent;
}

:slotted(a:focus-visible) {
  outline: var(--ui-focus-ring-width) solid var(--ui-color-focus);
  outline-offset: var(--ui-focus-ring-offset);
}

.ui-dashboard-nav-item__children {
  --ui-dashboard-nav-item-height: var(--ui-control-height-small);
  --ui-dashboard-nav-item-padding-block: 0.25rem;
  --ui-dashboard-nav-item-font-size: 0.875rem;

  display: grid;
  gap: 0.125rem;
  margin-block: 0.125rem 0.375rem;
  margin-inline: var(--ui-control-padding-inline) 0;
  padding: 0;
  padding-inline-start: 0.25rem;
  border-inline-start: 1px solid var(--ui-color-divider);
  list-style: none;
}
</style>
