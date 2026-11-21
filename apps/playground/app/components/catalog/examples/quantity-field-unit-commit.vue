<script setup lang="ts">
import {
  createUIStandardQuantityPolicies,
  UIQuantityField,
  UIQuantityFieldInput,
  UIQuantityFieldValue,
} from "@connextable/ui";

import { ref } from "vue";

const result = ref("");
const policies = createUIStandardQuantityPolicies("metre", "metric");
</script>

<template>
  <UIQuantityField :policies="policies" :default-value="{ value: '1.25', unit: 'metre' }" label="길이"
    @commit="({ value }) => { result = value ? `${value.value} ${value.unit}` : '' }">
    <div class="ui-quantity-control">
      <UIQuantityFieldInput />
      <span class="ui-numeric-unit" aria-hidden="true">m</span>
    </div>
    <UIQuantityFieldValue>
      <output>{{ result || "입력하고 Enter를 눌러 길이를 확정하세요." }}</output>
    </UIQuantityFieldValue>
  </UIQuantityField>
</template>
