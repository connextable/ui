<script setup lang="ts">
import {
  UIDateTimeRangeField,
  UIDateTimeRangeFieldStartInput,
  UIDateTimeRangeFieldEndInput,
} from "@connextable/ui";

const initialRange = { start: { date: { year: 2026, month: 8, day: 22 }, time: { hour: 9, minute: 0, second: 0, millisecond: 0 } }, end: { date: { year: 2026, month: 8, day: 22 }, time: { hour: 18, minute: 0, second: 0, millisecond: 0 } } };
</script>

<template>
  <UIDateTimeRangeField precision="minute" :default-value="initialRange" start-label="시작 일시" end-label="종료 일시" v-slot="{ value }">
    <UIDateTimeRangeFieldStartInput />
    <UIDateTimeRangeFieldEndInput />
    <output>{{ value ? `확정 시간 ${value.start.date.day}일 ${value.start.time.hour}시–${value.end.date.day}일 ${value.end.time.hour}시` : "확정한 범위 없음" }}</output>
  </UIDateTimeRangeField>
</template>
