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
        <ChevronDown class="ui-disclosure-trigger__chevron" />
      </template>
    </UIButton>
  </DisclosureTrigger>
</template>

<style scoped>
.ui-disclosure-trigger__chevron {
  transition: transform var(--ui-motion-fast) var(--ui-ease-out);
}

.ui-disclosure-trigger[aria-expanded="true"] .ui-disclosure-trigger__chevron {
  transform: rotate(180deg);
}
</style>
