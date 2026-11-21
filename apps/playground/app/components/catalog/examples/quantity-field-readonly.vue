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
  <UIQuantityField readonly :policies="policies" :default-value="{ value: '1.25', unit: 'metre' }" label="길이">
    <div class="ui-quantity-control">
      <UIQuantityFieldInput />
      <span class="ui-numeric-unit" aria-hidden="true">m</span>
    </div>
    <UIQuantityFieldValue v-slot="{ value }">
      <span>확정한 길이 {{ value?.value ?? "—" }} m</span>
    </UIQuantityFieldValue>
  </UIQuantityField>
</template>
