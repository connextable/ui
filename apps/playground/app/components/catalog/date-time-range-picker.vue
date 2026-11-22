<script setup lang="ts">
import {
  UICalendarPeriodHeader,
  UIDateTimeRangePicker,
  UIDateTimeRangePickerAnchor,
  UIDateTimeRangePickerCell,
  UIDateTimeRangePickerContent,
  UIDateTimeRangePickerEndDateTimeInput,
  UIDateTimeRangePickerGrid,
  UIDateTimeRangePickerMonthCell,
  UIDateTimeRangePickerNextMonth,
  UIDateTimeRangePickerNextYear,
  UIDateTimeRangePickerPreviousMonth,
  UIDateTimeRangePickerPreviousYear,
  UIDateTimeRangePickerStartDateTimeInput,
  UIDateTimeRangePickerTrigger,
  UIDateTimeRangePickerValue,
  UIDateTimeRangePickerYearViewTrigger,
  UITimePicker,
  UITimePickerColumn,
  UITimePickerItem,
  type UIDateValue,
  useUITemporalDisplay,
} from "@connextable/ui";
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight } from "@lucide/vue";
import { computed, ref } from "vue";

type DateTimeRange = NonNullable<InstanceType<typeof UIDateTimeRangePicker>["$props"]["modelValue"]>;
type Time = DateTimeRange["start"]["time"];
const initial = {
  start: {
    date: { year: 2026, month: 8, day: 22 },
    time: { hour: 9, minute: 30, second: 0, millisecond: 0 },
  },
  end: {
    date: { year: 2026, month: 8, day: 25 },
    time: { hour: 17, minute: 30, second: 0, millisecond: 0 },
  },
};
const range = ref<DateTimeRange | null>(initial);
const highlighted = ref<UIDateValue>(initial.start.date);
const display = useUITemporalDisplay();
const panelSections = [
  { id: "start", label: "시작 시간" },
  { id: "calendar" },
  { id: "end", label: "종료 시간" },
] as const;

const timePolicies = computed(() => {
  const { start, end } = range.value ?? initial;
  const sameDay = start.date.year === end.date.year &&
    start.date.month === end.date.month && start.date.day === end.date.day;
  return {
    start: sameDay ? { max: end.time } : undefined,
    end: sameDay ? { min: start.time } : undefined,
  };
});

function updateTime(endpoint: "start" | "end", time: Time | null) {
  const selected = range.value;
  if (!selected || !time) return;
  range.value = { ...selected, [endpoint]: { ...selected[endpoint], time } };
}
</script>

<template>
  <UIDateTimeRangePicker v-model="range" v-model:highlighted-value="highlighted" v-slot="{ dates, months, open, value, view, viewMode }">
    <UIDateTimeRangePickerAnchor>
      <UIDateTimeRangePickerStartDateTimeInput hidden />
      <UIDateTimeRangePickerEndDateTimeInput hidden />
      <UIDateTimeRangePickerValue :value="value" />
      <UIDateTimeRangePickerTrigger aria-label="기간 선택 창 열기"><CalendarDays :size="18" aria-hidden="true" /></UIDateTimeRangePickerTrigger>
    </UIDateTimeRangePickerAnchor>
    <UIDateTimeRangePickerContent class="date-time-range-picker__panel" aria-label="날짜와 시간 범위 선택">
      <template v-for="section in panelSections" :key="section.id">
        <UICalendarPeriodHeader v-if="section.id === 'calendar'" class="date-time-range-picker__calendar"
          :view="view" :choosing-month="viewMode === 'year'" year-first
          @select-year="year => { highlighted = { year, month: view.month, day: 1 } }">
          <template #previous>
            <UIDateTimeRangePickerPreviousYear v-if="viewMode === 'year'" aria-label="이전 연도"><ChevronLeft :size="16" aria-hidden="true" /></UIDateTimeRangePickerPreviousYear>
            <UIDateTimeRangePickerPreviousMonth v-else aria-label="이전 달"><ChevronLeft :size="16" aria-hidden="true" /></UIDateTimeRangePickerPreviousMonth>
          </template>
          <UIDateTimeRangePickerYearViewTrigger aria-label="연도와 월 선택">
            {{ display.yearMonth(view) }} <ChevronDown :size="14" aria-hidden="true" />
          </UIDateTimeRangePickerYearViewTrigger>
          <template #next>
            <UIDateTimeRangePickerNextYear v-if="viewMode === 'year'" aria-label="다음 연도"><ChevronRight :size="16" aria-hidden="true" /></UIDateTimeRangePickerNextYear>
            <UIDateTimeRangePickerNextMonth v-else aria-label="다음 달"><ChevronRight :size="16" aria-hidden="true" /></UIDateTimeRangePickerNextMonth>
          </template>
          <template #grid>
            <UIDateTimeRangePickerGrid :data-view="viewMode">
              <template v-if="viewMode === 'year'">
                <UIDateTimeRangePickerMonthCell v-for="month in months.flat()" :key="month.month" :value="month">
                  {{ display.month(month) }}
                </UIDateTimeRangePickerMonthCell>
              </template>
              <template v-else>
                <UIDateTimeRangePickerCell v-for="day in dates.flat()" :key="[day.year, day.month, day.day].join('-')" :value="day">
                  {{ display.day(day) }}
                </UIDateTimeRangePickerCell>
              </template>
            </UIDateTimeRangePickerGrid>
          </template>
        </UICalendarPeriodHeader>
        <div v-else-if="open && range" class="date-time-range-picker__time" :data-endpoint="section.id">
          <span class="ui-field-label">{{ section.label }}</span>
          <UITimePicker
            :label="section.label"
            :model-value="range[section.id].time"
            :policies="timePolicies[section.id]"
            precision="minute"
            v-slot="{ parts }"
            @update:model-value="updateTime(section.id, $event)"
          >
            <UITimePickerColumn v-for="part in parts" :key="part" :part="part" v-slot="{ choices }">
              <UITimePickerItem v-for="choice in choices" :key="choice.id" :value="choice.id">
                {{ choice.label }}
              </UITimePickerItem>
            </UITimePickerColumn>
          </UITimePicker>
        </div>
      </template>
    </UIDateTimeRangePickerContent>
  </UIDateTimeRangePicker>
</template>

<style scoped>
.date-time-range-picker__panel:not([hidden]) {
  display: grid;
  grid-template-areas: "start calendar end";
  grid-template-columns: max-content minmax(0, 20rem) max-content;
  gap: var(--ui-space-md);
  inline-size: max-content;
  max-inline-size: min(calc(100dvw - 1rem), var(--sectile-position-available-width, 100dvw));
  padding: var(--ui-space-md);
}

.date-time-range-picker__calendar {
  grid-area: calendar;
  align-self: start;
}

.date-time-range-picker__time {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  justify-items: center;
  gap: var(--ui-space-sm);
  min-inline-size: 0;

  &[data-endpoint="start"] { grid-area: start; }
  &[data-endpoint="end"] { grid-area: end; }
}

@media (width > 42rem) {
  .date-time-range-picker__time :deep(.ui-time-picker-column > [role="listbox"]) {
    contain: size;
    max-block-size: none;
  }
}

@media (max-width: 42rem) {
  .date-time-range-picker__panel:not([hidden]) {
    grid-template-areas:
      "calendar calendar"
      "start end";
    grid-template-columns: repeat(2, minmax(0, 1fr));
    inline-size: min(22rem, calc(100dvw - 1rem));
    max-block-size: min(38rem, var(--sectile-position-available-height, 85dvh));
  }
}
</style>
