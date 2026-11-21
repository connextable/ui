<script setup lang="ts">
import {
  createUIStandardQuantityPolicies,
  UIQuantityField,
  UIQuantityFieldInput,
  UIQuantityFieldValue,
  UISelect,
} from "@connextable/ui";
import { ref } from "vue";

function createExample(label: string, unit: string, value: string, displayUnits: string[]) {
  const policies = createUIStandardQuantityPolicies(unit, "metric");
  return {
    label,
    policies,
    initial: { value, unit },
    displayUnit: ref(unit),
    options: displayUnits.map(value => ({ value, label: policies.registry.get(value)?.symbol ?? value })),
  };
}

const examples = [
  createExample("포장 길이", "metre", "1.25", ["millimetre", "centimetre", "metre"]),
  createExample("배송 무게", "kilogram", "0.65", ["gram", "kilogram"]),
];
</script>

<template>
  <div class="ui-field ui-field-layout">
    <UIQuantityField
      v-for="example in examples"
      :key="example.label"
      v-model:display-unit="example.displayUnit.value"
      :policies="example.policies"
      :default-value="example.initial"
      :label="example.label"
    >
      <span class="ui-field-label">{{ example.label }}</span>
      <div class="ui-quantity-control">
        <UIQuantityFieldInput />
        <UISelect
          :aria-label="`${example.label} 표시 단위`"
          :options="example.options"
          :model-value="example.displayUnit.value"
          @update:model-value="example.displayUnit.value = $event ?? example.initial.unit"
        />
      </div>
      <UIQuantityFieldValue v-slot="{ value }">
        <output>기준값 {{ value?.value ?? "—" }} {{ example.policies.registry.get(example.initial.unit)?.symbol }}</output>
      </UIQuantityFieldValue>
    </UIQuantityField>
  </div>
</template>
