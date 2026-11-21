<script setup lang="ts">
import { ChevronLeft, ChevronRight } from "@lucide/vue";
import {
  UICalendar,
  UICalendarCell,
  UICalendarContent,
  UICalendarGrid,
  UICalendarNextWeek,
  UICalendarPreviousWeek,
} from "@connextable/ui";
</script>

<template>
  <UICalendar
    default-view="week"
    :default-highlighted-value="{ year: 2026, month: 8, day: 24 }"
    label="주간 일정"
    v-slot="{ dates, view }"
  >
    <UICalendarContent>
      <header>
        <UICalendarPreviousWeek aria-label="이전 주"><ChevronLeft :size="16" aria-hidden="true" /></UICalendarPreviousWeek>
        <strong>{{ view.year }}년 {{ view.month }}월</strong>
        <UICalendarNextWeek aria-label="다음 주"><ChevronRight :size="16" aria-hidden="true" /></UICalendarNextWeek>
      </header>
      <UICalendarGrid>
        <UICalendarCell v-for="day in dates.flat()" :key="`${day.year}-${day.month}-${day.day}`" :value="day">
          {{ day.day }}
        </UICalendarCell>
      </UICalendarGrid>
    </UICalendarContent>
  </UICalendar>
</template>
