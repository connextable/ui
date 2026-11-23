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
  useTemporalDisplay,
  type UIDateValue,
} from "@connextable/ui";
import { CalendarDays, ChevronLeft, ChevronRight } from "@lucide/vue";
import { ref } from "vue";

const referenceDate = { year: 2026, month: 1, day: 1 };
const range = ref<{ start: UIDateValue; end: UIDateValue } | null>(null);
const display = useTemporalDisplay();
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <div>
      <UIYearRangePicker v-model="range" :reference-date="referenceDate" v-slot="{ years, value }">
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
      </UIYearRangePicker>
    </div>
    <template #footer>
      <output>{{ range ? `확정한 연도 ${display.yearRange(range.start, range.end)}` : "확정한 연도 없음" }}</output>
    </template>
  </PlaygroundExample>
</template>
