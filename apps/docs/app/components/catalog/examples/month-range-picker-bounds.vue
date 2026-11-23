<script setup lang="ts">
import { UIMonthRangePicker, type UIDateValue } from "@connextable/ui";
import { ref } from "vue";

const min = { year: 2026, month: 4, day: 1 };
const max = { year: 2026, month: 9, day: 30 };
const range = ref<{ start: UIDateValue; end: UIDateValue } | null>(null);
</script>

<template>
  <UIMonthRangePicker v-model="range" :default-highlighted-value="min" :policies="{ min, max }" label="보고 기간" editable />
</template>
