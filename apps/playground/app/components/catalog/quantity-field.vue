<script setup lang="ts">
import { UIQuantityField } from "@connextable/ui";
import { ref } from "vue";

const length = ref<{ value: string; unit: string } | null>({ value: "1.25", unit: "metre" });
</script>

<template>
  <UIQuantityField v-model="length" unit="metre" unit-system="metric" label="길이" />
</template>
