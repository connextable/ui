<script setup lang="ts">
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
      <span class="ui-disclosure-trigger__chevron" aria-hidden="true"></span>
    </UIButton>
  </DisclosureTrigger>
</template>

<style scoped>
.ui-disclosure-trigger__chevron {
  flex: none;
  inline-size: 0.375rem;
  block-size: 0.375rem;
  border: solid currentColor;
  border-width: 0 0.09375rem 0.09375rem 0;
  transform: translateY(-0.09375rem) rotate(45deg);
  transition: transform var(--ui-motion-fast) var(--ui-ease-out);
}

.ui-disclosure-trigger[aria-expanded="true"] .ui-disclosure-trigger__chevron {
  transform: translateY(0.09375rem) rotate(225deg);
}
</style>
