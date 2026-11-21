<script setup lang="ts">
import {
  createUIStandardQuantityPolicies,
  UIQuantityField,
  UIQuantityFieldInput,
  UIQuantityFieldValue,
  UISelect,
} from "@connextable/ui";
import { ref } from "vue";

const policies = createUIStandardQuantityPolicies("metre", "metric");
const displayUnit = ref("metre");
const units = ["millimetre", "centimetre", "metre", "kilometre"].map(value => ({
  value,
  label: policies.registry.get(value)?.symbol ?? value,
}));
</script>

<template>
  <UIQuantityField v-model:display-unit="displayUnit" :policies="policies"
    :default-value="{ value: '1.25', unit: 'metre' }" label="길이">
    <UIQuantityFieldInput />
    <UISelect aria-label="길이 표시 단위" :options="units" :model-value="displayUnit"
      @update:model-value="displayUnit = $event ?? 'metre'" />
    <UIQuantityFieldValue />
  </UIQuantityField>
</template>
