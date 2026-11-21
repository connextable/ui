<script setup lang="ts">
defineProps<{ label?: string }>();
</script>

<template>
  <div
    class="ui-dashboard-toolbar"
    :role="label ? 'group' : undefined"
    :aria-label="label"
  >
    <div class="ui-dashboard-toolbar__controls">
      <slot />
    </div>
    <div v-if="$slots.trailing" class="ui-dashboard-toolbar__controls ui-dashboard-toolbar__trailing">
      <slot name="trailing" />
    </div>
  </div>
</template>

<style scoped>
.ui-dashboard-toolbar {
  padding: var(--ui-space-sm) var(--ui-dashboard-bar-padding-inline, 1.25rem);
  border-block-start: 1px solid var(--ui-color-divider);
  background: var(--ui-dashboard-toolbar-background, var(--ui-color-surface-muted));
}

.ui-dashboard-toolbar__controls {
  min-inline-size: 0;
}

.ui-dashboard-toolbar__trailing {
  margin-inline-start: auto;
}
</style>
