<script setup lang="ts">
import { UIQuantityField } from "@connextable/ui";
import { ref } from "vue";

const value = ref<{ value: string; unit: string } | null>({ value: "1.25", unit: "metre" });
</script>

<template>
  <div class="ui-field">
    <UIQuantityField v-model="value" unit="metre" unit-system="metric" label="길이" clearable />
    <output>확정한 길이 {{ value ? `${value.value} m` : "—" }}</output>
  </div>
</template>
