<script setup lang="ts">
defineProps<{
  tone?: "neutral" | "accent" | "success" | "warning" | "danger";
}>();
</script>

<template>
  <span class="ui-data-status" :data-tone="tone">
    <slot />
  </span>
</template>

<style scoped>
.ui-data-status {
  --ui-data-status-color: var(--ui-color-text-muted);

  display: inline-flex;
  align-items: center;
  gap: var(--ui-space-xs);
  padding: var(--ui-space-2xs) var(--ui-space-sm);
  border-radius: var(--ui-radius-sm);
  background: color-mix(in srgb, var(--ui-data-status-color) 10%, var(--ui-color-surface));
  color: var(--ui-data-status-color);
  font-size: var(--ui-font-size-metadata);
  font-weight: 600;
  line-height: var(--ui-line-height-body);
  transition: background-color var(--ui-motion-fast) var(--ui-ease-out),
    color var(--ui-motion-fast) var(--ui-ease-out);
}

.ui-data-status::before {
  content: "";
  flex: 0 0 0.375rem;
  block-size: 0.375rem;
  border-radius: 50%;
  background: currentColor;
}

.ui-data-status[data-tone="accent"] { --ui-data-status-color: var(--ui-color-accent); }
.ui-data-status[data-tone="success"] { --ui-data-status-color: #20654d; }
.ui-data-status[data-tone="warning"] { --ui-data-status-color: #845417; }
.ui-data-status[data-tone="danger"] { --ui-data-status-color: var(--ui-color-danger); }
</style>
