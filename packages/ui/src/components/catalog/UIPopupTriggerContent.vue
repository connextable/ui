<script setup lang="ts">
import UIOpeningIcon from "../UIOpeningIcon.vue";

defineProps<{ hideIndicator?: boolean }>();
</script>

<template>
  <span v-if="$slots.leading" class="ui-popup-trigger__leading" aria-hidden="true">
    <slot name="leading" />
  </span>
  <slot />
  <span v-if="!hideIndicator || $slots.trailing" class="ui-popup-trigger__indicator" aria-hidden="true">
    <UIOpeningIcon>
      <template v-if="$slots.trailing" #default><slot name="trailing" /></template>
    </UIOpeningIcon>
  </span>
</template>
