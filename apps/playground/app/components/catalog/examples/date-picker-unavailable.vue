<script setup lang="ts">
import { UIDatePicker, UIDatePickerAnchor, UIDatePickerInput, UIDatePickerTrigger, UIDatePickerContent, UIDatePickerPreviousMonth, UIDatePickerNextMonth, UIDatePickerGrid, UIDatePickerCell } from "@connextable/ui";
import { CalendarDays, ChevronLeft, ChevronRight } from "@lucide/vue";

const initial = { year: 2026, month: 8, day: 22 };
</script>

<template>
  <UIDatePicker :default-value="initial" :policies="{ unavailable: (day) => day.year === 2026 && day.month === 8 && day.day === 24 }" v-slot="{ dates, view }">
    <UIDatePickerAnchor>
      <UIDatePickerInput aria-label="날짜" />
      <UIDatePickerTrigger aria-label="날짜 선택 창 열기"><CalendarDays :size="18" /></UIDatePickerTrigger>
    </UIDatePickerAnchor>
    <UIDatePickerContent>
      <header>
        <UIDatePickerPreviousMonth aria-label="이전 달"><ChevronLeft :size="16" /></UIDatePickerPreviousMonth>
        <strong>{{ view.year }}년 {{ view.month }}월</strong>
        <UIDatePickerNextMonth aria-label="다음 달"><ChevronRight :size="16" /></UIDatePickerNextMonth>
      </header>
      <UIDatePickerGrid>
        <UIDatePickerCell v-for="day in dates.flat()" :key="[day.year, day.month, day.day].join('-')" :value="day">
          {{ day.day }}
        </UIDatePickerCell>
      </UIDatePickerGrid>
    </UIDatePickerContent>
  </UIDatePicker>
</template>
