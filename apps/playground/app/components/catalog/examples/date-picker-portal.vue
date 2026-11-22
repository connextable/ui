<script setup lang="ts">
import { UIDatePicker, UIDatePickerAnchor, UIDatePickerInput, UIDatePickerTrigger, UIDatePickerPortal, UIDatePickerContent, UIDatePickerPreviousMonth, UIDatePickerNextMonth, UIDatePickerGrid, UIDatePickerCell, useUITemporalDisplay } from "@connextable/ui";
import { CalendarDays, ChevronLeft, ChevronRight } from "@lucide/vue";

const initial = { year: 2026, month: 8, day: 22 };
const display = useUITemporalDisplay();
</script>

<template>
  <UIDatePicker :default-value="initial"  v-slot="{ dates, view }">
    <UIDatePickerAnchor>
      <UIDatePickerInput aria-label="날짜" />
      <UIDatePickerTrigger aria-label="날짜 선택 창 열기"><CalendarDays :size="18" /></UIDatePickerTrigger>
    </UIDatePickerAnchor>
    <UIDatePickerPortal>
      <UIDatePickerContent>
        <header>
          <UIDatePickerPreviousMonth aria-label="이전 달"><ChevronLeft :size="16" /></UIDatePickerPreviousMonth>
          <strong>{{ display.yearMonth(view) }}</strong>
          <UIDatePickerNextMonth aria-label="다음 달"><ChevronRight :size="16" /></UIDatePickerNextMonth>
        </header>
        <UIDatePickerGrid>
          <UIDatePickerCell v-for="day in dates.flat()" :key="[day.year, day.month, day.day].join('-')" :value="day">
            {{ display.day(day) }}
          </UIDatePickerCell>
        </UIDatePickerGrid>
      </UIDatePickerContent>
    </UIDatePickerPortal>
  </UIDatePicker>
</template>
