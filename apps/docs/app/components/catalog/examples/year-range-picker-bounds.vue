<script setup lang="ts">
import { UIYearRangePicker, type UIDateValue } from "@connextable/ui";
import { ref } from "vue";

const min = { year: 2025, month: 1, day: 1 };
const max = { year: 2030, month: 12, day: 31 };
const range = ref<{ start: UIDateValue; end: UIDateValue } | null>(null);
</script>

<template>
  <UIYearRangePicker v-model="range" :default-highlighted-value="min" :policies="{ min, max }" label="기록 연도" editable />
</template>
