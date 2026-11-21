<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot, type CheckboxValue } from "@sectile/vue/checkbox";
import { useId } from "vue";
import UICheckboxBox from "./UICheckboxBox.vue";

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
    <CheckboxIndicator aria-hidden="true" force-present>
      <UICheckboxBox />
    </CheckboxIndicator>
    <span class="ui-choice__copy">
      <span :id="`${id}-label`" class="ui-choice__label">{{ label }}</span>
      <span v-if="description" :id="`${id}-description`" class="ui-choice__description">
        {{ description }}
      </span>
    </span>
  </CheckboxRoot>
</template>
