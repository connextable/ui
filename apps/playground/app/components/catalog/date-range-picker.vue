<script setup lang="ts">
import {
  UIDateRangePickerValue,
  UICalendarPeriodHeader,
  UIDateRangePicker,
  UIDateRangePickerAnchor,
  UIDateRangePickerCell,
  UIDateRangePickerContent,
  UIDateRangePickerGrid,
  UIDateRangePickerStartInput,
  UIDateRangePickerEndInput,
  UIDateRangePickerMonthCell,
  UIDateRangePickerNextMonth,
  UIDateRangePickerNextYear,
  UIDateRangePickerPreviousMonth,
  UIDateRangePickerPreviousYear,
  UIDateRangePickerTrigger,
  UIDateRangePickerYearViewTrigger,
  type UIDateValue,
  useUITemporalDisplay,
} from "@connextable/ui";
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight } from "@lucide/vue";
import { ref } from "vue";

const initial = { start: { year: 2026, month: 8, day: 22 }, end: { year: 2026, month: 8, day: 25 } };
const highlighted = ref<UIDateValue>(initial.start);
const display = useUITemporalDisplay();
</script>

<template>
  <UIDateRangePicker :default-value="initial" v-model:highlighted-value="highlighted" v-slot="{ value, dates, months, view, viewMode }">
    <UIDateRangePickerAnchor>
      <UIDateRangePickerStartInput hidden />
      <UIDateRangePickerEndInput hidden />
      <UIDateRangePickerValue :value="value" />
      <UIDateRangePickerTrigger aria-label="기간 선택 창 열기"><CalendarDays :size="18" /></UIDateRangePickerTrigger>
    </UIDateRangePickerAnchor>
    <UIDateRangePickerContent>
      <UICalendarPeriodHeader :view="view" :choosing-month="viewMode === 'year'" year-first
        @select-year="year => { highlighted = { year, month: view.month, day: 1 } }">
        <template #previous>
          <UIDateRangePickerPreviousYear v-if="viewMode === 'year'" aria-label="이전 연도"><ChevronLeft :size="16" aria-hidden="true" /></UIDateRangePickerPreviousYear>
          <UIDateRangePickerPreviousMonth v-else aria-label="이전 달"><ChevronLeft :size="16" aria-hidden="true" /></UIDateRangePickerPreviousMonth>
        </template>
        <UIDateRangePickerYearViewTrigger aria-label="연도와 월 선택">
          {{ display.yearMonth(view) }} <ChevronDown :size="14" aria-hidden="true" />
        </UIDateRangePickerYearViewTrigger>
        <template #next>
          <UIDateRangePickerNextYear v-if="viewMode === 'year'" aria-label="다음 연도"><ChevronRight :size="16" aria-hidden="true" /></UIDateRangePickerNextYear>
          <UIDateRangePickerNextMonth v-else aria-label="다음 달"><ChevronRight :size="16" aria-hidden="true" /></UIDateRangePickerNextMonth>
        </template>
        <template #grid>
          <UIDateRangePickerGrid :data-view="viewMode">
            <template v-if="viewMode === 'year'">
              <UIDateRangePickerMonthCell v-for="month in months.flat()" :key="month.month" :value="month">
                {{ display.month(month) }}
              </UIDateRangePickerMonthCell>
            </template>
            <template v-else>
              <UIDateRangePickerCell v-for="day in dates.flat()" :key="[day.year, day.month, day.day].join('-')" :value="day">
                {{ display.day(day) }}
              </UIDateRangePickerCell>
            </template>
          </UIDateRangePickerGrid>
        </template>
      </UICalendarPeriodHeader>
    </UIDateRangePickerContent>
  </UIDateRangePicker>
</template>
