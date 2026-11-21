<script setup lang="ts">
import { UIRangeCalendar, UIRangeCalendarCell, UIRangeCalendarContent, UIRangeCalendarGrid } from "@connextable/ui";

const min = { year: 2026, month: 8, day: 20 };
const max = { year: 2026, month: 8, day: 27 };
</script>

<template>
  <UIRangeCalendar :default-highlighted-value="min" :policies="{ min, max }" v-slot="{ dates, value }">
    <UIRangeCalendarContent>
      <UIRangeCalendarGrid>
        <UIRangeCalendarCell v-for="day in dates.flat()" :key="`${day.year}-${day.month}-${day.day}`" :value="day">
          {{ day.day }}
        </UIRangeCalendarCell>
      </UIRangeCalendarGrid>
    </UIRangeCalendarContent>
    <output>{{ value ? `8월 ${value.start.day}일–${value.end.day}일` : "선택한 범위 없음" }}</output>
  </UIRangeCalendar>
</template>
