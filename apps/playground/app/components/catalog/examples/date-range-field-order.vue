<script setup lang="ts">
import {
  UIDateRangeField,
  UIDateRangeFieldStartInput,
  UIDateRangeFieldEndInput,
  useUITemporalDisplay,
} from "@connextable/ui";

const initialRange = { start: { year: 2026, month: 8, day: 22 }, end: { year: 2026, month: 8, day: 25 } };
const display = useUITemporalDisplay();
</script>

<template>
  <UIDateRangeField :default-value="initialRange" start-label="시작 날짜" end-label="종료 날짜" v-slot="{ value }">
    <UIDateRangeFieldStartInput />
    <UIDateRangeFieldEndInput />
    <output>{{ value ? `확정 기간 ${display.date(value.start)}–${display.date(value.end)}` : "확정한 범위 없음" }}</output>
  </UIDateRangeField>
</template>
