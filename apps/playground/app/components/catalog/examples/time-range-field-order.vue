<script setup lang="ts">
import {
  UITimeRangeField,
  UITimeRangeFieldStartInput,
  UITimeRangeFieldEndInput,
  useTemporalDisplay,
} from "@connextable/ui";
import { ref } from "vue";

const range = ref({ start: { hour: 9, minute: 30, second: 0, millisecond: 0 }, end: { hour: 17, minute: 45, second: 0, millisecond: 0 } });
const display = useTemporalDisplay();
</script>

<template>
  <UITimeRangeField precision="minute" v-model="range" start-label="시작 시간" end-label="종료 시간" v-slot="{ value }">
    <UITimeRangeFieldStartInput />
    <UITimeRangeFieldEndInput />
    <output>{{ value ? `확정 시간 ${display.time(value.start)}–${display.time(value.end)}` : "확정한 범위 없음" }}</output>
  </UITimeRangeField>
</template>
