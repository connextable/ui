<script setup lang="ts">
import {
  UIDateRangeField,
  UIDateRangeFieldStartInput,
  UIDateRangeFieldEndInput,
  useTemporalDisplay,
} from "@connextable/ui";
import { ref } from "vue";

const range = ref({ start: { year: 2026, month: 8, day: 22 }, end: { year: 2026, month: 8, day: 25 } });
const display = useTemporalDisplay();
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UIDateRangeField v-model="range" start-label="시작 날짜" end-label="종료 날짜">
      <UIDateRangeFieldStartInput />
      <UIDateRangeFieldEndInput />
    </UIDateRangeField>
    <template #footer>
      <output>{{ range ? `확정 기간 ${display.date(range.start)}–${display.date(range.end)}` : "확정한 범위 없음" }}</output>
    </template>
  </PlaygroundExample>
</template>
