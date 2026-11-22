<script setup lang="ts">
import { UIQuantityField } from "@connextable/ui";
import { reactive } from "vue";

function createExample(label: string, unit: string, symbol: string, value: string, displayUnits: string[]) {
  return {
    label,
    unit,
    symbol,
    model: { value, unit } as { value: string; unit: string } | null,
    displayUnit: unit,
    displayUnits,
  };
}

const examples = reactive([
  createExample("포장 길이", "metre", "m", "1.25", ["millimetre", "centimetre", "metre"]),
  createExample("배송 무게", "kilogram", "kg", "0.65", ["gram", "kilogram"]),
]);
</script>

<template>
  <div class="ui-field ui-field-layout">
    <div v-for="example in examples" :key="example.label" class="ui-field">
      <span class="ui-field-label">{{ example.label }}</span>
      <UIQuantityField
        v-model="example.model"
        v-model:display-unit="example.displayUnit"
        :unit="example.unit"
        unit-system="metric"
        :display-units="example.displayUnits"
        :label="example.label"
      />
      <output>기준값 {{ example.model?.value ?? "—" }} {{ example.symbol }}</output>
    </div>
  </div>
</template>
