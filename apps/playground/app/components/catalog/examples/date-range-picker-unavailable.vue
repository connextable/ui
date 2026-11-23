<script setup lang="ts">
import {
  UIDateRangePickerValue,
  UIDateRangePicker,
  UIDateRangePickerAnchor,
  UIDateRangePickerCell,
  UIDateRangePickerContent,
  UIDateRangePickerEndInput,
  UIDateRangePickerGrid,
  UIDateRangePickerMonthCell,
  UIDateRangePickerMonthViewTrigger,
  UIDateRangePickerNextMonth,
  UIDateRangePickerNextWeek,
  UIDateRangePickerNextYear,
  UIDateRangePickerPreviousMonth,
  UIDateRangePickerPreviousWeek,
  UIDateRangePickerPreviousYear,
  UIDateRangePickerStartInput,
  UIDateRangePickerTrigger,
  UIDateRangePickerWeekViewTrigger,
  UIDateRangePickerYearViewTrigger,
  useUITemporalDisplay,
} from "@connextable/ui";

import { CalendarDays, ChevronLeft, ChevronRight } from '@lucide/vue'
import { ref } from "vue";
const range = ref({
  start: { year: 2026, month: 8, day: 22 },
  end: { year: 2026, month: 8, day: 25 },
})
const unavailableDates = new Set(['2026-08-27', '2026-08-29'])
const policies = {
  unavailable: (value: { year: number; month: number; day: number }) =>
    unavailableDates.has(
      [value.year, String(value.month).padStart(2, '0'), String(value.day).padStart(2, '0')].join('-'),
    ),
}

const display = useUITemporalDisplay();
</script>

<template>
  <UIDateRangePicker v-model="range" :policies="policies" v-slot="{ value, dates, months, view, viewMode }">
    <UIDateRangePickerAnchor>
      <UIDateRangePickerStartInput hidden />
      <UIDateRangePickerEndInput hidden />
      <UIDateRangePickerValue :value="value" />
      <UIDateRangePickerTrigger aria-label="날짜 범위 선택 열기">
        <CalendarDays aria-hidden="true" />
      </UIDateRangePickerTrigger>
    </UIDateRangePickerAnchor>
    <UIDateRangePickerContent>
      <div>
        <div>
          <UIDateRangePickerPreviousWeek v-if="viewMode === 'week'" aria-label="이전"><ChevronLeft aria-hidden="true" /></UIDateRangePickerPreviousWeek>
          <UIDateRangePickerPreviousMonth v-else-if="viewMode === 'month'" aria-label="이전"><ChevronLeft aria-hidden="true" /></UIDateRangePickerPreviousMonth>
          <UIDateRangePickerPreviousYear v-else aria-label="이전"><ChevronLeft aria-hidden="true" /></UIDateRangePickerPreviousYear>
          <strong>{{ viewMode === 'year' ? display.year(view) : display.yearMonth(view) }}</strong>
          <UIDateRangePickerNextWeek v-if="viewMode === 'week'" aria-label="다음"><ChevronRight aria-hidden="true" /></UIDateRangePickerNextWeek>
          <UIDateRangePickerNextMonth v-else-if="viewMode === 'month'" aria-label="다음"><ChevronRight aria-hidden="true" /></UIDateRangePickerNextMonth>
          <UIDateRangePickerNextYear v-else aria-label="다음"><ChevronRight aria-hidden="true" /></UIDateRangePickerNextYear>
        </div>
        <div>
          <UIDateRangePickerWeekViewTrigger>주</UIDateRangePickerWeekViewTrigger>
          <UIDateRangePickerMonthViewTrigger>월</UIDateRangePickerMonthViewTrigger>
          <UIDateRangePickerYearViewTrigger>연도</UIDateRangePickerYearViewTrigger>
        </div>
      </div>

      <UIDateRangePickerGrid v-if="viewMode !== 'year'" :data-view="viewMode">
        <UIDateRangePickerCell
          v-for="day in dates.flat()"
          :key="[day.year, day.month, day.day].join('-')"
          :value="day"
        >
          {{ display.day(day) }}
        </UIDateRangePickerCell>
      </UIDateRangePickerGrid>
      <UIDateRangePickerGrid v-else data-view="year">
        <UIDateRangePickerMonthCell
          v-for="month in months.flat()"
          :key="[month.year, month.month].join('-')"
          :value="month"
        >
          {{ display.month(month) }}
        </UIDateRangePickerMonthCell>
      </UIDateRangePickerGrid>
    </UIDateRangePickerContent>
  </UIDateRangePicker>
</template>
