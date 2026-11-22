<script setup lang="ts">
import { UIMonthRangePicker } from "@connextable/ui";
import { ref } from "vue";

const reportingPeriod = ref({
  start: { year: 2026, month: 4, day: 1 },
  end: { year: 2026, month: 9, day: 1 },
});
</script>

<template>
  <UIMonthRangePicker v-model="reportingPeriod" />
</template>
