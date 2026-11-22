<script setup lang="ts">
import { UIMonthPicker } from "@connextable/ui";

const billingMonth = { year: 2026, month: 8, day: 1 };
</script>

<template>
  <UIMonthPicker :default-value="billingMonth" />
</template>
