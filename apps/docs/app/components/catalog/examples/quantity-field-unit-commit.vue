<script setup lang="ts">
import { UIQuantityField } from "@connextable/ui";
import { ref } from "vue";

const value = ref<{ value: string; unit: string } | null>({ value: "1.25", unit: "metre" });
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UIQuantityField v-model="value" unit="metre" unit-system="metric" label="길이" clearable />
    <template #footer><output>확정한 길이 <strong>{{ value ? `${value.value} m` : "없음" }}</strong></output></template>
  </PlaygroundExample>
</template>
