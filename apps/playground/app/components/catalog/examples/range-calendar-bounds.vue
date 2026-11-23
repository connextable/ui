<script setup lang="ts">
import { UIRangeCalendar, useTemporalDisplay, type UIDateValue } from "@connextable/ui";
import { ref } from "vue";

const range = ref<{ start: UIDateValue; end: UIDateValue } | null>(null);
const min = { year: 2026, month: 8, day: 20 };
const max = { year: 2026, month: 8, day: 27 };
const display = useTemporalDisplay();
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UIRangeCalendar v-model="range" :default-highlighted-value="min" :policies="{ min, max }" label="예약 가능 기간" />
    <template #footer>
      <output>{{ range ? `${display.date(range.start)}–${display.date(range.end)}` : "선택한 범위 없음" }}</output>
    </template>
  </PlaygroundExample>
</template>
