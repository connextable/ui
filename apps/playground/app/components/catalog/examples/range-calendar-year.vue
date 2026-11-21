<script setup lang="ts">
import {
  UIRangeCalendar,
  UIRangeCalendarCell,
  UIRangeCalendarContent,
  UIRangeCalendarGrid,
  UIRangeCalendarMonthCell,
  UIRangeCalendarMonthViewTrigger,
  UIRangeCalendarNextMonth,
  UIRangeCalendarNextYear,
  UIRangeCalendarPreviousMonth,
  UIRangeCalendarPreviousYear,
  UIRangeCalendarYearViewTrigger,
} from "@connextable/ui";
import { ChevronLeft, ChevronRight } from "@lucide/vue";
</script>

<template>
  <UIRangeCalendar :default-highlighted-value="{ year: 2026, month: 8, day: 22 }" default-view="year" v-slot="{ dates, months, view, viewMode }">
    <UIRangeCalendarContent>
      <header v-if="viewMode === 'year'">
        <UIRangeCalendarPreviousYear aria-label="이전 연도"><ChevronLeft :size="16" aria-hidden="true" /></UIRangeCalendarPreviousYear>
        <strong>{{ view.year }}년</strong>
        <UIRangeCalendarNextYear aria-label="다음 연도"><ChevronRight :size="16" aria-hidden="true" /></UIRangeCalendarNextYear>
      </header>
      <header v-else>
        <UIRangeCalendarPreviousMonth aria-label="이전 달"><ChevronLeft :size="16" aria-hidden="true" /></UIRangeCalendarPreviousMonth>
        <strong>{{ view.year }}년 {{ view.month }}월</strong>
        <UIRangeCalendarNextMonth aria-label="다음 달"><ChevronRight :size="16" aria-hidden="true" /></UIRangeCalendarNextMonth>
      </header>
      <div role="group" aria-label="달력 보기">
        <UIRangeCalendarMonthViewTrigger>월의 날짜</UIRangeCalendarMonthViewTrigger>
        <UIRangeCalendarYearViewTrigger>연도의 월</UIRangeCalendarYearViewTrigger>
      </div>
      <UIRangeCalendarGrid v-if="viewMode === 'year'" data-view="year">
        <UIRangeCalendarMonthCell v-for="month in months.flat()" :key="month.month" :value="month">
          {{ month.month }}월
        </UIRangeCalendarMonthCell>
      </UIRangeCalendarGrid>
      <UIRangeCalendarGrid v-else>
        <UIRangeCalendarCell v-for="day in dates.flat()" :key="`${day.month}-${day.day}`" :value="day">
          {{ day.day }}
        </UIRangeCalendarCell>
      </UIRangeCalendarGrid>
    </UIRangeCalendarContent>
  </UIRangeCalendar>
</template>
