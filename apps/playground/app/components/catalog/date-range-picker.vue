<script setup lang="ts">
import { UIDateRangePicker } from "@connextable/ui";

const initial = { start: { year: 2026, month: 8, day: 22 }, end: { year: 2026, month: 8, day: 25 } };
</script>

<template>
  <UIDateRangePicker :default-value="initial" />
</template>
