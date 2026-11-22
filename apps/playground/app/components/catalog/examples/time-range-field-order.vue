<script setup lang="ts">
import {
  UITimeRangeField,
  UITimeRangeFieldStartInput,
  UITimeRangeFieldEndInput,
  useUITemporalDisplay,
} from "@connextable/ui";

const initialRange = { start: { hour: 9, minute: 30, second: 0, millisecond: 0 }, end: { hour: 17, minute: 45, second: 0, millisecond: 0 } };
const display = useUITemporalDisplay();
</script>

<template>
  <UITimeRangeField precision="minute" :default-value="initialRange" start-label="시작 시간" end-label="종료 시간" v-slot="{ value }">
    <UITimeRangeFieldStartInput />
    <UITimeRangeFieldEndInput />
    <output>{{ value ? `확정 시간 ${display.time(value.start)}–${display.time(value.end)}` : "확정한 범위 없음" }}</output>
  </UITimeRangeField>
</template>
