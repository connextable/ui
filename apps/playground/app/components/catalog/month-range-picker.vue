<script setup lang="ts">
import { UIMonthRangePicker } from "@connextable/ui";

const reportingPeriod = {
  start: { year: 2026, month: 4, day: 1 },
  end: { year: 2026, month: 9, day: 1 },
};
</script>

<template>
  <UIMonthRangePicker :default-value="reportingPeriod" />
</template>
