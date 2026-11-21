<script setup lang="ts">
import {
  UICalendarPeriodHeader,
  UIDateTimePicker,
  UIDateTimePickerAnchor,
  UIDateTimePickerCell,
  UIDateTimePickerContent,
  UIDateTimePickerGrid,
  UIDateTimePickerDateInput,
  UIDateTimePickerTimeInput,
  UIDateTimePickerMonthCell,
  UIDateTimePickerNextMonth,
  UIDateTimePickerNextYear,
  UIDateTimePickerPreviousMonth,
  UIDateTimePickerPreviousYear,
  UIDateTimePickerTrigger,
  UIDateTimePickerYearViewTrigger,
  type UIDateValue,
} from "@connextable/ui";
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight } from "@lucide/vue";
import { ref } from "vue";

const initial = { date: { year: 2026, month: 8, day: 22 }, time: { hour: 9, minute: 30, second: 0, millisecond: 0 } };
const highlighted = ref<UIDateValue>(initial.date);
</script>

<template>
  <UIDateTimePicker :default-value="initial" v-model:highlighted-value="highlighted" v-slot="{ dates, months, view, viewMode }">
    <UIDateTimePickerAnchor>
      <UIDateTimePickerDateInput aria-label="날짜" />
      <UIDateTimePickerTimeInput aria-label="시간" />
      <UIDateTimePickerTrigger aria-label="날짜 선택 창 열기"><CalendarDays :size="18" /></UIDateTimePickerTrigger>
    </UIDateTimePickerAnchor>
    <UIDateTimePickerContent>
      <UICalendarPeriodHeader :view="view" :choosing-month="viewMode === 'year'" year-first
        @select-year="year => { highlighted = { year, month: view.month, day: 1 } }">
        <template #previous>
          <UIDateTimePickerPreviousYear v-if="viewMode === 'year'" aria-label="이전 연도"><ChevronLeft :size="16" aria-hidden="true" /></UIDateTimePickerPreviousYear>
          <UIDateTimePickerPreviousMonth v-else aria-label="이전 달"><ChevronLeft :size="16" aria-hidden="true" /></UIDateTimePickerPreviousMonth>
        </template>
        <UIDateTimePickerYearViewTrigger aria-label="연도와 월 선택">
          {{ view.year }}년 {{ view.month }}월 <ChevronDown :size="14" aria-hidden="true" />
        </UIDateTimePickerYearViewTrigger>
        <template #next>
          <UIDateTimePickerNextYear v-if="viewMode === 'year'" aria-label="다음 연도"><ChevronRight :size="16" aria-hidden="true" /></UIDateTimePickerNextYear>
          <UIDateTimePickerNextMonth v-else aria-label="다음 달"><ChevronRight :size="16" aria-hidden="true" /></UIDateTimePickerNextMonth>
        </template>
        <template #grid>
          <UIDateTimePickerGrid :data-view="viewMode">
            <template v-if="viewMode === 'year'">
              <UIDateTimePickerMonthCell v-for="month in months.flat()" :key="month.month" :value="month">
                {{ month.month }}월
              </UIDateTimePickerMonthCell>
            </template>
            <template v-else>
              <UIDateTimePickerCell v-for="day in dates.flat()" :key="[day.year, day.month, day.day].join('-')" :value="day">
                {{ day.day }}
              </UIDateTimePickerCell>
            </template>
          </UIDateTimePickerGrid>
        </template>
      </UICalendarPeriodHeader>
    </UIDateTimePickerContent>
  </UIDateTimePicker>
</template>
