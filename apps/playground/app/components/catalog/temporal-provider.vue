<script setup lang="ts">
import { UIButton, UICalendar, UICalendarCell, UICalendarContent, UICalendarGrid, UITemporalProvider } from "@connextable/ui";
import { computed, ref } from "vue";

const dates = [
  { year: 2026, month: 8, day: 22 },
  { year: 2026, month: 9, day: 7 },
] as const;
const secondDate = ref(false);
const referenceDate = computed(() => dates[secondDate.value ? 1 : 0]);
</script>

<template>
  <div class="reference-calendar">
    <UITemporalProvider :reference-date="referenceDate">
      <UICalendar :key="referenceDate.month" v-slot="{ dates: calendarDates, view }">
        <UICalendarContent>
          <strong class="reference-calendar__heading">{{ view.year }}년 {{ view.month }}월</strong>
          <div class="reference-calendar__weekdays" aria-hidden="true">
            <span v-for="day in ['월', '화', '수', '목', '금', '토', '일']" :key="day">{{ day }}</span>
          </div>
          <UICalendarGrid aria-label="기준 날짜의 달력">
            <UICalendarCell v-for="day in calendarDates.flat()" :key="`${day.year}-${day.month}-${day.day}`" :value="day">
              {{ day.day }}
            </UICalendarCell>
          </UICalendarGrid>
        </UICalendarContent>
      </UICalendar>
    </UITemporalProvider>
    <div class="reference-calendar__actions">
      <span aria-live="polite">기준일 {{ referenceDate.month }}월 {{ referenceDate.day }}일</span>
      <UIButton size="sm" variant="outline" @click="secondDate = !secondDate">
        {{ secondDate ? "8월 22일로 변경" : "9월 7일로 변경" }}
      </UIButton>
    </div>
  </div>
</template>

<style scoped>
.reference-calendar {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--ui-space-sm);
  inline-size: 20rem;
  max-inline-size: 100%;
}

.reference-calendar__heading {
  padding-block: var(--ui-space-xs);
  text-align: center;
}

.reference-calendar__weekdays {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: var(--ui-space-2xs);
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-metadata);
  text-align: center;
}

.reference-calendar__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--ui-space-sm);
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-body-sm);
}
</style>
