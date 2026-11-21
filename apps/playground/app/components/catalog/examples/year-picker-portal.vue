<script setup lang="ts">
import {
  UIDatePickerValue,
  UIYearPicker,
  UIYearPickerAnchor,
  UIYearPickerCell,
  UIYearPickerContent,
  UIYearPickerPortal,
  UIYearPickerGrid,
  UIYearPickerInput,
  UIYearPickerNextPage,
  UIYearPickerPreviousPage,
  UIYearPickerTrigger,
} from "@connextable/ui";

import { CalendarDays, ChevronLeft, ChevronRight } from '@lucide/vue'
const graduationYear = { year: 2028, month: 1, day: 1 }

</script>

<template>
  <UIYearPicker :default-value="graduationYear" v-slot="{ value, years }">
    <UIYearPickerAnchor>
      <UIYearPickerInput hidden />
      <UIDatePickerValue :value="value" granularity="year" placeholder="연도 선택" />
      <UIYearPickerTrigger aria-label="연도 선택 열기">
        <CalendarDays :size="18" aria-hidden="true" />
      </UIYearPickerTrigger>
    </UIYearPickerAnchor>
    <UIYearPickerPortal>
      <UIYearPickerContent>
        <UIYearPickerPreviousPage aria-label="이전 연도 묶음"><ChevronLeft :size="16" aria-hidden="true" /></UIYearPickerPreviousPage>
        <strong>{{ years.flat()[0]?.year }}–{{ years.flat().at(-1)?.year }}</strong>
        <UIYearPickerNextPage aria-label="다음 연도 묶음"><ChevronRight :size="16" aria-hidden="true" /></UIYearPickerNextPage>
        <UIYearPickerGrid>
          <UIYearPickerCell v-for="year in years.flat()" :key="year.year" :value="year">
            {{ year.year }}
          </UIYearPickerCell>
        </UIYearPickerGrid>
      </UIYearPickerContent>
    </UIYearPickerPortal>
  </UIYearPicker>
</template>
