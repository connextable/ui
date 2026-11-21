<script setup lang="ts">
import {
  UIDateRangePickerValue,
  UIMonthRangePicker,
  UIMonthRangePickerAnchor,
  UIMonthRangePickerCell,
  UIMonthRangePickerContent,
  UIMonthRangePickerPortal,
  UIMonthRangePickerEndInput,
  UIMonthRangePickerGrid,
  UIMonthRangePickerNextYear,
  UIMonthRangePickerPreviousYear,
  UIMonthRangePickerStartInput,
  UIMonthRangePickerTrigger,
} from "@connextable/ui";

import { CalendarDays, ChevronLeft, ChevronRight } from '@lucide/vue'
const reportingPeriod = {
  start: { year: 2026, month: 4, day: 1 },
  end: { year: 2026, month: 9, day: 1 },
}
const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월',
  '7월', '8월', '9월', '10월', '11월', '12월']

</script>

<template>
  <UIMonthRangePicker :default-value="reportingPeriod" v-slot="{ value, months, view }">
    <UIMonthRangePickerAnchor>
      <UIMonthRangePickerStartInput hidden />
      <UIMonthRangePickerEndInput hidden />
      <UIDateRangePickerValue :value="value" granularity="month" start-placeholder="시작 월" end-placeholder="종료 월" />
      <UIMonthRangePickerTrigger aria-label="월 범위 선택 열기">
        <CalendarDays :size="18" aria-hidden="true" />
      </UIMonthRangePickerTrigger>
    </UIMonthRangePickerAnchor>
    <UIMonthRangePickerPortal>
      <UIMonthRangePickerContent>
        <UIMonthRangePickerPreviousYear aria-label="이전 해"><ChevronLeft :size="16" aria-hidden="true" /></UIMonthRangePickerPreviousYear>
        <strong>{{ view.year }}</strong>
        <UIMonthRangePickerNextYear aria-label="다음 해"><ChevronRight :size="16" aria-hidden="true" /></UIMonthRangePickerNextYear>
        <UIMonthRangePickerGrid>
          <UIMonthRangePickerCell v-for="month in months.flat()" :key="month.year + '-' + month.month" :value="month">
            {{ monthNames[month.month - 1] }}
          </UIMonthRangePickerCell>
        </UIMonthRangePickerGrid>
      </UIMonthRangePickerContent>
    </UIMonthRangePickerPortal>
  </UIMonthRangePicker>
</template>
