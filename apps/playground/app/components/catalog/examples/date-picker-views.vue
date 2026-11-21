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
} from "@connextable/ui";

import { CalendarDays, ChevronLeft, ChevronRight } from '@lucide/vue'
const initialDate = { year: 2026, month: 8, day: 22 }
const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월',
  '7월', '8월', '9월', '10월', '11월', '12월']

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
          <strong>{{ viewMode === 'year' ? view.year + '년' : view.year + '년 ' + monthNames[view.month - 1] }}</strong>
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
          {{ day.day }}
        </UIDatePickerCell>
      </UIDatePickerGrid>
      <UIDatePickerGrid v-else data-view="year">
        <UIDatePickerMonthCell
          v-for="month in months.flat()"
          :key="[month.year, month.month].join('-')"
          :value="month"
        >
          {{ monthNames[month.month - 1] }}
        </UIDatePickerMonthCell>
      </UIDatePickerGrid>
    </UIDatePickerContent>
  </UIDatePicker>
</template>
