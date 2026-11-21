<script setup lang="ts">
import {
  UIDateRangeField,
  UIDateRangeFieldStartInput,
  UIDateRangeFieldEndInput,
} from "@connextable/ui";

const initialRange = { start: { year: 2026, month: 8, day: 22 }, end: { year: 2026, month: 8, day: 25 } };
</script>

<template>
  <UIDateRangeField :default-value="initialRange" start-label="시작 날짜" end-label="종료 날짜" v-slot="{ value }">
    <UIDateRangeFieldStartInput />
    <UIDateRangeFieldEndInput />
    <output>{{ value ? `확정 기간 8월 ${value.start.day}일–${value.end.day}일` : "확정한 범위 없음" }}</output>
  </UIDateRangeField>
</template>
