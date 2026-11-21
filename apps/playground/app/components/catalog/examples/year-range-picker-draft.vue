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
} from "@connextable/ui";
import { CalendarDays, ChevronLeft, ChevronRight } from "@lucide/vue";

const referenceDate = { year: 2026, month: 1, day: 1 };
</script>

<template>
  <div>
    <UIYearRangePicker :reference-date="referenceDate" v-slot="{ years, value }">
      <UIYearRangePickerAnchor>
        <UIYearRangePickerStartInput hidden />
        <UIYearRangePickerEndInput hidden />
        <UIDateRangePickerValue :value="value" granularity="year" start-placeholder="시작 연도" end-placeholder="종료 연도" />
        <UIYearRangePickerTrigger aria-label="계획 연도 고르기"><CalendarDays :size="18" aria-hidden="true" /></UIYearRangePickerTrigger>
      </UIYearRangePickerAnchor>
      <UIYearRangePickerContent>
        <UIYearRangePickerPreviousPage aria-label="이전 연도 묶음"><ChevronLeft :size="16" aria-hidden="true" /></UIYearRangePickerPreviousPage>
        <strong>{{ years.flat()[0]?.year }}–{{ years.flat().at(-1)?.year }}</strong>
        <UIYearRangePickerNextPage aria-label="다음 연도 묶음"><ChevronRight :size="16" aria-hidden="true" /></UIYearRangePickerNextPage>
        <UIYearRangePickerGrid>
          <UIYearRangePickerCell v-for="year in years.flat()" :key="year.year" :value="year">
            {{ year.year }}년
          </UIYearRangePickerCell>
        </UIYearRangePickerGrid>
      </UIYearRangePickerContent>
      <output>{{ value ? `확정한 연도 ${value.start.year}년–${value.end.year}년` : "확정한 연도 없음" }}</output>
    </UIYearRangePicker>
  </div>
</template>
