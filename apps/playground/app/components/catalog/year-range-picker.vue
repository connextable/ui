<script setup lang="ts">
import {
  UIDateRangePickerValue,
  UIYearRangePicker,
  UIYearRangePickerAnchor,
  UIYearRangePickerCell,
  UIYearRangePickerContent,
  UIYearRangePickerEndInput,
  UIYearRangePickerGrid,
  UIYearRangePickerNextPage,
  UIYearRangePickerPreviousPage,
  UIYearRangePickerStartInput,
  UIYearRangePickerTrigger,
} from "@connextable/ui";

import { CalendarDays, ChevronLeft, ChevronRight } from '@lucide/vue'
const roadmap = {
  start: { year: 2026, month: 1, day: 1 },
  end: { year: 2030, month: 1, day: 1 },
}

</script>

<template>
  <UIYearRangePicker :default-value="roadmap" v-slot="{ value, years }">
    <UIYearRangePickerAnchor>
      <UIYearRangePickerStartInput hidden />
      <UIYearRangePickerEndInput hidden />
      <UIDateRangePickerValue :value="value" granularity="year" start-placeholder="시작 연도" end-placeholder="종료 연도" />
      <UIYearRangePickerTrigger aria-label="연도 범위 선택 열기">
        <CalendarDays :size="18" aria-hidden="true" />
      </UIYearRangePickerTrigger>
    </UIYearRangePickerAnchor>
    <UIYearRangePickerContent>
      <UIYearRangePickerPreviousPage aria-label="이전 연도 묶음"><ChevronLeft :size="16" aria-hidden="true" /></UIYearRangePickerPreviousPage>
      <strong>{{ years.flat()[0]?.year }}–{{ years.flat().at(-1)?.year }}</strong>
      <UIYearRangePickerNextPage aria-label="다음 연도 묶음"><ChevronRight :size="16" aria-hidden="true" /></UIYearRangePickerNextPage>
      <UIYearRangePickerGrid>
        <UIYearRangePickerCell v-for="year in years.flat()" :key="year.year" :value="year">
          {{ year.year }}
        </UIYearRangePickerCell>
      </UIYearRangePickerGrid>
    </UIYearRangePickerContent>
  </UIYearRangePicker>
</template>
