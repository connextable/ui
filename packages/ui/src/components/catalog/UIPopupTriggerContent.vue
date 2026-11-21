<script setup lang="ts">
import { ChevronDown } from "@lucide/vue";

defineProps<{ hideIndicator?: boolean }>();
</script>

<template>
  <span v-if="$slots.leading" class="ui-popup-trigger__leading" aria-hidden="true">
    <slot name="leading" />
  </span>
  <slot />
  <span v-if="!hideIndicator || $slots.trailing" class="ui-popup-trigger__indicator" aria-hidden="true">
    <slot name="trailing"><ChevronDown class="ui-popup-trigger__chevron" /></slot>
  </span>
</template>
