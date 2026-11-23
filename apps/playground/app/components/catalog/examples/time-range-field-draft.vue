<script setup lang="ts">
import {
  UITimeRangeField,
  UITimeRangeFieldStartInput,
  UITimeRangeFieldEndInput,
} from "@connextable/ui";
import { ref } from "vue";

const range = ref({ start: { hour: 9, minute: 30, second: 0, millisecond: 0 }, end: { hour: 17, minute: 45, second: 0, millisecond: 0 } });
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UITimeRangeField precision="minute" v-model="range" start-label="시작 시간" end-label="종료 시간">
      <UITimeRangeFieldStartInput />
      <UITimeRangeFieldEndInput />
    </UITimeRangeField>
    <template #footer>
      <output>{{ range ? "시작과 종료 시간이 확정됐습니다." : "확정한 범위 없음" }}</output>
    </template>
  </PlaygroundExample>
</template>
