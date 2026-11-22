<script setup lang="ts">
import { createUIStandardQuantityPolicies, UIQuantityField } from "@connextable/ui";

const policies = createUIStandardQuantityPolicies("metre", "metric");
</script>

<template>
  <UIQuantityField readonly :policies="policies" :default-value="{ value: '1.25', unit: 'metre' }" label="길이" />
</template>
