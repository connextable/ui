<script setup lang="ts">
import { UIDateRangePicker, UIDateRangePickerAnchor, UIDateRangePickerStartInput, UIDateRangePickerEndInput, UIDateRangePickerTrigger, UIDateRangePickerPortal, UIDateRangePickerContent, UIDateRangePickerPreviousMonth, UIDateRangePickerNextMonth, UIDateRangePickerGrid, UIDateRangePickerCell, UIDateRangePickerValue } from "@connextable/ui";
import { CalendarDays, ChevronLeft, ChevronRight } from "@lucide/vue";

const initial = { start: { year: 2026, month: 8, day: 22 }, end: { year: 2026, month: 8, day: 25 } };
</script>

<template>
  <UIDateRangePicker :default-value="initial"  v-slot="{ value, dates, view }">
    <UIDateRangePickerAnchor>
      <UIDateRangePickerStartInput hidden />
      <UIDateRangePickerEndInput hidden />
      <UIDateRangePickerValue :value="value" />
      <UIDateRangePickerTrigger aria-label="기간 선택 창 열기"><CalendarDays :size="18" /></UIDateRangePickerTrigger>
    </UIDateRangePickerAnchor>
    <UIDateRangePickerPortal>
      <UIDateRangePickerContent>
        <header>
          <UIDateRangePickerPreviousMonth aria-label="이전 달"><ChevronLeft :size="16" /></UIDateRangePickerPreviousMonth>
          <strong>{{ view.year }}년 {{ view.month }}월</strong>
          <UIDateRangePickerNextMonth aria-label="다음 달"><ChevronRight :size="16" /></UIDateRangePickerNextMonth>
        </header>
        <UIDateRangePickerGrid>
          <UIDateRangePickerCell v-for="day in dates.flat()" :key="[day.year, day.month, day.day].join('-')" :value="day">
            {{ day.day }}
          </UIDateRangePickerCell>
        </UIDateRangePickerGrid>
      </UIDateRangePickerContent>
    </UIDateRangePickerPortal>
  </UIDateRangePicker>
</template>
