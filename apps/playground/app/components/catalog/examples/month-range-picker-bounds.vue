<script setup lang="ts">
import {
  UIDateRangePickerValue,
  UIMonthRangePicker,
  UIMonthRangePickerAnchor,
  UIMonthRangePickerCell,
  UIMonthRangePickerContent,
  UIMonthRangePickerGrid,
  UIMonthRangePickerStartInput,
  UIMonthRangePickerEndInput,
  UIMonthRangePickerPreviousYear,
  UIMonthRangePickerNextYear,
  UIMonthRangePickerTrigger,
} from "@connextable/ui";
import { CalendarDays, ChevronLeft, ChevronRight } from "@lucide/vue";

const policies = {
  min: { year: 2026, month: 4, day: 1 },
  max: { year: 2026, month: 9, day: 30 },
};
</script>

<template>
  <div>
    <UIMonthRangePicker :default-highlighted-value="policies.min" :policies="policies" v-slot="{ value, months, view }">
      <UIMonthRangePickerAnchor>
        <UIMonthRangePickerStartInput hidden />
        <UIMonthRangePickerEndInput hidden />
        <UIDateRangePickerValue :value="value" granularity="month" start-placeholder="시작 월" end-placeholder="종료 월" />
        <UIMonthRangePickerTrigger aria-label="보고 기간 고르기"><CalendarDays :size="18" aria-hidden="true" /></UIMonthRangePickerTrigger>
      </UIMonthRangePickerAnchor>
      <UIMonthRangePickerContent>
        <UIMonthRangePickerPreviousYear aria-label="이전 연도"><ChevronLeft :size="16" aria-hidden="true" /></UIMonthRangePickerPreviousYear>
        <strong>{{ view.year }}년</strong>
        <UIMonthRangePickerNextYear aria-label="다음 연도"><ChevronRight :size="16" aria-hidden="true" /></UIMonthRangePickerNextYear>
        <UIMonthRangePickerGrid>
          <UIMonthRangePickerCell v-for="month in months.flat()" :key="month.month" :value="month">
            {{ month.month }}월
          </UIMonthRangePickerCell>
        </UIMonthRangePickerGrid>
      </UIMonthRangePickerContent>
    </UIMonthRangePicker>
  </div>
</template>
