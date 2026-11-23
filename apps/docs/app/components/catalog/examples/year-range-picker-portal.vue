<script setup lang="ts">
import {
  UIDateRangePickerValue,
  UIYearRangePicker,
  UIYearRangePickerAnchor,
  UIYearRangePickerCell,
  UIYearRangePickerContent,
  UIYearRangePickerPortal,
  UIYearRangePickerEndInput,
  UIYearRangePickerGrid,
  UIYearRangePickerNextPage,
  UIYearRangePickerPreviousPage,
  UIYearRangePickerStartInput,
  UIYearRangePickerTrigger,
  useTemporalDisplay,
} from "@connextable/ui";

import { CalendarDays, ChevronLeft, ChevronRight } from '@lucide/vue'
import { ref } from "vue";
const roadmap = ref({
  start: { year: 2026, month: 1, day: 1 },
  end: { year: 2030, month: 1, day: 1 },
})

const display = useTemporalDisplay();
</script>

<template>
  <UIYearRangePicker v-model="roadmap" v-slot="{ value, years }">
    <UIYearRangePickerAnchor>
      <UIYearRangePickerStartInput hidden />
      <UIYearRangePickerEndInput hidden />
      <UIDateRangePickerValue :value="value" granularity="year" start-placeholder="시작 연도" end-placeholder="종료 연도" />
      <UIYearRangePickerTrigger aria-label="연도 범위 선택 열기">
        <CalendarDays aria-hidden="true" />
      </UIYearRangePickerTrigger>
    </UIYearRangePickerAnchor>
    <UIYearRangePickerPortal>
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
    </UIYearRangePickerPortal>
  </UIYearRangePicker>
</template>
