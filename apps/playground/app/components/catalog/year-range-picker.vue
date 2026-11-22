<script setup lang="ts">
import { UIYearRangePicker } from "@connextable/ui";

const roadmap = {
  start: { year: 2026, month: 1, day: 1 },
  end: { year: 2030, month: 1, day: 1 },
};
</script>

<template>
  <UIYearRangePicker :default-value="roadmap" />
</template>
