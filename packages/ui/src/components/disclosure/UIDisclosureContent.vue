<script setup lang="ts">
import { DisclosureContent, type DisclosureContentProps, type DisclosureSlotProps } from "@sectile/vue/disclosure";

const { divided, flush, forcePresent = true, ...contentProps } = defineProps<
  Omit<DisclosureContentProps, "asChild"> & { divided?: boolean; flush?: boolean }
>();
defineSlots<{ default?(state: DisclosureSlotProps): unknown }>();
</script>

<template>
  <DisclosureContent v-bind="contentProps" v-slot="state" class="ui-expandable-content" :force-present="forcePresent">
    <div class="ui-expandable-clip">
      <div v-if="divided" class="ui-disclosure-content__divider" aria-hidden="true"></div>
      <slot v-if="flush" v-bind="state" />
      <div v-else class="ui-expandable-body"><slot v-bind="state" /></div>
    </div>
  </DisclosureContent>
</template>

<style>
.ui-disclosure-content__divider {
  border-block-start: 1px solid var(--ui-color-divider);
}
</style>
