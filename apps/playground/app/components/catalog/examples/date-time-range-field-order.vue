<script setup lang="ts">
import {
  UIDateTimeRangeField,
  UIDateTimeRangeFieldStartInput,
  UIDateTimeRangeFieldEndInput,
  useTemporalDisplay,
} from "@connextable/ui";
import { ref } from "vue";

const range = ref({ start: { date: { year: 2026, month: 8, day: 22 }, time: { hour: 9, minute: 0, second: 0, millisecond: 0 } }, end: { date: { year: 2026, month: 8, day: 22 }, time: { hour: 18, minute: 0, second: 0, millisecond: 0 } } });
const display = useTemporalDisplay();
</script>

<template>
  <UIDateTimeRangeField precision="minute" v-model="range" start-label="시작 일시" end-label="종료 일시" v-slot="{ value }">
    <UIDateTimeRangeFieldStartInput />
    <UIDateTimeRangeFieldEndInput />
    <output>{{ value ? `확정 시간 ${display.dateTime(value.start)}–${display.dateTime(value.end)}` : "확정한 범위 없음" }}</output>
  </UIDateTimeRangeField>
</template>
