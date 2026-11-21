<script setup lang="ts">
import {
  UITimeRangeField,
  UITimeRangeFieldStartInput,
  UITimeRangeFieldEndInput,
} from "@connextable/ui";

const initialRange = { start: { hour: 9, minute: 30, second: 0, millisecond: 0 }, end: { hour: 17, minute: 45, second: 0, millisecond: 0 } };
</script>

<template>
  <UITimeRangeField precision="minute" :default-value="initialRange" start-label="시작 시간" end-label="종료 시간" v-slot="{ value }">
    <UITimeRangeFieldStartInput />
    <UITimeRangeFieldEndInput />
    <output>{{ value ? `확정 시간 ${value.start.hour}시 ${value.start.minute}분–${value.end.hour}시 ${value.end.minute}분` : "확정한 범위 없음" }}</output>
  </UITimeRangeField>
</template>
