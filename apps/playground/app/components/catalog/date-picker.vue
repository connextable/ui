<script setup lang="ts">
import { UIDatePicker } from "@connextable/ui";

const initial = { year: 2026, month: 8, day: 22 };
</script>

<template>
  <UIDatePicker :default-value="initial" />
</template>
