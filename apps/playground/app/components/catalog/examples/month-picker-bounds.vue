<script setup lang="ts">
import {
  UIDatePickerValue,
  UIMonthPicker,
  UIMonthPickerAnchor,
  UIMonthPickerCell,
  UIMonthPickerContent,
  UIMonthPickerGrid,
  UIMonthPickerInput,
  UIMonthPickerNextYear,
  UIMonthPickerPreviousYear,
  UIMonthPickerTrigger,
  useUITemporalDisplay,
} from "@connextable/ui";

import { CalendarDays, ChevronLeft, ChevronRight } from '@lucide/vue'
import { ref } from "vue";
const billingMonth = ref({ year: 2026, month: 8, day: 1 })

const display = useUITemporalDisplay();
</script>

<template>
  <UIMonthPicker :policies="{ min: { year: 2026, month: 1, day: 1 }, max: { year: 2026, month: 12, day: 31 } }" v-model="billingMonth" v-slot="{ value, months, view }">
    <UIMonthPickerAnchor>
      <UIMonthPickerInput hidden />
      <UIDatePickerValue :value="value" granularity="month" placeholder="월 선택" />
      <UIMonthPickerTrigger aria-label="월 선택 열기">
        <CalendarDays :size="18" aria-hidden="true" />
      </UIMonthPickerTrigger>
    </UIMonthPickerAnchor>
    <UIMonthPickerContent>
      <UIMonthPickerPreviousYear aria-label="이전"><ChevronLeft :size="16" aria-hidden="true" /></UIMonthPickerPreviousYear>
      <strong>{{ display.year(view) }}</strong>
      <UIMonthPickerNextYear aria-label="다음"><ChevronRight :size="16" aria-hidden="true" /></UIMonthPickerNextYear>
      <UIMonthPickerGrid>
        <UIMonthPickerCell v-for="month in months.flat()" :key="month.year + '-' + month.month" :value="month">
          {{ display.month(month) }}
        </UIMonthPickerCell>
      </UIMonthPickerGrid>
    </UIMonthPickerContent>
  </UIMonthPicker>
</template>
