<script setup lang="ts">
import { ChevronLeft, ChevronRight } from "@lucide/vue";
import {
  UIRangeCalendar,
  UIRangeCalendarCell,
  UIRangeCalendarContent,
  UIRangeCalendarGrid,
  UIRangeCalendarNextMonth,
  UIRangeCalendarPreviousMonth,
} from "@connextable/ui";

const stay = {
  start: { year: 2026, month: 8, day: 22 },
  end: { year: 2026, month: 8, day: 25 },
}

</script>

<template>
  <UIRangeCalendar :default-value="stay" v-slot="{ dates, view }" label="숙박 달력">
    <UIRangeCalendarContent>
      <header>
        <UIRangeCalendarPreviousMonth aria-label="이전 달"><ChevronLeft :size="16" aria-hidden="true" /></UIRangeCalendarPreviousMonth>
        <strong>{{ view.year }}년 {{ view.month }}월</strong>
        <UIRangeCalendarNextMonth aria-label="다음 달"><ChevronRight :size="16" aria-hidden="true" /></UIRangeCalendarNextMonth>
      </header>
      <UIRangeCalendarGrid>
        <UIRangeCalendarCell v-for="day in dates.flat()" :key="JSON.stringify(day)" :value="day">
          {{ day.day }}
        </UIRangeCalendarCell>
      </UIRangeCalendarGrid>
    </UIRangeCalendarContent>
  </UIRangeCalendar>
</template>
