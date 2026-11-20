<script setup lang="ts">
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot } from "@sectile/vue/radio-group";
import { computed, useId } from "vue";

export interface UIRadioGroupOption {
  /** Unique, non-empty value within the group. */
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

defineOptions({ inheritAttrs: false });

const {
  label,
  options,
  variant = "plain",
  orientation = "vertical",
  required,
  ...controlProps
} = defineProps<{
  label: string;
  options: readonly UIRadioGroupOption[];
  variant?: "plain" | "card";
  orientation?: "horizontal" | "vertical";
  modelValue?: string;
  defaultValue?: string;
  disabled?: boolean;
  readonly?: boolean;
  /** Enables native validation for a named form field. */
  required?: boolean;
  name?: string;
  form?: string;
}>();

const emit = defineEmits<{ "update:modelValue": [value: string] }>();
const id = useId();
const values = computed(() => options.map(({ value }) => value));
const disabledValues = computed(() =>
  options.filter(({ disabled }) => disabled).map(({ value }) => value),
);
const formRequired = computed(() => Boolean(required && controlProps.name));
</script>

<template>
  <div class="ui-radio-group">
    <span :id="`${id}-label`" class="ui-radio-group__label">{{ label }}</span>
    <RadioGroupRoot
      v-bind="{ ...$attrs, ...controlProps }"
      class="ui-radio-group__options"
      :items="values"
      :disabled-items="disabledValues"
      :orientation="orientation"
      :required="formRequired"
      :aria-labelledby="`${id}-label`"
      :aria-required="formRequired || undefined"
      @update:model-value="emit('update:modelValue', $event)"
    >
      <RadioGroupItem
        v-for="(option, index) in options"
        :key="option.value"
        class="ui-choice"
        :value="option.value"
        :data-variant="variant"
        :aria-labelledby="`${id}-${index}-label`"
        :aria-describedby="option.description ? `${id}-${index}-description` : undefined"
      >
        <span class="ui-radio-group__ring" aria-hidden="true">
          <RadioGroupIndicator class="ui-radio-group__indicator" force-present />
        </span>
        <span class="ui-choice__copy">
          <span :id="`${id}-${index}-label`" class="ui-choice__label">{{ option.label }}</span>
          <span
            v-if="option.description"
            :id="`${id}-${index}-description`"
            class="ui-choice__description"
          >{{ option.description }}</span>
        </span>
      </RadioGroupItem>
    </RadioGroupRoot>
  </div>
</template>

<style scoped>
.ui-radio-group {
  display: grid;
  gap: 0.5rem;
  min-inline-size: 0;
}

.ui-radio-group__label {
  font-weight: 650;
  overflow-wrap: anywhere;
}

.ui-radio-group :deep(.ui-radio-group__options) {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.375rem;
  min-inline-size: 0;
}

.ui-radio-group :deep(.ui-radio-group__options[aria-orientation="horizontal"]) {
  flex-flow: row wrap;
}

.ui-radio-group :deep(.ui-radio-group__options[aria-orientation="horizontal"] > .ui-choice[data-variant="card"]) {
  flex: 1 1 12rem;
  align-self: stretch;
}

.ui-radio-group :deep(.ui-radio-group__options[aria-readonly="true"] > .ui-choice) {
  cursor: default;
}

.ui-radio-group__ring {
  display: grid;
  flex: none;
  place-items: center;
  box-sizing: border-box;
  inline-size: 1.25rem;
  block-size: 1.25rem;
  border: 1px solid var(--ui-color-border-strong);
  border-radius: 50%;
  background: var(--ui-color-surface);
  transition: border-color var(--ui-motion-fast) var(--ui-ease-out);
}

.ui-choice[aria-checked="true"] .ui-radio-group__ring {
  border-color: var(--ui-color-accent);
}

.ui-radio-group__indicator {
  inline-size: 0.625rem;
  block-size: 0.625rem;
  border-radius: 50%;
  background: var(--ui-color-accent);
  opacity: 0;
  transform: scale(0.65);
  transition:
    opacity var(--ui-motion-fast) var(--ui-ease-out),
    transform var(--ui-motion-standard) var(--ui-ease-out);
}

.ui-choice[aria-checked="true"] .ui-radio-group__indicator {
  opacity: 1;
  transform: scale(1);
}

@media (forced-colors: active) {
  .ui-radio-group__indicator {
    forced-color-adjust: none;
    background: ButtonText;
  }
}
</style>
