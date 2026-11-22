<script setup lang="ts">
import { provideFormBoundary, provideFormControlReset } from "@sectile/vue/form-boundary";
import {
  createStandardQuantityPolicies,
  QuantityFieldInput,
  QuantityFieldRoot,
  type QuantityFieldRootProps,
  type QuantityFieldRootSlotProps,
  type StandardQuantityUnitSystem,
} from "@sectile/vue/quantity-field";
import { computed, defineComponent, h, shallowRef, type Component } from "vue";
import { useFieldClear } from "../clear/clearable";
import { definedControlAttrs } from "../control-attrs";
import UISelect from "../select/UISelect.vue";

defineOptions({ inheritAttrs: false });

type QuantityConfiguration =
  | { unit: string; policies?: QuantityFieldRootProps["policies"] }
  | { policies: QuantityFieldRootProps["policies"]; unit?: string };

const props = withDefaults(defineProps<Omit<QuantityFieldRootProps, "policies"> & QuantityConfiguration & {
  unitSystem?: StandardQuantityUnitSystem;
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
const policies = computed(() => {
  if (props.policies) return props.policies;
  if (!props.unit) throw new TypeError("UIQuantityField requires a unit or policies.");
  return createStandardQuantityPolicies(props.unit, props.unitSystem);
});
const selectedDisplayUnit = shallowRef<string>();
const resolvedDisplayUnit = computed(() => {
  const { canonicalUnit, registry, unitSystem } = policies.value;
  if (props.displayUnit !== undefined) return props.displayUnit;
  const selected = selectedDisplayUnit.value;
  if (selected !== undefined && registry.compatible(canonicalUnit, selected)) return selected;
  return props.defaultDisplayUnit ?? unitSystem?.getDefaultUnit(canonicalUnit) ?? canonicalUnit;
});
const unitOptions = computed(() => [...new Set([...(props.displayUnits ?? []), resolvedDisplayUnit.value])].flatMap((id) => {
  const { canonicalUnit, registry } = policies.value;
  const entry = registry.get(id);
  return entry && registry.compatible(canonicalUnit, id)
    ? [{ value: id, label: entry.symbol }]
    : [];
}));

const clear = useFieldClear();
if (usesDefaultContent.value) {
  provideFormControlReset(() => {
    clear?.reset?.();
    selectedDisplayUnit.value = undefined;
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
  if (value === null) return;
  if (props.displayUnit === undefined) selectedDisplayUnit.value = value;
  emit("update:displayUnit", value);
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
    :display-unit="usesDefaultContent ? resolvedDisplayUnit : displayUnit"
    :default-display-unit="defaultDisplayUnit"
    @update:model-value="emit('update:modelValue', $event)"
    @update:display-unit="updateUnit"
    @commit="emit('commit', $event)"
  >
    <slot v-bind="state">
      <div v-if="!asChild" class="ui-quantity-control">
        <QuantityFieldInput v-bind="definedControlAttrs({ id, name, form, required, placeholder: placeholder ?? '수량 입력' })" />
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
