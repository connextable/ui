<script setup lang="ts">
import { DisclosureTrigger } from "@sectile/vue/disclosure";
import type { Component } from "vue";
import UIButton from "../button/UIButton.vue";
import UIOpeningIcon from "../UIOpeningIcon.vue";

defineProps<{
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "soft" | "outline" | "ghost";
  icon?: Component;
}>();
</script>

<template>
  <DisclosureTrigger as-child v-slot="state">
    <UIButton class="ui-disclosure-trigger ui-opening-trigger" :size="size" :variant="variant" :icon="icon">
      <slot v-bind="state" />
      <template #trailing><UIOpeningIcon /></template>
    </UIButton>
  </DisclosureTrigger>
</template>

<style>
.ui-expandable-heading.ui-button,
.ui-disclosure[data-variant="outline"] > .ui-disclosure-trigger.ui-button {
  --ui-control-size-radius: calc(var(--ui-expandable-radius, var(--ui-radius-md)) - 1px);
  --ui-focus-ring-offset: calc(-1 * var(--ui-focus-ring-width));

  inline-size: 100%;
}

:is(.ui-expandable-heading.ui-button, .ui-disclosure[data-variant="outline"] > .ui-disclosure-trigger.ui-button)[aria-expanded="true"] {
  border-end-start-radius: 0;
  border-end-end-radius: 0;
}

.ui-expandable-heading .ui-button__content,
.ui-disclosure[data-variant="outline"] > .ui-disclosure-trigger .ui-button__content {
  inline-size: 100%;
  justify-content: flex-start;
  text-align: start;
}

:is(.ui-expandable-heading, .ui-disclosure[data-variant="outline"] > .ui-disclosure-trigger)
  .ui-button__content > .ui-button__icon:last-child {
  margin-inline-start: auto;
}
</style>
