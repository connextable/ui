<script setup lang="ts">
import {
  UIDateRangePickerValue,
  UIMonthRangePicker,
  UIMonthRangePickerAnchor,
  UIMonthRangePickerCell,
  UIMonthRangePickerContent,
  UIMonthRangePickerEndInput,
  UIMonthRangePickerGrid,
  UIMonthRangePickerNextYear,
  UIMonthRangePickerPreviousYear,
  UIMonthRangePickerStartInput,
  UIMonthRangePickerTrigger,
  useUITemporalDisplay,
} from "@connextable/ui";

import { CalendarDays, ChevronLeft, ChevronRight } from '@lucide/vue'
import { ref } from "vue";
const reportingPeriod = ref({
  start: { year: 2026, month: 11, day: 1 },
  end: { year: 2027, month: 2, day: 1 },
})

const display = useUITemporalDisplay();
</script>

<template>
  <UIMonthRangePicker v-model="reportingPeriod" clearable v-slot="{ value, months, view }">
    <UIMonthRangePickerAnchor>
      <UIMonthRangePickerStartInput hidden />
      <UIMonthRangePickerEndInput hidden />
      <UIDateRangePickerValue :value="value" granularity="month" start-placeholder="시작 월" end-placeholder="종료 월" />
      <UIMonthRangePickerTrigger aria-label="월 범위 선택 열기">
        <CalendarDays :size="18" aria-hidden="true" />
      </UIMonthRangePickerTrigger>
    </UIMonthRangePickerAnchor>
    <UIMonthRangePickerContent>
      <UIMonthRangePickerPreviousYear aria-label="이전 해"><ChevronLeft :size="16" aria-hidden="true" /></UIMonthRangePickerPreviousYear>
      <strong>{{ display.year(view) }}</strong>
      <UIMonthRangePickerNextYear aria-label="다음 해"><ChevronRight :size="16" aria-hidden="true" /></UIMonthRangePickerNextYear>
      <UIMonthRangePickerGrid>
        <UIMonthRangePickerCell v-for="month in months.flat()" :key="month.year + '-' + month.month" :value="month">
          {{ display.month(month) }}
        </UIMonthRangePickerCell>
      </UIMonthRangePickerGrid>
    </UIMonthRangePickerContent>
  </UIMonthRangePicker>
</template>
