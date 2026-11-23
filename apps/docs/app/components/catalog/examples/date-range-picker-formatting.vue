<script setup lang="ts">
import {
  UIButton,
  UICalendarPeriodHeader,
  UIDateRangePicker,
  UIDateRangePickerAnchor,
  UIDateRangePickerCell,
  UIDateRangePickerContent,
  UIDateRangePickerGrid,
  UIDateRangePickerNextMonth,
  UIDateRangePickerPreviousMonth,
  UIDateRangePickerTrigger,
  UIDateRangePickerValue,
  UITemporalProvider,
  type UITemporalDisplayFormats,
  useTemporalDisplay,
} from "@connextable/ui";
import { CalendarDays, ChevronLeft, ChevronRight } from "@lucide/vue";
import { ref } from "vue";

const range = ref({ start: { year: 2026, month: 8, day: 22 }, end: { year: 2026, month: 8, day: 25 } });
const formats: UITemporalDisplayFormats = {
  date: { year: "numeric", month: "long", day: "numeric", weekday: "short" },
  yearMonth: { year: "numeric", month: "2-digit" },
};
const showWeekday = ref(false);
const display = useTemporalDisplay();
</script>

<template>
  <div class="formatting-example">
    <UIButton variant="outline" size="sm" :aria-pressed="showWeekday" @click="showWeekday = !showWeekday">요일 표시</UIButton>
    <UITemporalProvider :formats="showWeekday ? formats : undefined">
      <UIDateRangePicker v-model="range" v-slot="{ dates, value, view }">
        <UIDateRangePickerAnchor>
          <UIDateRangePickerValue :value="value" />
          <UIDateRangePickerTrigger aria-label="표기 예제의 날짜 범위 선택"><CalendarDays aria-hidden="true" /></UIDateRangePickerTrigger>
        </UIDateRangePickerAnchor>
        <UIDateRangePickerContent>
          <UICalendarPeriodHeader :view="view">
            <template #previous>
              <UIDateRangePickerPreviousMonth aria-label="이전 달"><ChevronLeft aria-hidden="true" /></UIDateRangePickerPreviousMonth>
            </template>
            <template #next>
              <UIDateRangePickerNextMonth aria-label="다음 달"><ChevronRight aria-hidden="true" /></UIDateRangePickerNextMonth>
            </template>
            <template #grid>
              <UIDateRangePickerGrid>
                <UIDateRangePickerCell v-for="day in dates.flat()" :key="`${day.year}-${day.month}-${day.day}`" :value="day">
                  {{ display.day(day) }}
                </UIDateRangePickerCell>
              </UIDateRangePickerGrid>
            </template>
          </UICalendarPeriodHeader>
        </UIDateRangePickerContent>
      </UIDateRangePicker>
    </UITemporalProvider>
  </div>
</template>

<style scoped>
.formatting-example {
  display: grid;
  justify-items: start;
  gap: var(--ui-space-sm);
  inline-size: min(100%, 22rem);
}
</style>
