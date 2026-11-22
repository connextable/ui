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
  useUITemporalDisplay,
} from "@connextable/ui";
import { CalendarDays } from "@lucide/vue";
const display = useUITemporalDisplay();
</script>

<template>
  <UIDateRangePicker :default-highlighted-value="{ year: 2026, month: 8, day: 22 }" v-slot="{ dates, value }">
    <UIDateRangePickerAnchor>
      <UIDateRangePickerStartInput hidden />
      <UIDateRangePickerEndInput hidden />
      <UIDateRangePickerValue :value="value" />
      <UIDateRangePickerTrigger aria-label="일정의 날짜 범위 고르기">
        <CalendarDays :size="18" aria-hidden="true" />
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
    <output>{{ value ? `확정 날짜 ${display.date(value.start)}–${display.date(value.end)}` : "확정한 범위 없음" }}</output>
  </UIDateRangePicker>
</template>
