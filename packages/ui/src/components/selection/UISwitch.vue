<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from "@sectile/vue/switch";
import { useId } from "vue";

const {
  label,
  description,
  variant = "plain",
  size = "md",
  modelValue = undefined,
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
  name?: string;
  value?: string;
  form?: string;
}>();

const emit = defineEmits<{ "update:modelValue": [value: boolean] }>();
const id = useId();
</script>

<template>
  <SwitchRoot
    v-bind="controlProps"
    class="ui-choice ui-switch"
    :model-value="modelValue"
    :data-variant="variant"
    :data-ui-control-size="size"
    :aria-labelledby="`${id}-label`"
    :aria-describedby="description ? `${id}-description` : undefined"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <span class="ui-choice__copy">
      <span :id="`${id}-label`" class="ui-choice__label">{{ label }}</span>
      <span v-if="description" :id="`${id}-description`" class="ui-choice__description">
        {{ description }}
      </span>
    </span>
    <span class="ui-switch__track" aria-hidden="true">
      <SwitchThumb class="ui-switch__thumb" />
    </span>
  </SwitchRoot>
</template>

<style scoped>
.ui-switch[data-ui-control-size] {
  min-inline-size: var(--ui-control-size-height);
  min-block-size: var(--ui-control-size-height);
  padding-block: var(--ui-space-xs);
  border-radius: var(--ui-control-size-radius);
  font-size: var(--ui-control-size-font);
}

.ui-switch[data-variant="card"][aria-checked="true"] {
  border-color: var(--ui-color-divider);
}

.ui-switch__track {
  --ui-switch-thumb-size: calc(var(--ui-control-size-icon) - var(--ui-space-2xs));
  --ui-switch-track-padding: 0.1875rem;
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
  border-radius: var(--ui-control-size-radius);
  background: var(--ui-color-surface-muted);
  transition: background-color var(--ui-motion-fast) var(--ui-ease-out);
}

.ui-switch__track:dir(rtl) {
  --ui-switch-direction: -1;
}

.ui-switch[aria-checked="true"] .ui-switch__track {
  background: var(--ui-color-accent);
}

.ui-switch__thumb {
  inline-size: var(--ui-switch-thumb-size);
  block-size: var(--ui-switch-thumb-size);
  border-radius: 50%;
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
