<script setup lang="ts">
import { UIDateTimePicker, UIDateTimePickerAnchor, UIDateTimePickerDateTimeInput, UIDateTimePickerTrigger, UIDateTimePickerContent, UIDateTimePickerPreviousMonth, UIDateTimePickerNextMonth, UIDateTimePickerGrid, UIDateTimePickerCell } from "@connextable/ui";
import { CalendarDays, ChevronLeft, ChevronRight } from "@lucide/vue";

const initial = { date: { year: 2026, month: 8, day: 22 }, time: { hour: 9, minute: 30, second: 0, millisecond: 0 } };
</script>

<template>
  <UIDateTimePicker :default-value="initial"  v-slot="{ dates, view }">
    <UIDateTimePickerAnchor>
      <UIDateTimePickerDateTimeInput aria-label="날짜" />
      <UIDateTimePickerTrigger aria-label="날짜 선택 창 열기"><CalendarDays :size="18" /></UIDateTimePickerTrigger>
    </UIDateTimePickerAnchor>
    <UIDateTimePickerContent>
      <header>
        <UIDateTimePickerPreviousMonth aria-label="이전 달"><ChevronLeft :size="16" /></UIDateTimePickerPreviousMonth>
        <strong>{{ view.year }}년 {{ view.month }}월</strong>
        <UIDateTimePickerNextMonth aria-label="다음 달"><ChevronRight :size="16" /></UIDateTimePickerNextMonth>
      </header>
      <UIDateTimePickerGrid>
        <UIDateTimePickerCell v-for="day in dates.flat()" :key="[day.year, day.month, day.day].join('-')" :value="day">
          {{ day.day }}
        </UIDateTimePickerCell>
      </UIDateTimePickerGrid>
    </UIDateTimePickerContent>
  </UIDateTimePicker>
</template>
