<script setup lang="ts">
import { UIRangeCalendar, UIRangeCalendarCell, UIRangeCalendarContent, UIRangeCalendarGrid, useUITemporalDisplay } from "@connextable/ui";

const min = { year: 2026, month: 8, day: 20 };
const max = { year: 2026, month: 8, day: 27 };
const display = useUITemporalDisplay();
</script>

<template>
  <UIRangeCalendar :default-highlighted-value="min" :policies="{ min, max }" v-slot="{ dates, value }">
    <UIRangeCalendarContent>
      <UIRangeCalendarGrid>
        <UIRangeCalendarCell v-for="day in dates.flat()" :key="`${day.year}-${day.month}-${day.day}`" :value="day">
          {{ display.day(day) }}
        </UIRangeCalendarCell>
      </UIRangeCalendarGrid>
    </UIRangeCalendarContent>
    <output>{{ value ? `${display.date(value.start)}–${display.date(value.end)}` : "선택한 범위 없음" }}</output>
  </UIRangeCalendar>
</template>
