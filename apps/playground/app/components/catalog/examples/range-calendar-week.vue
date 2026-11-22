<script setup lang="ts">
import { ChevronLeft, ChevronRight } from "@lucide/vue";
import {
  UIRangeCalendar,
  UIRangeCalendarCell,
  UIRangeCalendarContent,
  UIRangeCalendarGrid,
  UIRangeCalendarNextWeek,
  UIRangeCalendarPreviousWeek,
  useUITemporalDisplay,
} from "@connextable/ui";
import { ref } from "vue";

const stay = ref({
  start: { year: 2026, month: 8, day: 22 },
  end: { year: 2026, month: 8, day: 25 },
})

const display = useUITemporalDisplay();
</script>

<template>
  <UIRangeCalendar default-view="week" v-model="stay" v-slot="{ dates, view }">
    <UIRangeCalendarContent>
      <header>
        <UIRangeCalendarPreviousWeek aria-label="이전 주"><ChevronLeft :size="16" aria-hidden="true" /></UIRangeCalendarPreviousWeek>
        <strong>{{ display.yearMonth(view) }}</strong>
        <UIRangeCalendarNextWeek aria-label="다음 주"><ChevronRight :size="16" aria-hidden="true" /></UIRangeCalendarNextWeek>
      </header>
      <UIRangeCalendarGrid data-view="week">
        <UIRangeCalendarCell v-for="day in dates.flat()" :key="JSON.stringify(day)" :value="day">
          {{ display.day(day) }}
        </UIRangeCalendarCell>
      </UIRangeCalendarGrid>
    </UIRangeCalendarContent>
  </UIRangeCalendar>
</template>
