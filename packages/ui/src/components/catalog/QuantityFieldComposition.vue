<script setup lang="ts">
import { provideFormBoundary, provideFormControlReset } from "@sectile/vue/form-boundary";
import { QuantityFieldInput, QuantityFieldRoot, type QuantityFieldRootProps, type QuantityFieldRootSlotProps } from "@sectile/vue/quantity-field";
import { computed, defineComponent, h, type Component } from "vue";
import { useClearableValue, useFieldClear } from "../clear/clearable";
import { definedControlAttrs } from "../control-attrs";
import UISelect from "../select/UISelect.vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<QuantityFieldRootProps & {
  id?: string;
  name?: string;
  form?: string;
  required?: boolean;
  placeholder?: string;
  displayUnits?: readonly string[];
}>(), { disabled: undefined, readonly: undefined, required: undefined });

const emit = defineEmits<{
  "update:modelValue": [value: QuantityFieldRootSlotProps["value"]];
  "update:displayUnit": [unit: string];
  commit: [details: Pick<QuantityFieldRootSlotProps, "value" | "displayUnit"> & { expression: string }];
}>();
const slots = defineSlots<{ default?(state: QuantityFieldRootSlotProps): unknown }>();

const usesDefaultContent = computed(() => !slots.default && !props.asChild);
const unit = useClearableValue(
  () => props.displayUnit,
  props.defaultDisplayUnit ?? props.policies.unitSystem?.getDefaultUnit(props.policies.canonicalUnit) ?? props.policies.canonicalUnit,
  value => emit("update:displayUnit", value),
);
const unitOptions = computed(() => [...new Set([...(props.displayUnits ?? []), unit.value.value])].flatMap((id) => {
  const entry = props.policies.registry.get(id);
  return entry && props.policies.registry.compatible(props.policies.canonicalUnit, id)
    ? [{ value: id, label: entry.symbol }]
    : [];
}));

const clear = useFieldClear();
if (usesDefaultContent.value) {
  provideFormControlReset(() => {
    clear?.reset?.();
    unit.reset();
  });
}

const DisplayUnitSelect = defineComponent({
  inheritAttrs: false,
  setup(_, { attrs }) {
    provideFormBoundary();
    return () => h(UISelect as Component, attrs);
  },
}) as unknown as typeof UISelect;

function updateUnit(value: string | null) {
  if (value !== null) unit.set(value);
}
</script>

<template>
  <QuantityFieldRoot
    v-bind="{ ...$attrs, ...definedControlAttrs({
      disabled, readonly,
      ...(!usesDefaultContent ? { id, name, form, required, placeholder } : {}),
    }) }"
    v-slot="state"
    :as="as"
    :as-child="asChild"
    :model-value="modelValue"
    :default-value="defaultValue"
    :policies="policies"
    :label="label"
    :display-unit="usesDefaultContent ? unit.value.value : displayUnit"
    :default-display-unit="defaultDisplayUnit"
    @update:model-value="emit('update:modelValue', $event)"
    @update:display-unit="updateUnit"
    @commit="emit('commit', $event)"
  >
    <slot v-bind="state">
      <div v-if="!asChild" class="ui-quantity-control">
        <QuantityFieldInput v-bind="definedControlAttrs({ id, name, form, required, placeholder })" />
        <DisplayUnitSelect
          v-if="displayUnits?.length && unitOptions.length > 1"
          :options="unitOptions"
          :model-value="state.displayUnit"
          :aria-label="label ? `${label} 표시 단위` : '표시 단위'"
          :readonly="state.readonly"
          :disabled="state.disabled"
          @update:model-value="updateUnit"
        />
        <span v-else class="ui-numeric-unit">{{ policies.registry.get(state.displayUnit)?.symbol ?? state.displayUnit }}</span>
      </div>
    </slot>
  </QuantityFieldRoot>
</template>
