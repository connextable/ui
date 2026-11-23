<script setup lang="ts">
import {
  UIDateRangePickerValue,
  UIDateRangePicker,
  UIDateRangePickerAnchor,
  UIDateRangePickerCell,
  UIDateRangePickerContent,
  UIDateRangePickerEndInput,
  UIDateRangePickerGrid,
  UIDateRangePickerStartInput,
  UIDateRangePickerTrigger,
  useTemporalDisplay,
  type UIDateValue,
} from "@connextable/ui";
import { CalendarDays } from "@lucide/vue";
import { ref } from "vue";
const range = ref<{ start: UIDateValue; end: UIDateValue } | null>(null);
const display = useTemporalDisplay();
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UIDateRangePicker v-model="range" :default-highlighted-value="{ year: 2026, month: 8, day: 22 }" v-slot="{ dates, value }">
      <UIDateRangePickerAnchor>
        <UIDateRangePickerStartInput hidden />
        <UIDateRangePickerEndInput hidden />
        <UIDateRangePickerValue :value="value" />
        <UIDateRangePickerTrigger aria-label="일정의 날짜 범위 고르기">
          <CalendarDays aria-hidden="true" />
        </UIDateRangePickerTrigger>
      </UIDateRangePickerAnchor>
      <UIDateRangePickerContent>
        <p>첫날과 마지막 날을 차례로 고르세요.</p>
        <UIDateRangePickerGrid>
          <UIDateRangePickerCell v-for="day in dates.flat()" :key="`${day.year}-${day.month}-${day.day}`" :value="day">
            {{ display.day(day) }}
          </UIDateRangePickerCell>
        </UIDateRangePickerGrid>
      </UIDateRangePickerContent>
    </UIDateRangePicker>
    <template #footer>
      <output>{{ range ? `확정 날짜 ${display.date(range.start)}–${display.date(range.end)}` : "확정한 범위 없음" }}</output>
    </template>
  </PlaygroundExample>
</template>
