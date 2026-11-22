<script setup lang="ts">
import type { Component } from "vue";
import UIItemIcon from "../UIItemIcon.vue";

defineProps<{ label: string; detail?: string; icon?: Component }>();
</script>

<template>
  <span class="ui-data-label">
    <span v-if="icon || $slots.icon" class="ui-data-label__icon"><slot name="icon"><UIItemIcon :icon="icon" /></slot></span>
    <span class="ui-data-label__text">
      <strong>{{ label }}</strong>
      <span v-if="detail" class="ui-data-label__detail">{{ detail }}</span>
    </span>
  </span>
</template>

<style scoped>
.ui-data-label {
  display: inline-flex;
  align-items: center;
  gap: var(--ui-space-sm);
  min-inline-size: 0;
}

.ui-data-label__icon {
  display: inline-grid;
  flex: none;
  place-items: center;
  inline-size: 1.75rem;
  aspect-ratio: 1;
  border-radius: var(--ui-radius-sm);
  background: var(--ui-color-accent-soft);
  color: var(--ui-color-accent);
}

.ui-data-label__text {
  display: grid;
  min-inline-size: 0;
  overflow-wrap: anywhere;
}

.ui-data-label__text strong {
  font-weight: 650;
}

.ui-data-label__detail {
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-metadata);
}
</style>
