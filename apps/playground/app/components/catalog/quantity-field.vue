<script setup lang="ts">
import {
  createUIStandardQuantityPolicies,
  UIQuantityField,
  UIQuantityFieldInput,
  UIQuantityFieldValue,
} from "@connextable/ui";

const policies = createUIStandardQuantityPolicies("metre", "metric");
</script>

<template>
  <UIQuantityField :policies="policies" :default-value="{ value: '1.25', unit: 'metre' }" label="길이">
    <UIQuantityFieldInput />
    <UIQuantityFieldValue />
  </UIQuantityField>
</template>
