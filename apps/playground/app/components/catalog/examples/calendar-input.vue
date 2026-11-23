<script setup lang="ts">
import { ChevronLeft, ChevronRight } from "@lucide/vue";
import {
  UICalendar,
  UICalendarCell,
  UICalendarContent,
  UICalendarGrid,
  UICalendarInput,
  UICalendarNextMonth,
  UICalendarPreviousMonth,
  UIDateField,
  UIForm,
  UIFormActions,
  UIFormSubmit,
  type UIDateValue,
  useUITemporalDisplay,
} from "@connextable/ui";

import { ref } from 'vue'
const selected = ref<UIDateValue | null>({ year: 2026, month: 8, day: 24 });
const submitted = ref("");
const display = useUITemporalDisplay();
</script>

<template>
  <UIForm @submit="({ values }) => { submitted = String(values.releaseDate ?? '') }">
    <UIDateField v-model="selected" label="배포 날짜" />
    <UICalendar v-model="selected" v-slot="{ dates, view }" label="배포 달력">
      <UICalendarInput hidden name="releaseDate" />
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
    <UIFormActions><UIFormSubmit>제출</UIFormSubmit></UIFormActions>
    <template #output><span v-if="submitted">{{ submitted }}</span></template>
  </UIForm>
</template>
