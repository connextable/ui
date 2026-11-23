<script setup lang="ts">
import { UIDatePicker, UIDatePickerAnchor, UIDatePickerInput, UIDatePickerTrigger, UIDatePickerPortal, UIDatePickerContent, UIDatePickerPreviousMonth, UIDatePickerNextMonth, UIDatePickerGrid, UIDatePickerCell, useTemporalDisplay } from "@connextable/ui";
import { CalendarDays, ChevronLeft, ChevronRight } from "@lucide/vue";
import { ref } from "vue";

const date = ref({ year: 2026, month: 8, day: 22 });
const display = useTemporalDisplay();
</script>

<template>
  <UIDatePicker v-model="date"  v-slot="{ dates, view }">
    <UIDatePickerAnchor>
      <UIDatePickerInput aria-label="날짜" />
      <UIDatePickerTrigger aria-label="날짜 선택 창 열기"><CalendarDays /></UIDatePickerTrigger>
    </UIDatePickerAnchor>
    <UIDatePickerPortal>
      <UIDatePickerContent>
        <header>
          <UIDatePickerPreviousMonth aria-label="이전 달"><ChevronLeft /></UIDatePickerPreviousMonth>
          <strong>{{ display.yearMonth(view) }}</strong>
          <UIDatePickerNextMonth aria-label="다음 달"><ChevronRight /></UIDatePickerNextMonth>
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
