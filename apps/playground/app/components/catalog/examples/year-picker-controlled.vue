<script setup lang="ts">
import {
  UIDatePickerValue,
  UIButton,
  UIYearPicker,
  UIYearPickerAnchor,
  UIYearPickerCell,
  UIYearPickerContent,
  UIYearPickerGrid,
  UIYearPickerInput,
  UIYearPickerPreviousPage,
  UIYearPickerNextPage,
  UIYearPickerTrigger,
  useUITemporalDisplay,
} from "@connextable/ui";
import { CalendarDays, ChevronLeft, ChevronRight } from "@lucide/vue";
import { ref } from "vue";

type YearValue = InstanceType<typeof UIYearPicker>["$props"]["modelValue"];
const selection = ref<YearValue>({ year: 2026, month: 1, day: 1 });
const display = useUITemporalDisplay();
</script>

<template>
  <div>
    <UIYearPicker v-model="selection" v-slot="{ value, years }">
      <UIYearPickerAnchor>
        <UIYearPickerInput hidden />
        <UIDatePickerValue :value="value" granularity="year" placeholder="연도 선택" />
        <UIYearPickerTrigger aria-label="조사 연도 고르기"><CalendarDays :size="18" aria-hidden="true" /></UIYearPickerTrigger>
      </UIYearPickerAnchor>
      <UIYearPickerContent>
        <UIYearPickerPreviousPage aria-label="이전 연도 묶음"><ChevronLeft :size="16" aria-hidden="true" /></UIYearPickerPreviousPage>
        <strong>{{ display.yearRange(years[0]?.[0], years.at(-1)?.at(-1)) }}</strong>
        <UIYearPickerNextPage aria-label="다음 연도 묶음"><ChevronRight :size="16" aria-hidden="true" /></UIYearPickerNextPage>
        <UIYearPickerGrid>
          <UIYearPickerCell v-for="year in years.flat()" :key="year.year" :value="year">
            {{ display.year(year) }}
          </UIYearPickerCell>
        </UIYearPickerGrid>
      </UIYearPickerContent>
    </UIYearPicker>
    <UIButton size="sm" variant="outline" @click="selection = { year: 2030, month: 1, day: 1 }">2030년으로 바꾸기</UIButton>
  </div>
</template>
