<script setup lang="ts">
import {
  UIDateRangeField,
  UIDateRangeFieldEndInput,
  UIDateRangeFieldStartInput,
} from "@connextable/ui";

import { ref } from 'vue'
const range = ref({
  start: { year: 2026, month: 8, day: 22 },
  end: { year: 2026, month: 8, day: 25 },
})
</script>

<template>
  <UIDateRangeField start-label="시작일" end-label="종료일" :policies="{ min: { year: 2026, month: 8, day: 20 }, max: { year: 2026, month: 8, day: 30 } }" v-model="range">
    <UIDateRangeFieldStartInput name="start" />
    <UIDateRangeFieldEndInput name="end" />
  </UIDateRangeField>
</template>
