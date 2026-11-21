<script setup lang="ts">
import { SwitchRoot, SwitchThumb, type SwitchSlotProps } from "@sectile/vue/switch";
import { useId } from "vue";
import { definedControlAttrs } from "../control-attrs";

defineOptions({ inheritAttrs: false });

const {
  label,
  description,
  variant = "plain",
  size = "md",
  modelValue = undefined,
  disabled = undefined,
  readonly = undefined,
  ...controlProps
} = defineProps<{
  label: string;
  description?: string;
  variant?: "plain" | "card";
  size?: "sm" | "md" | "lg";
  modelValue?: boolean;
  defaultValue?: boolean;
  disabled?: boolean;
  readonly?: boolean;
}>();

const emit = defineEmits<{ "update:modelValue": [value: boolean] }>();
defineSlots<{
  label?(state: SwitchSlotProps): unknown;
  thumb?(state: SwitchSlotProps): unknown;
}>();
const id = useId();
</script>

<template>
  <SwitchRoot
    v-bind="definedControlAttrs({
      ...$attrs,
      ...controlProps,
      disabled,
      readonly,
      'aria-labelledby': $attrs['aria-labelledby'] ?? `${id}-label`,
      'aria-describedby': [$attrs['aria-describedby'], description && `${id}-description`].filter(Boolean).join(' ') || undefined,
    })"
    v-slot="state"
    class="ui-choice ui-switch"
    :model-value="modelValue"
    :data-variant="variant"
    :data-ui-control-size="size"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <span class="ui-choice__copy">
      <span :id="`${id}-label`" class="ui-choice__label"><slot name="label" v-bind="state">{{ label }}</slot></span>
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

.ui-switch[data-variant="plain"] {
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
  transition: background-color var(--ui-motion-fast) var(--ui-ease-out);
}

.ui-switch__track:dir(rtl) {
  --ui-switch-direction: -1;
}

.ui-switch[aria-checked="true"] .ui-switch__track {
  border-color: var(--ui-color-accent);
  background: var(--ui-color-accent);
}

.ui-switch:enabled:not([aria-readonly="true"]):hover .ui-switch__track {
  background: var(--ui-color-surface-hover);
}

.ui-switch:enabled:not([aria-readonly="true"]):active .ui-switch__track {
  background: var(--ui-color-surface-active);
}

.ui-switch[aria-checked="true"]:enabled:not([aria-readonly="true"]):hover .ui-switch__track {
  background: var(--ui-color-accent-hover);
}

.ui-switch[aria-checked="true"]:enabled:not([aria-readonly="true"]):active .ui-switch__track {
  background: var(--ui-color-accent-active);
}

.ui-switch__thumb {
  inline-size: var(--ui-switch-thumb-size);
  block-size: var(--ui-switch-thumb-size);
  border-radius: max(0px, calc(var(--ui-switch-track-radius) - var(--ui-switch-track-padding) - 1px));
  background: var(--ui-color-surface);
  box-shadow: 0 1px 2px rgb(25 28 29 / 24%);
  transform: translateX(0);
  transition:
    transform var(--ui-motion-standard) var(--ui-ease-out),
    background-color var(--ui-motion-fast) var(--ui-ease-out);
}

.ui-switch[aria-checked="true"] .ui-switch__thumb {
  background: var(--ui-color-on-accent);
  transform: translateX(calc(var(--ui-switch-direction) * var(--ui-switch-travel)));
}

@media (forced-colors: active) {
  .ui-switch__thumb,
  .ui-switch[aria-checked="true"] .ui-switch__thumb {
    forced-color-adjust: none;
    background: CanvasText;
    box-shadow: none;
  }
}
</style>
