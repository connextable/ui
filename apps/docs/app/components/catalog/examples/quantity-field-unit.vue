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
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UIQuantityField
      v-for="example in examples"
      :key="example.label"
      v-model="example.model"
      v-model:display-unit="example.displayUnit"
      :unit="example.unit"
      unit-system="metric"
      :display-units="example.displayUnits"
      :label="example.label"
    />
    <template #footer>
      <output v-for="example in examples" :key="example.label">
        {{ example.label }} 기준값 <strong>{{ example.model ? `${example.model.value} ${example.symbol}` : "없음" }}</strong>
      </output>
    </template>
  </PlaygroundExample>
</template>
