<script setup lang="ts">
import { SwitchRoot, SwitchThumb, type SwitchSlotProps } from "@sectile/vue/switch";
import { useId, type Component } from "vue";
import { definedControlAttrs, useInputState, type FormControlProps } from "../control-attrs";
import UIItemIcon from "../UIItemIcon.vue";

defineOptions({ inheritAttrs: false, __sectileFormLabelMode: "labelledby" });

const {
  label,
  icon,
  description,
  variant = "plain",
  size = "md",
  modelValue = undefined,
  disabled = undefined,
  readonly = undefined,
  required = undefined,
  ...controlProps
} = defineProps<{
  label?: string;
  icon?: Component;
  description?: string;
  variant?: "plain" | "outline" | "card";
  size?: "sm" | "md" | "lg";
  modelValue?: boolean;
  defaultValue?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  value?: string;
} & FormControlProps>();

const emit = defineEmits<{ "update:modelValue": [value: boolean] }>();
defineSlots<{
  label?(state: SwitchSlotProps): unknown;
  thumb?(state: SwitchSlotProps): unknown;
}>();
const id = useId();
const state = useInputState({ get disabled() { return disabled; }, get readonly() { return readonly; }, get required() { return required; } });
</script>

<template>
  <SwitchRoot
    v-bind="definedControlAttrs({
      ...$attrs,
      ...controlProps,
      disabled,
      readonly,
      required: state.required.value && state.editable.value,
      'aria-labelledby': $attrs['aria-labelledby'] ?? (label || $slots.label ? `${id}-label` : undefined),
      'aria-describedby': [$attrs['aria-describedby'], description && `${id}-description`].filter(Boolean).join(' ') || undefined,
    })"
    v-slot="state"
    class="ui-choice ui-switch"
    :model-value="modelValue"
    :data-variant="variant"
    :data-ui-control-size="size"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <UIItemIcon v-if="icon" :icon="icon" />
    <span v-if="label || $slots.label || description" class="ui-choice__copy">
      <span v-if="label || $slots.label" :id="`${id}-label`" class="ui-choice__label"><slot name="label" v-bind="state">{{ label }}</slot></span>
      <span v-if="description" :id="`${id}-description`" class="ui-choice__description">
        {{ description }}
      </span>
    </span>
    <span class="ui-switch__track" aria-hidden="true">
      <SwitchThumb class="ui-switch__thumb"><slot name="thumb" v-bind="state" /></SwitchThumb>
    </span>
  </SwitchRoot>
</template>

<style scoped>
.ui-switch[data-ui-control-size] {
  min-inline-size: var(--ui-control-size-height);
  min-block-size: var(--ui-control-size-height);
  border-radius: var(--ui-control-size-radius);
  font-size: var(--ui-control-size-font);
}

.ui-switch[data-variant="card"][aria-checked="true"] {
  border-color: var(--ui-color-divider);
}

.ui-switch:is([data-variant="plain"], [data-variant="outline"]) {
  gap: var(--ui-space-sm);
  padding-inline: var(--ui-space-sm);
  background: transparent;
}

.ui-switch__track {
  --ui-switch-thumb-size: calc(var(--ui-control-size-icon) - var(--ui-space-2xs));
  --ui-switch-track-padding: 0.1875rem;
  --ui-switch-track-radius: var(--ui-radius-sm);
  --ui-switch-travel: var(--ui-control-size-icon);
  --ui-switch-direction: 1;
  --ui-switch-checked-fill: var(--ui-color-accent);
  --ui-switch-checked-hover: var(--ui-color-accent-hover);
  --ui-switch-checked-active: var(--ui-color-accent-active);
  --ui-switch-thumb-fill: var(--ui-color-surface);
  --ui-switch-checked-thumb-fill: var(--ui-color-on-accent);
  --ui-switch-checked-thumb-ink: var(--ui-color-accent);

  display: flex;
  flex: none;
  align-items: center;
  box-sizing: border-box;
  inline-size: calc(
    var(--ui-switch-thumb-size) + var(--ui-switch-travel) + 2 * var(--ui-switch-track-padding) + 2px
  );
  block-size: calc(var(--ui-switch-thumb-size) + 2 * var(--ui-switch-track-padding) + 2px);
  margin-inline-start: auto;
  padding-inline: var(--ui-switch-track-padding);
  border: 1px solid var(--ui-color-border-strong);
  border-radius: var(--ui-switch-track-radius);
  background: var(--ui-color-surface-muted);
  transition:
    border-color var(--ui-motion-fast) var(--ui-ease-out),
    background-color var(--ui-motion-fast) var(--ui-ease-out);
}

.ui-switch[data-variant="outline"] .ui-switch__track {
  --ui-switch-track-radius: calc(var(--ui-switch-thumb-size) / 2 + var(--ui-switch-track-padding) + 1px);
  --ui-switch-checked-fill: var(--ui-color-surface);
  --ui-switch-checked-hover: var(--ui-color-accent-soft);
  --ui-switch-checked-active: var(--ui-color-surface-active);
  --ui-switch-thumb-fill: var(--ui-color-text-muted);
  --ui-switch-checked-thumb-fill: var(--ui-color-accent);
  --ui-switch-checked-thumb-ink: var(--ui-color-on-accent);

  background: var(--ui-color-surface);
}

.ui-switch[data-variant="outline"] .ui-switch__thumb {
  box-shadow: none;
}

.ui-switch__track:dir(rtl) {
  --ui-switch-direction: -1;
}

.ui-switch[aria-checked="true"] .ui-switch__track {
  border-color: var(--ui-color-accent);
  background: var(--ui-switch-checked-fill);
}

.ui-switch:enabled:not([aria-readonly="true"]):hover .ui-switch__track {
  background: var(--ui-color-surface-hover);
}

.ui-switch:enabled:not([aria-readonly="true"]):active .ui-switch__track {
  background: var(--ui-color-surface-active);
}

.ui-switch[aria-checked="true"]:enabled:not([aria-readonly="true"]):hover .ui-switch__track {
  background: var(--ui-switch-checked-hover);
}

.ui-switch[aria-checked="true"]:enabled:not([aria-readonly="true"]):active .ui-switch__track {
  background: var(--ui-switch-checked-active);
}

.ui-switch__thumb {
  display: grid;
  flex: none;
  place-items: center;
  inline-size: var(--ui-switch-thumb-size);
  block-size: var(--ui-switch-thumb-size);
  border-radius: max(0px, calc(var(--ui-switch-track-radius) - var(--ui-switch-track-padding) - 1px));
  background: var(--ui-switch-thumb-fill);
  box-shadow: 0 1px 2px rgb(25 28 29 / 24%);
  transform: translateX(0);
  transition:
    transform var(--ui-motion-standard) var(--ui-ease-out),
    background-color var(--ui-motion-fast) var(--ui-ease-out);
}

.ui-switch[aria-checked="true"] .ui-switch__thumb {
  background: var(--ui-switch-checked-thumb-fill);
  color: var(--ui-switch-checked-thumb-ink);
  transform: translateX(calc(var(--ui-switch-direction) * var(--ui-switch-travel)));
}

.ui-switch__thumb :deep(svg) {
  inline-size: 75%;
  block-size: 75%;
}

@media (forced-colors: active) {
  .ui-switch__thumb,
  .ui-switch[aria-checked="true"] .ui-switch__thumb {
    forced-color-adjust: none;
    background: CanvasText;
    color: Canvas;
    box-shadow: none;
  }
}
</style>
