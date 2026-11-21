<script setup lang="ts">
import {
  UIButton,
  UIDateRangePicker,
  UIDateRangePickerAnchor,
  UIDateRangePickerCell,
  UIDateRangePickerContent,
  UIDateRangePickerGrid,
  UIDateRangePickerTrigger,
  UIDateRangePickerValue,
  UITemporalProvider,
  type UIDateValue,
} from "@connextable/ui";
import { CalendarDays } from "@lucide/vue";
import { ref } from "vue";

const initial = { start: { year: 2026, month: 8, day: 22 }, end: { year: 2026, month: 8, day: 25 } };
const korean = { locale: "ko-KR", timeZone: "Asia/Seoul" };
const english = new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
const useEnglish = ref(false);

function formatEnglish({ year, month, day }: UIDateValue) {
  const date = new Date(0);
  date.setUTCFullYear(year, month - 1, day);
  return english.format(date);
}
</script>

<template>
  <div class="formatting-example">
    <UIButton variant="outline" size="sm" :aria-pressed="useEnglish" @click="useEnglish = !useEnglish">영문 날짜</UIButton>
    <UITemporalProvider :formatting="korean">
      <UIDateRangePicker :default-value="initial" v-slot="{ dates, value }">
        <UIDateRangePickerAnchor>
          <UIDateRangePickerValue :value="value" :format="useEnglish ? formatEnglish : undefined" />
          <UIDateRangePickerTrigger aria-label="표기 예제의 날짜 범위 선택"><CalendarDays :size="18" aria-hidden="true" /></UIDateRangePickerTrigger>
        </UIDateRangePickerAnchor>
        <UIDateRangePickerContent>
          <UIDateRangePickerGrid>
            <UIDateRangePickerCell v-for="day in dates.flat()" :key="`${day.year}-${day.month}-${day.day}`" :value="day">
              {{ day.day }}
            </UIDateRangePickerCell>
          </UIDateRangePickerGrid>
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
