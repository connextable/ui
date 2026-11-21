<script setup lang="ts">
import {
  UIDateTimeRangePicker,
  UIDateTimeRangePickerAnchor,
  UIDateTimeRangePickerCell,
  UIDateTimeRangePickerContent,
  UIDateTimeRangePickerEndDateInput,
  UIDateTimeRangePickerEndTimeInput,
  UIDateTimeRangePickerGrid,
  UIDateTimeRangePickerMonthCell,
  UIDateTimeRangePickerMonthViewTrigger,
  UIDateTimeRangePickerNextMonth,
  UIDateTimeRangePickerNextWeek,
  UIDateTimeRangePickerNextYear,
  UIDateTimeRangePickerPreviousMonth,
  UIDateTimeRangePickerPreviousWeek,
  UIDateTimeRangePickerPreviousYear,
  UIDateTimeRangePickerStartDateInput,
  UIDateTimeRangePickerStartTimeInput,
  UIDateTimeRangePickerTrigger,
  UIDateTimeRangePickerWeekViewTrigger,
  UIDateTimeRangePickerYearViewTrigger,
} from "@connextable/ui";

import { CalendarDays, ChevronLeft, ChevronRight } from '@lucide/vue'
const initialRange = {
  start: {
    date: { year: 2026, month: 8, day: 22 },
    time: { hour: 9, minute: 30, second: 0, millisecond: 0 },
  },
  end: {
    date: { year: 2026, month: 8, day: 25 },
    time: { hour: 17, minute: 30, second: 0, millisecond: 0 },
  },
}
const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월',
  '7월', '8월', '9월', '10월', '11월', '12월']

</script>

<template>
  <UIDateTimeRangePicker :default-value="initialRange" v-slot="{ dates, months, view, viewMode }">
    <UIDateTimeRangePickerAnchor>
      <label>
        <span>시작</span>
        <UIDateTimeRangePickerStartDateInput aria-label="시작 날짜" />
        <UIDateTimeRangePickerStartTimeInput aria-label="시작 시간" />
      </label>
      <label>
        <span>종료</span>
        <UIDateTimeRangePickerEndDateInput aria-label="종료 날짜" />
        <UIDateTimeRangePickerEndTimeInput aria-label="종료 시간" />
      </label>
      <UIDateTimeRangePickerTrigger aria-label="일시 범위 선택 창 열기">
        <CalendarDays :size="18" aria-hidden="true" />
      </UIDateTimeRangePickerTrigger>
    </UIDateTimeRangePickerAnchor>
    <UIDateTimeRangePickerContent>
      <div>
        <div>
          <UIDateTimeRangePickerPreviousWeek v-if="viewMode === 'week'" aria-label="이전"><ChevronLeft :size="16" aria-hidden="true" /></UIDateTimeRangePickerPreviousWeek>
          <UIDateTimeRangePickerPreviousMonth v-else-if="viewMode === 'month'" aria-label="이전"><ChevronLeft :size="16" aria-hidden="true" /></UIDateTimeRangePickerPreviousMonth>
          <UIDateTimeRangePickerPreviousYear v-else aria-label="이전"><ChevronLeft :size="16" aria-hidden="true" /></UIDateTimeRangePickerPreviousYear>
          <strong>{{ viewMode === 'year' ? view.year + '년' : view.year + '년 ' + monthNames[view.month - 1] }}</strong>
          <UIDateTimeRangePickerNextWeek v-if="viewMode === 'week'" aria-label="다음"><ChevronRight :size="16" aria-hidden="true" /></UIDateTimeRangePickerNextWeek>
          <UIDateTimeRangePickerNextMonth v-else-if="viewMode === 'month'" aria-label="다음"><ChevronRight :size="16" aria-hidden="true" /></UIDateTimeRangePickerNextMonth>
          <UIDateTimeRangePickerNextYear v-else aria-label="다음"><ChevronRight :size="16" aria-hidden="true" /></UIDateTimeRangePickerNextYear>
        </div>
        <div>
          <UIDateTimeRangePickerWeekViewTrigger>주</UIDateTimeRangePickerWeekViewTrigger>
          <UIDateTimeRangePickerMonthViewTrigger>월</UIDateTimeRangePickerMonthViewTrigger>
          <UIDateTimeRangePickerYearViewTrigger>연도</UIDateTimeRangePickerYearViewTrigger>
        </div>
      </div>

      <UIDateTimeRangePickerGrid v-if="viewMode !== 'year'" :data-view="viewMode">
        <UIDateTimeRangePickerCell
          v-for="day in dates.flat()"
          :key="[day.year, day.month, day.day].join('-')"
          :value="day"
        >
          {{ day.day }}
        </UIDateTimeRangePickerCell>
      </UIDateTimeRangePickerGrid>
      <UIDateTimeRangePickerGrid v-else data-view="year">
        <UIDateTimeRangePickerMonthCell
          v-for="month in months.flat()"
          :key="[month.year, month.month].join('-')"
          :value="month"
        >
          {{ monthNames[month.month - 1] }}
        </UIDateTimeRangePickerMonthCell>
      </UIDateTimeRangePickerGrid>
    </UIDateTimeRangePickerContent>
  </UIDateTimeRangePicker>
</template>
