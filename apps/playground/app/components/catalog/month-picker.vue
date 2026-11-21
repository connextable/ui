<script setup lang="ts">
import {
  UIDatePickerValue,
  UICalendarPeriodHeader,
  UIMonthPicker,
  UIMonthPickerAnchor,
  UIMonthPickerCell,
  UIMonthPickerContent,
  UIMonthPickerGrid,
  UIMonthPickerInput,
  UIMonthPickerNextYear,
  UIMonthPickerPreviousYear,
  UIMonthPickerTrigger,
} from "@connextable/ui";
import { CalendarDays, ChevronLeft, ChevronRight } from "@lucide/vue";
import { ref } from "vue";

const billingMonth = { year: 2026, month: 8, day: 1 };
const highlighted = ref(billingMonth);
</script>

<template>
  <UIMonthPicker :default-value="billingMonth" v-model:highlighted-value="highlighted" v-slot="{ value, months, view }">
    <UIMonthPickerAnchor>
      <UIMonthPickerInput hidden />
      <UIDatePickerValue :value="value" granularity="month" placeholder="월 선택" />
      <UIMonthPickerTrigger aria-label="월 선택 창 열기">
        <CalendarDays :size="18" aria-hidden="true" />
      </UIMonthPickerTrigger>
    </UIMonthPickerAnchor>
    <UIMonthPickerContent>
      <UICalendarPeriodHeader :view="view" choosing-month
        @select-year="year => { highlighted = { year, month: view.month, day: 1 } }">
        <template #previous>
          <UIMonthPickerPreviousYear aria-label="이전 연도"><ChevronLeft :size="16" aria-hidden="true" /></UIMonthPickerPreviousYear>
        </template>
        <template #next>
          <UIMonthPickerNextYear aria-label="다음 연도"><ChevronRight :size="16" aria-hidden="true" /></UIMonthPickerNextYear>
        </template>
        <template #grid>
          <UIMonthPickerGrid>
            <UIMonthPickerCell v-for="month in months.flat()" :key="month.year + '-' + month.month" :value="month">
              {{ month.month }}월
            </UIMonthPickerCell>
          </UIMonthPickerGrid>
        </template>
      </UICalendarPeriodHeader>
    </UIMonthPickerContent>
  </UIMonthPicker>
</template>
