<script setup lang="ts">
import { ChevronLeft, ChevronRight } from "@lucide/vue";
import {
  UIDateRangePickerValue,
  UIRangeCalendar,
  UIRangeCalendarCell,
  UIRangeCalendarContent,
  UIRangeCalendarGrid,
  UIRangeCalendarStartInput,
  UIRangeCalendarEndInput,
  UIRangeCalendarNextMonth,
  UIRangeCalendarPreviousMonth,
  UIForm,
  UIFormActions,
  UIFormSubmit,
  useUITemporalDisplay,
} from "@connextable/ui";
import { ref } from "vue";

const stay = {
  start: { year: 2026, month: 8, day: 22 },
  end: { year: 2026, month: 8, day: 25 },
};
const submitted = ref("");

const display = useUITemporalDisplay();
</script>

<template>
  <UIForm @submit="({ formData }) => { submitted = [formData.get('start'), formData.get('end')].join(' – ') }">
    <UIRangeCalendar :default-value="stay" v-slot="{ value, dates, view }" label="숙박 기간">
      <UIRangeCalendarStartInput name="start" hidden />
      <UIRangeCalendarEndInput name="end" hidden />
      <UIDateRangePickerValue :value="value" />
      <UIRangeCalendarContent>
        <header>
          <UIRangeCalendarPreviousMonth aria-label="이전 달"><ChevronLeft :size="16" aria-hidden="true" /></UIRangeCalendarPreviousMonth>
          <strong>{{ display.yearMonth(view) }}</strong>
          <UIRangeCalendarNextMonth aria-label="다음 달"><ChevronRight :size="16" aria-hidden="true" /></UIRangeCalendarNextMonth>
        </header>
        <UIRangeCalendarGrid>
          <UIRangeCalendarCell v-for="day in dates.flat()" :key="JSON.stringify(day)" :value="day">
            {{ display.day(day) }}
          </UIRangeCalendarCell>
        </UIRangeCalendarGrid>
      </UIRangeCalendarContent>
    </UIRangeCalendar>
    <UIFormActions><UIFormSubmit>제출</UIFormSubmit></UIFormActions>
    <template #output><span v-if="submitted">{{ submitted }}</span></template>
  </UIForm>
</template>
