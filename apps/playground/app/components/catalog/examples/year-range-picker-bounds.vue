<script setup lang="ts">
import {
  UIDateRangePickerValue,
  UIYearRangePicker,
  UIYearRangePickerAnchor,
  UIYearRangePickerCell,
  UIYearRangePickerContent,
  UIYearRangePickerGrid,
  UIYearRangePickerStartInput,
  UIYearRangePickerEndInput,
  UIYearRangePickerPreviousPage,
  UIYearRangePickerNextPage,
  UIYearRangePickerTrigger,
  useUITemporalDisplay,
} from "@connextable/ui";
import { CalendarDays, ChevronLeft, ChevronRight } from "@lucide/vue";

const policies = {
  min: { year: 2025, month: 1, day: 1 },
  max: { year: 2030, month: 12, day: 31 },
};
const display = useUITemporalDisplay();
</script>

<template>
  <div>
    <UIYearRangePicker :default-highlighted-value="policies.min" :policies="policies" v-slot="{ value, years }">
      <UIYearRangePickerAnchor>
        <UIYearRangePickerStartInput hidden />
        <UIYearRangePickerEndInput hidden />
        <UIDateRangePickerValue :value="value" granularity="year" start-placeholder="시작 연도" end-placeholder="종료 연도" />
        <UIYearRangePickerTrigger aria-label="기록 연도 고르기"><CalendarDays :size="18" aria-hidden="true" /></UIYearRangePickerTrigger>
      </UIYearRangePickerAnchor>
      <UIYearRangePickerContent>
        <UIYearRangePickerPreviousPage aria-label="이전 연도 묶음"><ChevronLeft :size="16" aria-hidden="true" /></UIYearRangePickerPreviousPage>
        <strong>{{ display.yearRange(years[0]?.[0], years.at(-1)?.at(-1)) }}</strong>
        <UIYearRangePickerNextPage aria-label="다음 연도 묶음"><ChevronRight :size="16" aria-hidden="true" /></UIYearRangePickerNextPage>
        <UIYearRangePickerGrid>
          <UIYearRangePickerCell v-for="year in years.flat()" :key="year.year" :value="year">
            {{ display.year(year) }}
          </UIYearRangePickerCell>
        </UIYearRangePickerGrid>
      </UIYearRangePickerContent>
    </UIYearRangePicker>
  </div>
</template>
