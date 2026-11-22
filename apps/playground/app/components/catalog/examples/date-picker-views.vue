<script setup lang="ts">
import {
  UIDatePicker,
  UIDatePickerAnchor,
  UIDatePickerCell,
  UIDatePickerContent,
  UIDatePickerGrid,
  UIDatePickerInput,
  UIDatePickerMonthCell,
  UIDatePickerMonthViewTrigger,
  UIDatePickerNextMonth,
  UIDatePickerNextWeek,
  UIDatePickerNextYear,
  UIDatePickerPreviousMonth,
  UIDatePickerPreviousWeek,
  UIDatePickerPreviousYear,
  UIDatePickerTrigger,
  UIDatePickerWeekViewTrigger,
  UIDatePickerYearViewTrigger,
  useUITemporalDisplay,
} from "@connextable/ui";

import { CalendarDays, ChevronLeft, ChevronRight } from '@lucide/vue'
const initialDate = { year: 2026, month: 8, day: 22 }

const display = useUITemporalDisplay();
</script>

<template>
  <UIDatePicker :default-value="initialDate" v-slot="{ dates, months, view, viewMode }">
    <UIDatePickerAnchor>
      <UIDatePickerInput />
      <UIDatePickerTrigger aria-label="날짜 선택 열기">
        <CalendarDays :size="18" aria-hidden="true" />
      </UIDatePickerTrigger>
    </UIDatePickerAnchor>
    <UIDatePickerContent>
      <div>
        <div>
          <UIDatePickerPreviousWeek v-if="viewMode === 'week'" aria-label="이전"><ChevronLeft :size="16" aria-hidden="true" /></UIDatePickerPreviousWeek>
          <UIDatePickerPreviousMonth v-else-if="viewMode === 'month'" aria-label="이전"><ChevronLeft :size="16" aria-hidden="true" /></UIDatePickerPreviousMonth>
          <UIDatePickerPreviousYear v-else aria-label="이전"><ChevronLeft :size="16" aria-hidden="true" /></UIDatePickerPreviousYear>
          <strong>{{ viewMode === 'year' ? display.year(view) : display.yearMonth(view) }}</strong>
          <UIDatePickerNextWeek v-if="viewMode === 'week'" aria-label="다음"><ChevronRight :size="16" aria-hidden="true" /></UIDatePickerNextWeek>
          <UIDatePickerNextMonth v-else-if="viewMode === 'month'" aria-label="다음"><ChevronRight :size="16" aria-hidden="true" /></UIDatePickerNextMonth>
          <UIDatePickerNextYear v-else aria-label="다음"><ChevronRight :size="16" aria-hidden="true" /></UIDatePickerNextYear>
        </div>
        <div>
          <UIDatePickerWeekViewTrigger>주</UIDatePickerWeekViewTrigger>
          <UIDatePickerMonthViewTrigger>월</UIDatePickerMonthViewTrigger>
          <UIDatePickerYearViewTrigger>연도</UIDatePickerYearViewTrigger>
        </div>
      </div>

      <UIDatePickerGrid v-if="viewMode !== 'year'" :data-view="viewMode">
        <UIDatePickerCell
          v-for="day in dates.flat()"
          :key="[day.year, day.month, day.day].join('-')"
          :value="day"
        >
          {{ display.day(day) }}
        </UIDatePickerCell>
      </UIDatePickerGrid>
      <UIDatePickerGrid v-else data-view="year">
        <UIDatePickerMonthCell
          v-for="month in months.flat()"
          :key="[month.year, month.month].join('-')"
          :value="month"
        >
          {{ display.month(month) }}
        </UIDatePickerMonthCell>
      </UIDatePickerGrid>
    </UIDatePickerContent>
  </UIDatePicker>
</template>
