<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: "button" | "reset" | "submit";
    disabled?: boolean;
    variant?: "solid" | "soft" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
  }>(),
  { type: "button", variant: "solid", size: "md" },
);
</script>

<template>
  <button
    class="ui-button"
    :type="type"
    :disabled="disabled"
    :data-variant="variant"
    :data-size="size"
    :data-ui-control-size="size"
  >
    <slot />
  </button>
</template>

<style scoped>
.ui-button {
  --ui-button-fill: var(--ui-color-accent);
  --ui-button-ink: var(--ui-color-on-accent);
  --ui-button-border: transparent;
  --ui-button-hover: var(--ui-color-accent-hover);
  --ui-button-pressed: var(--ui-color-accent-active);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  max-inline-size: 100%;
  min-block-size: var(--ui-control-size-height);
  padding: 0.375rem var(--ui-control-size-padding-inline);
  border: 1px solid var(--ui-button-border);
  border-radius: var(--ui-control-size-radius);
  background: var(--ui-button-fill);
  color: var(--ui-button-ink);
  font: 600 var(--ui-control-size-font)/1.35 var(--ui-font-sans);
  overflow-wrap: anywhere;
  cursor: pointer;
  transition: background-color var(--ui-motion-fast) var(--ui-ease-out);
}

.ui-button[data-variant="soft"],
.ui-button[data-variant="outline"],
.ui-button[data-variant="ghost"] {
  --ui-button-ink: var(--ui-color-text);
  --ui-button-hover: var(--ui-color-surface-hover);
  --ui-button-pressed: var(--ui-color-surface-active);
}

.ui-button[data-variant="soft"] {
  --ui-button-ink: var(--ui-color-accent);
  --ui-button-fill: var(--ui-color-accent-soft);
  --ui-button-hover: color-mix(in srgb, var(--ui-color-accent) 17%, var(--ui-color-surface));
  --ui-button-pressed: color-mix(in srgb, var(--ui-color-accent) 24%, var(--ui-color-surface));
}

.ui-button[data-variant="outline"] {
  --ui-button-fill: var(--ui-color-surface);
  --ui-button-border: var(--ui-color-border);
}

.ui-button[data-variant="ghost"] {
  --ui-button-fill: transparent;
}

.ui-button:enabled:hover {
  background: var(--ui-button-hover);
}

.ui-button:enabled:active,
.ui-button:enabled[aria-pressed="true"] {
  background: var(--ui-button-pressed);
}

.ui-button:focus-visible {
  outline: 2px solid var(--ui-color-focus);
  outline-offset: 2px;
}

.ui-button:disabled {
  background: var(--ui-color-surface-muted);
  color: var(--ui-color-disabled);
  cursor: default;
}
</style>
