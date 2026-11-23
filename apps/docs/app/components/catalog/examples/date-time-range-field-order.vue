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
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UIDateTimeRangeField precision="minute" v-model="range" start-label="시작 일시" end-label="종료 일시">
      <UIDateTimeRangeFieldStartInput />
      <UIDateTimeRangeFieldEndInput />
    </UIDateTimeRangeField>
    <template #footer>
      <output>{{ range ? `확정 시간 ${display.dateTime(range.start)}–${display.dateTime(range.end)}` : "확정한 범위 없음" }}</output>
    </template>
  </PlaygroundExample>
</template>
