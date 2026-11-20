<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot, type CheckboxValue } from "@sectile/vue/checkbox";
import { useId } from "vue";

export type UICheckboxValue = CheckboxValue;

const {
  label,
  description,
  variant = "plain",
  modelValue = undefined,
  ...controlProps
} = defineProps<{
  label: string;
  description?: string;
  variant?: "plain" | "card";
  modelValue?: UICheckboxValue;
  defaultValue?: UICheckboxValue;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  form?: string;
}>();

const emit = defineEmits<{ "update:modelValue": [value: UICheckboxValue] }>();
const id = useId();
</script>

<template>
  <CheckboxRoot
    v-bind="controlProps"
    class="ui-choice ui-checkbox"
    :model-value="modelValue"
    :data-variant="variant"
    :aria-labelledby="`${id}-label`"
    :aria-describedby="description ? `${id}-description` : undefined"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <span class="ui-checkbox__box" aria-hidden="true">
      <CheckboxIndicator class="ui-checkbox__indicator" force-present />
    </span>
    <span class="ui-choice__copy">
      <span :id="`${id}-label`" class="ui-choice__label">{{ label }}</span>
      <span v-if="description" :id="`${id}-description`" class="ui-choice__description">
        {{ description }}
      </span>
    </span>
  </CheckboxRoot>
</template>

<style scoped>
.ui-checkbox__box {
  display: grid;
  flex: none;
  place-items: center;
  box-sizing: border-box;
  inline-size: 1.25rem;
  block-size: 1.25rem;
  border: 1px solid var(--ui-color-border-strong);
  border-radius: 0.3125rem;
  background: var(--ui-color-surface);
  color: var(--ui-color-on-accent);
  transition:
    background-color var(--ui-motion-fast) var(--ui-ease-out),
    border-color var(--ui-motion-fast) var(--ui-ease-out);
}

.ui-checkbox:is([aria-checked="true"], [aria-checked="mixed"]) .ui-checkbox__box {
  border-color: var(--ui-color-accent);
  background: var(--ui-color-accent);
}

.ui-checkbox__indicator {
  display: grid;
  place-items: center;
}

.ui-checkbox__indicator::before,
.ui-checkbox__indicator::after {
  grid-area: 1 / 1;
  content: "";
  opacity: 0;
  scale: 0.65;
  transition:
    opacity var(--ui-motion-fast) var(--ui-ease-out),
    scale var(--ui-motion-standard) var(--ui-ease-out);
}

.ui-checkbox__indicator::before {
  inline-size: 0.3rem;
  block-size: 0.55rem;
  border: solid currentColor;
  border-width: 0 0.125rem 0.125rem 0;
  transform: translateY(-0.06rem) rotate(45deg);
}

.ui-checkbox__indicator::after {
  inline-size: 0.625rem;
  border-block-start: 0.125rem solid currentColor;
}

.ui-checkbox[aria-checked="true"] .ui-checkbox__indicator::before,
.ui-checkbox[aria-checked="mixed"] .ui-checkbox__indicator::after {
  opacity: 1;
  scale: 1;
}
</style>
