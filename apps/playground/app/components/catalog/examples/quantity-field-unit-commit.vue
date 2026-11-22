<script setup lang="ts">
import { createUIStandardQuantityPolicies, UIQuantityField } from "@connextable/ui";
import { ref } from "vue";

const value = ref<{ value: string; unit: string } | null>({ value: "1.25", unit: "metre" });
const policies = createUIStandardQuantityPolicies("metre", "metric");
</script>

<template>
  <div class="ui-field">
    <UIQuantityField v-model="value" :policies="policies" label="길이" clearable />
    <output>확정한 길이 {{ value ? `${value.value} ${policies.registry.get(value.unit)?.symbol ?? value.unit}` : "—" }}</output>
  </div>
</template>
