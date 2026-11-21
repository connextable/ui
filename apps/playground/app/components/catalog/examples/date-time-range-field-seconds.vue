<script setup lang="ts">
import { UIDateTimeRangeField, UIDateTimeRangeFieldEndInput, UIDateTimeRangeFieldStartInput } from "@connextable/ui";

const range = {
  start: { date: { year: 2026, month: 8, day: 22 }, time: { hour: 9, minute: 0, second: 0, millisecond: 0 } },
  end: { date: { year: 2026, month: 8, day: 22 }, time: { hour: 18, minute: 0, second: 0, millisecond: 0 } },
};
</script>

<template>
  <UIDateTimeRangeField precision="second" :default-value="range" start-label="시작 일시" end-label="종료 일시">
    <UIDateTimeRangeFieldStartInput />
    <UIDateTimeRangeFieldEndInput />
  </UIDateTimeRangeField>
</template>
