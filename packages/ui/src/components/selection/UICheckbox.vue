<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot, type CheckboxSlotProps, type CheckboxValue } from "@sectile/vue/checkbox";
import { useId } from "vue";
import { definedControlAttrs } from "../control-attrs";
import UICheckboxBox from "./UICheckboxBox.vue";

export type UICheckboxValue = CheckboxValue;

defineOptions({ inheritAttrs: false });

const {
  label,
  description,
  variant = "plain",
  modelValue = undefined,
  disabled = undefined,
  readonly = undefined,
  ...controlProps
} = defineProps<{
  label: string;
  description?: string;
  variant?: "plain" | "card";
  modelValue?: UICheckboxValue;
  defaultValue?: UICheckboxValue;
  disabled?: boolean;
  readonly?: boolean;
}>();

const emit = defineEmits<{ "update:modelValue": [value: UICheckboxValue] }>();
defineSlots<{
  label?(state: CheckboxSlotProps): unknown;
  indicator?(state: CheckboxSlotProps): unknown;
}>();
const id = useId();
</script>

<template>
  <CheckboxRoot
    v-bind="definedControlAttrs({
      ...$attrs,
      ...controlProps,
      disabled,
      readonly,
      'aria-labelledby': $attrs['aria-labelledby'] ?? `${id}-label`,
      'aria-describedby': [$attrs['aria-describedby'], description && `${id}-description`].filter(Boolean).join(' ') || undefined,
    })"
    v-slot="state"
    class="ui-choice ui-checkbox"
    data-ui-control-size="md"
    :model-value="modelValue"
    :data-variant="variant"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <CheckboxIndicator aria-hidden="true" force-present>
      <UICheckboxBox>
        <template v-if="$slots.indicator" #default>
          <slot v-if="state.isChecked || state.isIndeterminate" name="indicator" v-bind="state" />
        </template>
      </UICheckboxBox>
    </CheckboxIndicator>
    <span class="ui-choice__copy">
      <span :id="`${id}-label`" class="ui-choice__label"><slot name="label" v-bind="state">{{ label }}</slot></span>
      <span v-if="description" :id="`${id}-description`" class="ui-choice__description">
        {{ description }}
      </span>
    </span>
  </CheckboxRoot>
</template>
