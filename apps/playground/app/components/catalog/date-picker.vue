<script setup lang="ts">
import {
  UICalendarPeriodHeader,
  UIDatePicker,
  UIDatePickerAnchor,
  UIDatePickerCell,
  UIDatePickerContent,
  UIDatePickerGrid,
  UIDatePickerInput,
  UIDatePickerMonthCell,
  UIDatePickerNextMonth,
  UIDatePickerNextYear,
  UIDatePickerPreviousMonth,
  UIDatePickerPreviousYear,
  UIDatePickerTrigger,
  UIDatePickerYearViewTrigger,
  type UIDateValue,
} from "@connextable/ui";
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight } from "@lucide/vue";
import { ref } from "vue";

const initial = { year: 2026, month: 8, day: 22 };
const highlighted = ref<UIDateValue>(initial);
</script>

<template>
  <UIDatePicker :default-value="initial" v-model:highlighted-value="highlighted" v-slot="{ dates, months, view, viewMode }">
    <UIDatePickerAnchor>
      <UIDatePickerInput aria-label="날짜" />
      <UIDatePickerTrigger aria-label="날짜 선택 창 열기"><CalendarDays :size="18" /></UIDatePickerTrigger>
    </UIDatePickerAnchor>
    <UIDatePickerContent>
      <UICalendarPeriodHeader :view="view" :choosing-month="viewMode === 'year'" year-first
        @select-year="year => { highlighted = { year, month: view.month, day: 1 } }">
        <template #previous>
          <UIDatePickerPreviousYear v-if="viewMode === 'year'" aria-label="이전 연도"><ChevronLeft :size="16" aria-hidden="true" /></UIDatePickerPreviousYear>
          <UIDatePickerPreviousMonth v-else aria-label="이전 달"><ChevronLeft :size="16" aria-hidden="true" /></UIDatePickerPreviousMonth>
        </template>
        <UIDatePickerYearViewTrigger aria-label="연도와 월 선택">
          {{ view.year }}년 {{ view.month }}월 <ChevronDown :size="14" aria-hidden="true" />
        </UIDatePickerYearViewTrigger>
        <template #next>
          <UIDatePickerNextYear v-if="viewMode === 'year'" aria-label="다음 연도"><ChevronRight :size="16" aria-hidden="true" /></UIDatePickerNextYear>
          <UIDatePickerNextMonth v-else aria-label="다음 달"><ChevronRight :size="16" aria-hidden="true" /></UIDatePickerNextMonth>
        </template>
        <template #grid>
          <UIDatePickerGrid :data-view="viewMode">
            <template v-if="viewMode === 'year'">
              <UIDatePickerMonthCell v-for="month in months.flat()" :key="month.month" :value="month">
                {{ month.month }}월
              </UIDatePickerMonthCell>
            </template>
            <template v-else>
              <UIDatePickerCell v-for="day in dates.flat()" :key="[day.year, day.month, day.day].join('-')" :value="day">
                {{ day.day }}
              </UIDatePickerCell>
            </template>
          </UIDatePickerGrid>
        </template>
      </UICalendarPeriodHeader>
    </UIDatePickerContent>
  </UIDatePicker>
</template>
