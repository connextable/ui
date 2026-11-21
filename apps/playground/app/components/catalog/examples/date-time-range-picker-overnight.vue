<script setup lang="ts">
import { UIDateTimeRangePicker, UIDateTimeRangePickerAnchor, UIDateTimeRangePickerStartDateTimeInput, UIDateTimeRangePickerEndDateTimeInput, UIDateTimeRangePickerTrigger, UIDateTimeRangePickerContent, UIDateTimeRangePickerPreviousMonth, UIDateTimeRangePickerNextMonth, UIDateTimeRangePickerGrid, UIDateTimeRangePickerCell, UIDateTimeRangePickerValue } from "@connextable/ui";
import { CalendarDays, ChevronLeft, ChevronRight } from "@lucide/vue";

const initial = {
  start: { date: { year: 2026, month: 8, day: 22 }, time: { hour: 23, minute: 30, second: 0, millisecond: 0 } },
  end: { date: { year: 2026, month: 8, day: 23 }, time: { hour: 1, minute: 15, second: 0, millisecond: 0 } },
};
</script>

<template>
  <UIDateTimeRangePicker :default-value="initial" v-slot="{ dates, value, view }">
    <UIDateTimeRangePickerAnchor>
      <UIDateTimeRangePickerStartDateTimeInput hidden />
      <UIDateTimeRangePickerEndDateTimeInput hidden />
      <UIDateTimeRangePickerValue :value="value" layout="stacked" />
      <UIDateTimeRangePickerTrigger aria-label="기간 선택 창 열기"><CalendarDays :size="18" /></UIDateTimeRangePickerTrigger>
    </UIDateTimeRangePickerAnchor>
    <UIDateTimeRangePickerContent>
      <header>
        <UIDateTimeRangePickerPreviousMonth aria-label="이전 달"><ChevronLeft :size="16" /></UIDateTimeRangePickerPreviousMonth>
        <strong>{{ view.year }}년 {{ view.month }}월</strong>
        <UIDateTimeRangePickerNextMonth aria-label="다음 달"><ChevronRight :size="16" /></UIDateTimeRangePickerNextMonth>
      </header>
      <UIDateTimeRangePickerGrid>
        <UIDateTimeRangePickerCell v-for="day in dates.flat()" :key="[day.year, day.month, day.day].join('-')" :value="day">
          {{ day.day }}
        </UIDateTimeRangePickerCell>
      </UIDateTimeRangePickerGrid>
    </UIDateTimeRangePickerContent>
  </UIDateTimeRangePicker>
</template>
