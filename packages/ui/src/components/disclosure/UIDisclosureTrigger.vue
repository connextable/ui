<script setup lang="ts">
import { ChevronDown } from "@lucide/vue";
import { DisclosureTrigger } from "@sectile/vue/disclosure";
import UIButton from "../button/UIButton.vue";

defineProps<{
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "soft" | "outline" | "ghost";
}>();
</script>

<template>
  <DisclosureTrigger as-child v-slot="state">
    <UIButton class="ui-disclosure-trigger" :size="size" :variant="variant">
      <slot v-bind="state" />
      <template #trailing>
        <ChevronDown class="ui-expandable-chevron" />
      </template>
    </UIButton>
  </DisclosureTrigger>
</template>

<style>
.ui-expandable-chevron {
  transition: transform var(--ui-motion-fast) var(--ui-ease-out);
}

[aria-expanded="true"] .ui-expandable-chevron {
  transform: rotate(180deg);
}

.ui-expandable-heading.ui-button,
.ui-disclosure[data-variant="outline"] > .ui-disclosure-trigger.ui-button {
  inline-size: 100%;
}

.ui-expandable-heading .ui-button__content,
.ui-disclosure[data-variant="outline"] > .ui-disclosure-trigger .ui-button__content {
  inline-size: 100%;
  justify-content: space-between;
  text-align: start;
}
</style>
