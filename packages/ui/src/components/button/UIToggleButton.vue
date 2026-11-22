<script setup lang="ts">
import { ToggleButton, type ToggleButtonProps, type ToggleButtonSlotProps } from "@sectile/vue/toggle-button";
import type { SetupContext } from "vue";
import { useClearableValue } from "../clear/clearable";
import type { FormControlProps } from "../control-attrs";
import { useCompositeValueForm } from "../form/composite-value";
import UIButton, { type UIButtonProps } from "./UIButton.vue";

defineOptions({ inheritAttrs: false, __sectileFormLabelMode: "labelledby" });
const props = withDefaults(defineProps<
  Omit<ToggleButtonProps, "as" | "asChild"> & FormControlProps & { value?: string } & Pick<UIButtonProps, "size" | "variant" | "iconOnly">
>(), { modelValue: undefined, disabled: undefined, readonly: undefined, required: undefined, value: "on" });
const emit = defineEmits<{ "update:modelValue": [pressed: boolean] }>();
defineSlots<{
  default?(state: ToggleButtonSlotProps): unknown;
  leading?(state: ToggleButtonSlotProps): unknown;
  trailing?(state: ToggleButtonSlotProps): unknown;
}>();
const pressed = useClearableValue(() => props.modelValue, props.defaultValue ?? false, value => emit("update:modelValue", value));
const renderForm = useCompositeValueForm(props, {
  values: () => pressed.value.value ? [props.value] : [],
  focus: "button",
  reset: pressed.reset,
  requiredMessage: "이 옵션을 켜세요.",
});
function FormValue(_: unknown, { slots }: SetupContext) {
  return renderForm(bindings => slots.default?.(bindings)[0]);
}
</script>

<template>
  <FormValue v-slot="bindings">
    <ToggleButton
      v-bind="{ ...bindings, ...$attrs, disabled: bindings.disabled, readonly: bindings.readonly }"
      v-slot="state"
      :model-value="pressed.value.value"
      as-child
      @update:model-value="pressed.set"
    >
      <UIButton :size="size" :variant="variant" :icon-only="iconOnly">
        <template v-if="$slots.leading" #leading><slot name="leading" v-bind="state" /></template>
        <slot v-bind="state" />
        <template v-if="$slots.trailing" #trailing><slot name="trailing" v-bind="state" /></template>
      </UIButton>
    </ToggleButton>
  </FormValue>
</template>
