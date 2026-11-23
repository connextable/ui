<script setup lang="ts">
import { UIQuantityField } from "@connextable/ui";
import { ref } from "vue";

const length = ref<{ value: string; unit: string } | null>({ value: "1.25", unit: "metre" });
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UIQuantityField v-model="length" unit="metre" unit-system="metric" label="길이" placeholder="예: 1.25" clearable />
    <template #footer><output>확정한 길이 <strong>{{ length ? `${length.value} m` : "없음" }}</strong></output></template>
  </PlaygroundExample>
</template>
