<script setup lang="ts">
import { ChevronLeft, ChevronRight } from "@lucide/vue";
import {
  UIRangeCalendar,
  UIRangeCalendarCell,
  UIRangeCalendarContent,
  UIRangeCalendarGrid,
  UIRangeCalendarNextWeek,
  UIRangeCalendarPreviousWeek,
} from "@connextable/ui";

const stay = {
  start: { year: 2026, month: 8, day: 22 },
  end: { year: 2026, month: 8, day: 25 },
}

</script>

<template>
  <UIRangeCalendar default-view="week" :default-value="stay" v-slot="{ dates, view }">
    <UIRangeCalendarContent>
      <header>
        <UIRangeCalendarPreviousWeek aria-label="이전 주"><ChevronLeft :size="16" aria-hidden="true" /></UIRangeCalendarPreviousWeek>
        <strong>{{ view.year }}년 {{ view.month }}월</strong>
        <UIRangeCalendarNextWeek aria-label="다음 주"><ChevronRight :size="16" aria-hidden="true" /></UIRangeCalendarNextWeek>
      </header>
      <UIRangeCalendarGrid data-view="week">
        <UIRangeCalendarCell v-for="day in dates.flat()" :key="JSON.stringify(day)" :value="day">
          {{ day.day }}
        </UIRangeCalendarCell>
      </UIRangeCalendarGrid>
    </UIRangeCalendarContent>
  </UIRangeCalendar>
</template>
