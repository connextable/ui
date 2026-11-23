<script setup lang="ts">
import { UIDateTimeRangeField, UIDateTimeRangeFieldEndInput, UIDateTimeRangeFieldStartInput } from "@connextable/ui";
import { ref } from "vue";

const range = ref({ start: { date: { year: 2026, month: 8, day: 22 }, time: { hour: 9, minute: 0, second: 0, millisecond: 0 } }, end: { date: { year: 2026, month: 8, day: 22 }, time: { hour: 18, minute: 0, second: 0, millisecond: 0 } } });
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UIDateTimeRangeField v-model="range" precision="minute" start-label="시작 일시" end-label="종료 일시">
      <UIDateTimeRangeFieldStartInput />
      <UIDateTimeRangeFieldEndInput />
    </UIDateTimeRangeField>
    <template #footer>
      <output>{{ range ? "확정한 범위가 있습니다." : "확정한 범위 없음" }}</output>
    </template>
  </PlaygroundExample>
</template>
