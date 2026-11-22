<script setup lang="ts">
import { UIDateTimeRangePicker, UIDateTimeRangePickerAnchor, UIDateTimeRangePickerStartDateTimeInput, UIDateTimeRangePickerEndDateTimeInput, UIDateTimeRangePickerTrigger, UIDateTimeRangePickerPortal, UIDateTimeRangePickerContent, UIDateTimeRangePickerPreviousMonth, UIDateTimeRangePickerNextMonth, UIDateTimeRangePickerGrid, UIDateTimeRangePickerCell, UIDateTimeRangePickerValue, useUITemporalDisplay } from "@connextable/ui";
import { CalendarDays, ChevronLeft, ChevronRight } from "@lucide/vue";
import { ref } from "vue";

const range = ref({ start: { date: { year: 2026, month: 8, day: 22 }, time: { hour: 9, minute: 30, second: 0, millisecond: 0 } }, end: { date: { year: 2026, month: 8, day: 25 }, time: { hour: 17, minute: 30, second: 0, millisecond: 0 } } });
const display = useUITemporalDisplay();
</script>

<template>
  <UIDateTimeRangePicker v-model="range" v-slot="{ dates, value, view }">
    <UIDateTimeRangePickerAnchor>
      <UIDateTimeRangePickerStartDateTimeInput hidden />
      <UIDateTimeRangePickerEndDateTimeInput hidden />
      <UIDateTimeRangePickerValue :value="value" />
      <UIDateTimeRangePickerTrigger aria-label="기간 선택 창 열기"><CalendarDays :size="18" /></UIDateTimeRangePickerTrigger>
    </UIDateTimeRangePickerAnchor>
    <UIDateTimeRangePickerPortal>
      <UIDateTimeRangePickerContent>
        <header>
          <UIDateTimeRangePickerPreviousMonth aria-label="이전 달"><ChevronLeft :size="16" /></UIDateTimeRangePickerPreviousMonth>
          <strong>{{ display.yearMonth(view) }}</strong>
          <UIDateTimeRangePickerNextMonth aria-label="다음 달"><ChevronRight :size="16" /></UIDateTimeRangePickerNextMonth>
        </header>
        <UIDateTimeRangePickerGrid>
          <UIDateTimeRangePickerCell v-for="day in dates.flat()" :key="[day.year, day.month, day.day].join('-')" :value="day">
            {{ display.day(day) }}
          </UIDateTimeRangePickerCell>
        </UIDateTimeRangePickerGrid>
      </UIDateTimeRangePickerContent>
    </UIDateTimeRangePickerPortal>
  </UIDateTimeRangePicker>
</template>
