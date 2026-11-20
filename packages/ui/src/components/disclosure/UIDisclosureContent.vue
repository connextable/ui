<script setup lang="ts">
import { DisclosureContent, type DisclosureContentProps, type DisclosureSlotProps } from "@sectile/vue/disclosure";

const { divided, forcePresent = true, ...contentProps } = defineProps<
  Omit<DisclosureContentProps, "asChild"> & { divided?: boolean }
>();
defineSlots<{ default?(state: DisclosureSlotProps): unknown }>();
</script>

<template>
  <DisclosureContent v-bind="contentProps" v-slot="state" class="ui-disclosure-content" :force-present="forcePresent">
    <div class="ui-disclosure-content__clip">
      <div v-if="divided" class="ui-disclosure-content__divider" aria-hidden="true"></div>
      <slot v-bind="state" />
    </div>
  </DisclosureContent>
</template>

<style scoped>
.ui-disclosure-content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--ui-motion-standard) var(--ui-ease-out);
}

.ui-disclosure-content[data-state="open"] {
  grid-template-rows: 1fr;
}

.ui-disclosure-content__clip {
  min-block-size: 0;
  min-inline-size: 0;
  overflow: hidden;
}

.ui-disclosure-content__divider {
  border-block-start: 1px solid var(--ui-color-divider);
}
</style>
