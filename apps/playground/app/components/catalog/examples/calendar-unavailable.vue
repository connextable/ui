<script setup lang="ts">
import {
  UICalendar,
  UICalendarCell,
  UICalendarContent,
  UICalendarGrid,
  UICalendarNextMonth,
  UICalendarPreviousMonth,
  type UIDateValue,
} from "@connextable/ui";

import { ref } from 'vue'
const selected = ref<UIDateValue | null>(null)
const initial = { year: 2026, month: 8, day: 22 }
</script>

<template>
  <UICalendar :policies="{ unavailable: (day) => day.year === 2026 && day.month === 8 && day.day === 24 }" v-model="selected" :default-highlighted-value="initial" default-view="month" v-slot="{ dates, view }" label="배포 일정">
    <UICalendarContent>
      <header>
        <UICalendarPreviousMonth>이전</UICalendarPreviousMonth>
        <strong>{{ view.year }}-{{ view.month }}</strong>
        <UICalendarNextMonth>다음</UICalendarNextMonth>
      </header>
      <UICalendarGrid>
        <UICalendarCell v-for="day in dates.flat()" :key="`${day.year}-${day.month}-${day.day}`" :value="day">
          {{ day.day }}
        </UICalendarCell>
      </UICalendarGrid>
    </UICalendarContent>
  </UICalendar>
</template>
