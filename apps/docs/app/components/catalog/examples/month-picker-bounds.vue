<script setup lang="ts">
import { UIMonthPicker, type UIDateValue } from "@connextable/ui";
import { ref } from "vue";

const billingMonth = ref<UIDateValue | null>({ year: 2026, month: 8, day: 1 });
const policies = {
  min: { year: 2026, month: 1, day: 1 },
  max: { year: 2026, month: 12, day: 31 },
};
</script>

<template>
  <UIMonthPicker v-model="billingMonth" :policies="policies" label="청구 월" editable />
</template>
