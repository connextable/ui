<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot, type CheckboxSlotProps, type CheckboxValue } from "@sectile/vue/checkbox";
import { useId, type Component } from "vue";
import { definedControlAttrs, useInputState, type FormControlProps } from "../control-attrs";
import UICheckboxBox from "./UICheckboxBox.vue";
import UIItemIcon from "../UIItemIcon.vue";

export type UICheckboxValue = CheckboxValue;

defineOptions({ inheritAttrs: false, __sectileFormLabelMode: "labelledby" });

const {
  label,
  icon,
  description,
  variant = "plain",
  modelValue = undefined,
  disabled = undefined,
  readonly = undefined,
  required = undefined,
  ...controlProps
} = defineProps<{
  label?: string;
  icon?: Component;
  description?: string;
  variant?: "plain" | "card";
  modelValue?: UICheckboxValue;
  defaultValue?: UICheckboxValue;
  disabled?: boolean;
  readonly?: boolean;
  value?: string;
} & FormControlProps>();

const emit = defineEmits<{ "update:modelValue": [value: UICheckboxValue] }>();
defineSlots<{
  label?(state: CheckboxSlotProps): unknown;
  indicator?(state: CheckboxSlotProps): unknown;
}>();
const id = useId();
const state = useInputState({ get disabled() { return disabled; }, get readonly() { return readonly; }, get required() { return required; } });
</script>

<template>
  <CheckboxRoot
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
    <UIItemIcon v-if="icon" :icon="icon" />
    <span v-if="label || $slots.label || description" class="ui-choice__copy">
      <span v-if="label || $slots.label" :id="`${id}-label`" class="ui-choice__label"><slot name="label" v-bind="state">{{ label }}</slot></span>
      <span v-if="description" :id="`${id}-description`" class="ui-choice__description">
        {{ description }}
      </span>
    </span>
  </CheckboxRoot>
</template>
