<script setup lang="ts">
import type { Component } from "vue";

defineProps<{ icon?: Component }>();
</script>

<template>
  <span v-if="icon" class="ui-item-icon" aria-hidden="true">
    <component :is="icon" focusable="false" />
  </span>
</template>

<style scoped>
.ui-item-icon {
  display: inline-grid;
  flex: none;
  place-items: center;
  inline-size: var(--ui-icon-size, 1rem);
  block-size: var(--ui-icon-size, 1rem);
  vertical-align: -0.125em;
}

.ui-item-icon :deep(svg) {
  display: block;
  inline-size: 100%;
  block-size: 100%;
}
</style>
