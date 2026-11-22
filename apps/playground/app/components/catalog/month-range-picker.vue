<script setup lang="ts">
import {
  UIDateRangePickerValue,
  UICalendarPeriodHeader,
  UIMonthRangePicker,
  UIMonthRangePickerAnchor,
  UIMonthRangePickerCell,
  UIMonthRangePickerContent,
  UIMonthRangePickerEndInput,
  UIMonthRangePickerGrid,
  UIMonthRangePickerNextYear,
  UIMonthRangePickerPreviousYear,
  UIMonthRangePickerStartInput,
  UIMonthRangePickerTrigger,
  useUITemporalDisplay,
} from "@connextable/ui";
import { CalendarDays, ChevronLeft, ChevronRight } from "@lucide/vue";
import { ref } from "vue";

const reportingPeriod = {
  start: { year: 2026, month: 4, day: 1 },
  end: { year: 2026, month: 9, day: 1 },
};
const highlighted = ref(reportingPeriod.start);
const display = useUITemporalDisplay();
</script>

<template>
  <UIMonthRangePicker :default-value="reportingPeriod" v-model:highlighted-value="highlighted" v-slot="{ value, months, view }">
    <UIMonthRangePickerAnchor>
      <UIMonthRangePickerStartInput hidden />
      <UIMonthRangePickerEndInput hidden />
      <UIDateRangePickerValue :value="value" granularity="month" start-placeholder="시작 월" end-placeholder="종료 월" />
      <UIMonthRangePickerTrigger aria-label="월 범위 선택 창 열기">
        <CalendarDays :size="18" aria-hidden="true" />
      </UIMonthRangePickerTrigger>
    </UIMonthRangePickerAnchor>
    <UIMonthRangePickerContent>
      <UICalendarPeriodHeader :view="view" choosing-month
        @select-year="year => { highlighted = { year, month: view.month, day: 1 } }">
        <template #previous>
          <UIMonthRangePickerPreviousYear aria-label="이전 연도"><ChevronLeft :size="16" aria-hidden="true" /></UIMonthRangePickerPreviousYear>
        </template>
        <template #next>
          <UIMonthRangePickerNextYear aria-label="다음 연도"><ChevronRight :size="16" aria-hidden="true" /></UIMonthRangePickerNextYear>
        </template>
        <template #grid>
          <UIMonthRangePickerGrid>
            <UIMonthRangePickerCell v-for="month in months.flat()" :key="month.year + '-' + month.month" :value="month">
              {{ display.month(month) }}
            </UIMonthRangePickerCell>
          </UIMonthRangePickerGrid>
        </template>
      </UICalendarPeriodHeader>
    </UIMonthRangePickerContent>
  </UIMonthRangePicker>
</template>
