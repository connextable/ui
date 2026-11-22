<script setup lang="ts">
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot, type RadioGroupItemSlotProps } from "@sectile/vue/radio-group";
import { useId } from "vue";
import UIFieldClear from "../clear/UIFieldClear.vue";
import { provideClearable, useClearableValue, type ClearableProps } from "../clear/clearable";
import { definedControlAttrs, useInputState, type FormControlProps } from "../control-attrs";
import { useSelectionOptions, type SelectionOption } from "./selection-options";
import UIItemIcon from "../UIItemIcon.vue";

export interface UIRadioGroupOption extends SelectionOption {}

defineOptions({ inheritAttrs: false, __sectileFormLabelMode: "labelledby" });

const {
  label,
  options,
  variant = "plain",
  orientation = "vertical",
  disabled = undefined,
  readonly = undefined,
  required = undefined,
  clearable,
  clearLabel,
  ...controlProps
} = defineProps<ClearableProps & FormControlProps & {
  label?: string;
  options: readonly UIRadioGroupOption[];
  variant?: "plain" | "card";
  orientation?: "horizontal" | "vertical";
  modelValue?: string;
  defaultValue?: string;
  disabled?: boolean;
  readonly?: boolean;
}>();

const emit = defineEmits<{ "update:modelValue": [value: string] }>();
defineSlots<{
  label?(): unknown;
  optionLabel?(state: RadioGroupItemSlotProps & { option: UIRadioGroupOption }): unknown;
}>();
const id = useId();
const state = useInputState({ get disabled() { return disabled; }, get readonly() { return readonly; }, get required() { return required; } });
const { values, disabledValues } = useSelectionOptions(() => options);
const selection = useClearableValue(
  () => controlProps.modelValue,
  controlProps.defaultValue ?? "",
  value => emit("update:modelValue", value),
);
provideClearable({
  enabled: () => clearable,
  label: () => clearLabel,
  disabled: () => disabled,
  readonly: () => readonly,
  hasValue: () => selection.value.value !== "",
  clear: () => selection.set(""),
  reset: selection.reset,
});
</script>

<template>
  <div class="ui-radio-group">
    <span v-if="label || $slots.label" :id="`${id}-label`" class="ui-radio-group__label"><slot name="label">{{ label }}</slot></span>
    <RadioGroupRoot
      v-bind="definedControlAttrs({
        ...$attrs,
        ...controlProps,
        disabled,
        readonly,
        required: state.required.value && state.editable.value,
        'aria-labelledby': $attrs['aria-labelledby'] ?? (label || $slots.label ? `${id}-label` : undefined),
      })"
      class="ui-radio-group__options"
      :items="values"
      :disabled-items="disabledValues"
      :orientation="orientation"
      :model-value="selection.value.value"
      @update:model-value="selection.set"
    >
      <RadioGroupItem
        v-for="(option, index) in options"
        :key="option.value"
        class="ui-choice"
        data-ui-control-size="md"
        :value="option.value"
        :data-variant="variant"
        :aria-labelledby="`${id}-${index}-label`"
        :aria-describedby="option.description ? `${id}-${index}-description` : undefined"
        v-slot="state"
      >
        <span class="ui-radio-group__ring" aria-hidden="true">
          <RadioGroupIndicator class="ui-radio-group__indicator" force-present />
        </span>
        <UIItemIcon v-if="option.icon" :icon="option.icon" />
        <span class="ui-choice__copy">
          <span :id="`${id}-${index}-label`" class="ui-choice__label">
            <slot name="optionLabel" v-bind="state" :option="option">{{ option.label }}</slot>
          </span>
          <span
            v-if="option.description"
            :id="`${id}-${index}-description`"
            class="ui-choice__description"
          >{{ option.description }}</span>
        </span>
      </RadioGroupItem>
    </RadioGroupRoot>
    <UIFieldClear text class="ui-radio-group__clear" />
  </div>
</template>

<style scoped>
.ui-radio-group {
  display: grid;
  gap: 0.5rem;
  min-inline-size: 0;
}

.ui-radio-group__clear {
  justify-self: end;
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
