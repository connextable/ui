<script setup lang="ts">
import {
  UICalendarPeriodHeader,
  UIDateTimeRangePicker,
  UIDateTimeRangePickerAnchor,
  UIDateTimeRangePickerCell,
  UIDateTimeRangePickerContent,
  UIDateTimeRangePickerEndDateTimeInput,
  UIDateTimeRangePickerGrid,
  UIDateTimeRangePickerMonthCell,
  UIDateTimeRangePickerNextMonth,
  UIDateTimeRangePickerNextYear,
  UIDateTimeRangePickerPreviousMonth,
  UIDateTimeRangePickerPreviousYear,
  UIDateTimeRangePickerStartDateTimeInput,
  UIDateTimeRangePickerTrigger,
  UIDateTimeRangePickerValue,
  UIDateTimeRangePickerYearViewTrigger,
  type UIDateValue,
  useUITemporalDisplay,
} from "@connextable/ui";
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight } from "@lucide/vue";
import { ref } from "vue";

const initial = { start: { date: { year: 2026, month: 8, day: 22 }, time: { hour: 9, minute: 30, second: 0, millisecond: 0 } }, end: { date: { year: 2026, month: 8, day: 25 }, time: { hour: 17, minute: 30, second: 0, millisecond: 0 } } };
const highlighted = ref<UIDateValue>(initial.start.date);
const display = useUITemporalDisplay();
</script>

<template>
  <UIDateTimeRangePicker :default-value="initial" v-model:highlighted-value="highlighted" v-slot="{ dates, months, value, view, viewMode }">
    <UIDateTimeRangePickerAnchor>
      <UIDateTimeRangePickerStartDateTimeInput hidden />
      <UIDateTimeRangePickerEndDateTimeInput hidden />
      <UIDateTimeRangePickerValue :value="value" />
      <UIDateTimeRangePickerTrigger aria-label="기간 선택 창 열기"><CalendarDays :size="18" aria-hidden="true" /></UIDateTimeRangePickerTrigger>
    </UIDateTimeRangePickerAnchor>
    <UIDateTimeRangePickerContent>
      <UICalendarPeriodHeader :view="view" :choosing-month="viewMode === 'year'" year-first
        @select-year="year => { highlighted = { year, month: view.month, day: 1 } }">
        <template #previous>
          <UIDateTimeRangePickerPreviousYear v-if="viewMode === 'year'" aria-label="이전 연도"><ChevronLeft :size="16" aria-hidden="true" /></UIDateTimeRangePickerPreviousYear>
          <UIDateTimeRangePickerPreviousMonth v-else aria-label="이전 달"><ChevronLeft :size="16" aria-hidden="true" /></UIDateTimeRangePickerPreviousMonth>
        </template>
        <UIDateTimeRangePickerYearViewTrigger aria-label="연도와 월 선택">
          {{ display.yearMonth(view) }} <ChevronDown :size="14" aria-hidden="true" />
        </UIDateTimeRangePickerYearViewTrigger>
        <template #next>
          <UIDateTimeRangePickerNextYear v-if="viewMode === 'year'" aria-label="다음 연도"><ChevronRight :size="16" aria-hidden="true" /></UIDateTimeRangePickerNextYear>
          <UIDateTimeRangePickerNextMonth v-else aria-label="다음 달"><ChevronRight :size="16" aria-hidden="true" /></UIDateTimeRangePickerNextMonth>
        </template>
        <template #grid>
          <UIDateTimeRangePickerGrid :data-view="viewMode">
            <template v-if="viewMode === 'year'">
              <UIDateTimeRangePickerMonthCell v-for="month in months.flat()" :key="month.month" :value="month">
                {{ display.month(month) }}
              </UIDateTimeRangePickerMonthCell>
            </template>
            <template v-else>
              <UIDateTimeRangePickerCell v-for="day in dates.flat()" :key="[day.year, day.month, day.day].join('-')" :value="day">
                {{ display.day(day) }}
              </UIDateTimeRangePickerCell>
            </template>
          </UIDateTimeRangePickerGrid>
        </template>
      </UICalendarPeriodHeader>
    </UIDateTimeRangePickerContent>
  </UIDateTimeRangePicker>
</template>
