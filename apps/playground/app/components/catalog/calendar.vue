<script setup lang="ts">
import { ChevronLeft, ChevronRight } from "@lucide/vue";
import {
  UICalendar,
  UICalendarCell,
  UICalendarContent,
  UICalendarGrid,
  UICalendarNextMonth,
  UICalendarPreviousMonth,
  type UIDateValue,
  useUITemporalDisplay,
} from "@connextable/ui";

import { ref } from 'vue'
const selected = ref<UIDateValue | null>(null)
const initial = { year: 2026, month: 8, day: 24 }
const display = useUITemporalDisplay();
</script>

<template>
  <UICalendar v-model="selected" :default-highlighted-value="initial" default-view="month" v-slot="{ dates, view }" label="배포 달력">
    <UICalendarContent>
      <header>
        <UICalendarPreviousMonth aria-label="이전 달"><ChevronLeft :size="16" aria-hidden="true" /></UICalendarPreviousMonth>
        <strong>{{ display.yearMonth(view) }}</strong>
        <UICalendarNextMonth aria-label="다음 달"><ChevronRight :size="16" aria-hidden="true" /></UICalendarNextMonth>
      </header>
      <UICalendarGrid>
        <UICalendarCell v-for="day in dates.flat()" :key="`${day.year}-${day.month}-${day.day}`" :value="day">
          {{ display.day(day) }}
        </UICalendarCell>
      </UICalendarGrid>
    </UICalendarContent>
  </UICalendar>
</template>
