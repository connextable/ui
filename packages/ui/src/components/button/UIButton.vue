<script setup lang="ts">
import { computed } from "vue";
import type { RouteLocationRaw } from "vue-router";
import UISpinner from "../progress/UISpinner.vue";
import { useLinkComponent, type LinkPrefetchProps } from "../link-component";

defineOptions({ inheritAttrs: false });
defineSlots<{
  default?(): unknown;
  leading?(): unknown;
  trailing?(): unknown;
  loading?(): unknown;
}>();

export interface UIButtonProps extends LinkPrefetchProps {
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  loading?: boolean;
  block?: boolean;
  iconOnly?: boolean;
  variant?: "solid" | "soft" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  to?: RouteLocationRaw;
  target?: string;
  rel?: string;
  download?: string | boolean;
  external?: boolean;
}

const props = withDefaults(
  defineProps<UIButtonProps>(),
  { type: "button", variant: "solid", size: "md", prefetch: undefined, noPrefetch: undefined },
);

const emit = defineEmits<{ click: [event: MouseEvent] }>();
const linkComponent = useLinkComponent();
const destination = computed(() => props.to ?? props.href);
const isLink = computed(() => destination.value != null);
const nativeHref = computed(() => typeof destination.value === "string" ? destination.value : props.href);
const routerLink = computed(() => isLink.value && !props.disabled && !props.loading
  && (props.download == null || props.download === false) ? linkComponent : null);
const linkDisabled = computed(() => isLink.value && (props.disabled || props.loading
  || (!routerLink.value && nativeHref.value == null)));
const elementProps = computed(() => {
  if (!isLink.value) return { type: props.type, disabled: props.disabled };

  if (routerLink.value) {
    return {
      to: destination.value,
      target: props.target,
      rel: props.rel,
      external: props.external,
      prefetch: props.prefetch,
      prefetchOn: props.prefetchOn,
      noPrefetch: props.noPrefetch,
    };
  }

  if (linkDisabled.value) return { role: "link", tabindex: -1 };

  return {
    href: nativeHref.value,
    target: props.target,
    rel: props.rel ?? (props.target === "_blank" ? "noopener noreferrer" : undefined),
    download: props.download,
  };
});

function onClick(event: MouseEvent) {
  if (props.loading || props.disabled || linkDisabled.value) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }
  emit("click", event);
}
</script>

<template>
  <component
    :is="routerLink ?? (isLink ? 'a' : 'button')"
    v-bind="{ ...$attrs, ...elementProps, ...(loading ? { 'aria-busy': true } : {}),
      ...(loading || linkDisabled ? { 'aria-disabled': true } : {}) }"
    class="ui-button"
    :data-disabled="disabled || (linkDisabled && !loading) || undefined"
    :data-loading="loading || undefined"
    :data-block="(block && !iconOnly) || undefined"
    :data-variant="variant"
    :data-size="size"
    :data-ui-control-size="size"
    :data-ui-control-shape="iconOnly ? 'square' : undefined"
    @click.capture="routerLink && onClick($event)"
    @click="!routerLink && onClick($event)"
  >
    <span class="ui-button__content" :data-hidden="loading || undefined">
      <span v-if="$slots.leading" class="ui-button__icon" aria-hidden="true">
        <slot name="leading" />
      </span>
      <slot />
      <span v-if="$slots.trailing" class="ui-button__icon" aria-hidden="true">
        <slot name="trailing" />
      </span>
    </span>
    <Transition name="ui-button-loading">
      <span v-if="loading" class="ui-button__spinner" aria-hidden="true">
        <span class="ui-button__icon">
          <slot name="loading"><UISpinner variant="wave" /></slot>
        </span>
      </span>
    </Transition>
  </component>
</template>

<style scoped>
.ui-button {
  --ui-button-fill: var(--ui-color-accent);
  --ui-button-ink: var(--ui-color-on-accent);
  --ui-button-border: transparent;
  --ui-button-hover: var(--ui-color-accent-hover);
  --ui-button-pressed: var(--ui-color-accent-active);

  position: relative;
  box-sizing: border-box;
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
  text-decoration: none;
  overflow-wrap: anywhere;
  cursor: pointer;
  transition: background-color var(--ui-motion-fast) var(--ui-ease-out);
}

.ui-button[data-block] {
  display: flex;
  inline-size: 100%;
}

.ui-button[data-ui-control-shape="square"] {
  border-radius: var(--ui-button-icon-radius, 50%);
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

.ui-button:not(:disabled, [data-disabled], [data-loading], [data-readonly]):hover {
  background: var(--ui-button-hover);
}

.ui-button:not(:disabled, [data-disabled], [data-loading], [data-readonly]):active,
.ui-button:not(:disabled, [data-disabled])[aria-pressed="true"] {
  background: var(--ui-button-pressed);
}

.ui-button:focus-visible {
  outline: var(--ui-focus-ring-width) solid var(--ui-color-focus);
  outline-offset: var(--ui-focus-ring-offset);
}

.ui-button[data-variant="solid"]:focus-visible {
  outline-color: var(--ui-color-on-accent);
}

.ui-button:is(:disabled, [data-disabled]) {
  background: var(--ui-input-state-surface, var(--ui-color-surface-muted));
  color: var(--ui-input-state-ink, var(--ui-color-disabled));
  cursor: not-allowed;
}

.ui-button[data-readonly]:not(:disabled, [data-disabled]) {
  background: var(--ui-input-state-surface);
  color: var(--ui-color-text);
  cursor: var(--ui-input-state-cursor);
}

.ui-button[data-readonly][aria-pressed="true"]:not(:disabled, [data-disabled]) {
  border-color: var(--ui-color-accent);
}

.ui-button:not(:disabled, [data-disabled])[data-loading] {
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

@media (prefers-reduced-motion: no-preference) {
  .ui-button__content,
  .ui-button-loading-enter-active,
  .ui-button-loading-leave-active {
    transition:
      opacity var(--ui-motion-fast) var(--ui-ease-out),
      transform var(--ui-motion-standard) var(--ui-ease-out);
  }

  .ui-button__content[data-hidden] {
    transform: translateY(-0.25rem) scale(0.92);
  }

  .ui-button-loading-enter-from,
  .ui-button-loading-leave-to {
    opacity: 0;
    transform: translateY(0.375rem) scale(0.65);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ui-button-loading-leave-active {
    opacity: 0;
  }
}
</style>
