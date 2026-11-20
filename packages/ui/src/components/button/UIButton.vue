<script setup lang="ts">
import UISpinner from "../progress/UISpinner.vue";

defineOptions({ inheritAttrs: false });
defineSlots<{
  default?(): unknown;
  leading?(): unknown;
  trailing?(): unknown;
}>();

export interface UIButtonProps {
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  loading?: boolean;
  iconOnly?: boolean;
  variant?: "solid" | "soft" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const props = withDefaults(
  defineProps<UIButtonProps>(),
  { type: "button", variant: "solid", size: "md" },
);

const emit = defineEmits<{ click: [event: MouseEvent] }>();

function onClick(event: MouseEvent) {
  if (props.loading || props.disabled) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }
  emit("click", event);
}
</script>

<template>
  <button
    v-bind="loading ? { ...$attrs, 'aria-busy': true, 'aria-disabled': true } : $attrs"
    class="ui-button"
    :type="type"
    :disabled="disabled"
    :data-loading="loading || undefined"
    :data-variant="variant"
    :data-size="size"
    :data-ui-control-size="size"
    :data-ui-control-shape="iconOnly ? 'square' : undefined"
    @click="onClick"
  >
    <span class="ui-button__content" :data-hidden="(loading && !$slots.leading && !$slots.trailing) || undefined">
      <span v-if="$slots.leading" class="ui-button__icon" aria-hidden="true">
        <UISpinner v-if="loading" variant="wave" />
        <slot v-else name="leading" />
      </span>
      <slot />
      <span v-if="$slots.trailing" class="ui-button__icon" aria-hidden="true">
        <UISpinner v-if="loading && !$slots.leading" variant="wave" />
        <slot v-else name="trailing" />
      </span>
    </span>
    <span v-if="loading && !$slots.leading && !$slots.trailing" class="ui-button__spinner" aria-hidden="true">
      <UISpinner variant="wave" />
    </span>
  </button>
</template>

<style scoped>
.ui-button {
  --ui-button-fill: var(--ui-color-accent);
  --ui-button-ink: var(--ui-color-on-accent);
  --ui-button-border: transparent;
  --ui-button-hover: var(--ui-color-accent-hover);
  --ui-button-pressed: var(--ui-color-accent-active);

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-inline-size: 100%;
  min-block-size: var(--ui-control-size-height);
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

.ui-button:enabled:not([data-loading]):hover {
  background: var(--ui-button-hover);
}

.ui-button:enabled:not([data-loading]):active,
.ui-button:enabled[aria-pressed="true"] {
  background: var(--ui-button-pressed);
}

.ui-button:focus-visible {
  outline: var(--ui-focus-ring-width) solid var(--ui-color-focus);
  outline-offset: var(--ui-focus-ring-offset);
}

.ui-button[data-variant="solid"]:focus-visible {
  outline-color: var(--ui-color-on-accent);
}

.ui-button:disabled {
  background: var(--ui-color-surface-muted);
  color: var(--ui-color-disabled);
  cursor: default;
}

.ui-button:enabled[data-loading] {
  cursor: progress;
}

.ui-button__content {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--ui-space-sm);
  min-inline-size: 0;
}

.ui-button__content[data-hidden] {
  opacity: 0;
}

.ui-button__icon {
  display: grid;
  flex: none;
  place-items: center;
  inline-size: var(--ui-control-size-icon);
  block-size: var(--ui-control-size-icon);
  font-size: var(--ui-control-size-icon);
  line-height: 1;
}

.ui-button__icon :deep(svg) {
  inline-size: 100%;
  block-size: 100%;
}

.ui-button__spinner {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  pointer-events: none;
}
</style>
