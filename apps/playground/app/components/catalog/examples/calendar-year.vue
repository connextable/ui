<script setup lang="ts">
import {
  UICalendar,
  UICalendarCell,
  UICalendarContent,
  UICalendarGrid,
  UICalendarMonthCell,
  UICalendarNextMonth,
  UICalendarNextYear,
  UICalendarPreviousMonth,
  UICalendarPreviousYear,
  UICalendarYearViewTrigger,
  useUITemporalDisplay,
} from "@connextable/ui";
import { ChevronLeft, ChevronRight } from "@lucide/vue";
const display = useUITemporalDisplay();
</script>

<template>
  <UICalendar :default-highlighted-value="{ year: 2026, month: 8, day: 22 }" default-view="year"
    label="연도에서 월 찾기" v-slot="{ dates, months, view, viewMode }">
    <UICalendarContent>
      <header v-if="viewMode === 'year'">
        <UICalendarPreviousYear aria-label="이전 연도"><ChevronLeft aria-hidden="true" /></UICalendarPreviousYear>
        <strong>{{ display.year(view) }}</strong>
        <UICalendarNextYear aria-label="다음 연도"><ChevronRight aria-hidden="true" /></UICalendarNextYear>
      </header>
      <header v-else>
        <UICalendarPreviousMonth aria-label="이전 달"><ChevronLeft aria-hidden="true" /></UICalendarPreviousMonth>
        <strong>{{ display.yearMonth(view) }}</strong>
        <UICalendarNextMonth aria-label="다음 달"><ChevronRight aria-hidden="true" /></UICalendarNextMonth>
      </header>
      <UICalendarGrid v-if="viewMode === 'year'" data-view="year">
        <UICalendarMonthCell v-for="month in months.flat()" :key="month.month" :value="month">
          {{ display.month(month) }}
        </UICalendarMonthCell>
      </UICalendarGrid>
      <UICalendarGrid v-else>
        <UICalendarCell v-for="day in dates.flat()" :key="`${day.year}-${day.month}-${day.day}`" :value="day">
          {{ display.day(day) }}
        </UICalendarCell>
      </UICalendarGrid>
      <UICalendarYearViewTrigger v-if="viewMode !== 'year'">연도 보기</UICalendarYearViewTrigger>
    </UICalendarContent>
  </UICalendar>
</template>
