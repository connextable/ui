<script setup lang="ts">
import {
  UIDateRangeField,
  UIDateRangeFieldEndInput,
  UIDateRangeFieldStartInput,
} from "@connextable/ui";

import { ref } from 'vue'
const range = ref<{ start: { year: number; month: number; day: number }; end: { year: number; month: number; day: number } } | null>({
  start: { year: 2026, month: 8, day: 22 },
  end: { year: 2026, month: 8, day: 25 },
})
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UIDateRangeField v-model="range" start-label="시작" end-label="종료" clearable>
      <UIDateRangeFieldStartInput name="start" />
      <UIDateRangeFieldEndInput name="end" />
    </UIDateRangeField>
    <template #footer>
      <output>{{ range ? "범위를 선택했습니다." : "범위 값이 비었습니다." }}</output>
    </template>
  </PlaygroundExample>
</template>
