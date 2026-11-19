<script setup lang="ts">
import { useId } from "vue";

defineProps<{ label: string }>();

const labelId = useId();
</script>

<template>
  <div>
    <h2 :id="labelId" class="ui-dashboard-nav-group__label">{{ label }}</h2>
    <ul :aria-labelledby="labelId" class="ui-dashboard-nav-group__items" role="list">
      <slot />
    </ul>
  </div>
</template>

<style scoped>
.ui-dashboard-nav-group__label {
  margin: 0 0 0.375rem;
  padding-inline: var(--ui-control-padding-inline);
  color: color-mix(in srgb, var(--ui-color-text) 72%, var(--ui-color-surface));
  font-size: 0.8125rem;
  font-weight: 600;
  overflow-wrap: anywhere;
}

.ui-dashboard-nav-group__items {
  display: grid;
  gap: 0.125rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
