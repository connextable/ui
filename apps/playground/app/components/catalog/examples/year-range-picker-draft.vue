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

const referenceDate = { year: 2026, month: 1, day: 1 };
const display = useUITemporalDisplay();
</script>

<template>
  <div>
    <UIYearRangePicker :reference-date="referenceDate" v-slot="{ years, value }">
      <UIYearRangePickerAnchor>
        <UIYearRangePickerStartInput hidden />
        <UIYearRangePickerEndInput hidden />
        <UIDateRangePickerValue :value="value" granularity="year" start-placeholder="시작 연도" end-placeholder="종료 연도" />
        <UIYearRangePickerTrigger aria-label="계획 연도 고르기"><CalendarDays aria-hidden="true" /></UIYearRangePickerTrigger>
      </UIYearRangePickerAnchor>
      <UIYearRangePickerContent>
        <UIYearRangePickerPreviousPage aria-label="이전 연도 묶음"><ChevronLeft aria-hidden="true" /></UIYearRangePickerPreviousPage>
        <strong>{{ display.yearRange(years[0]?.[0], years.at(-1)?.at(-1)) }}</strong>
        <UIYearRangePickerNextPage aria-label="다음 연도 묶음"><ChevronRight aria-hidden="true" /></UIYearRangePickerNextPage>
        <UIYearRangePickerGrid>
          <UIYearRangePickerCell v-for="year in years.flat()" :key="year.year" :value="year">
            {{ display.year(year) }}
          </UIYearRangePickerCell>
        </UIYearRangePickerGrid>
      </UIYearRangePickerContent>
      <output>{{ value ? `확정한 연도 ${display.yearRange(value.start, value.end)}` : "확정한 연도 없음" }}</output>
    </UIYearRangePicker>
  </div>
</template>
