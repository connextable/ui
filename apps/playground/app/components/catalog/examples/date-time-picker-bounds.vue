<script setup lang="ts">
import { UIDateTimePicker, UIDateTimePickerAnchor, UIDateTimePickerCell, UIDateTimePickerContent, UIDateTimePickerDateTimeInput, UIDateTimePickerGrid, UIDateTimePickerTrigger } from "@connextable/ui";
import { CalendarDays } from "@lucide/vue";

const initial = { date: { year: 2026, month: 8, day: 22 }, time: { hour: 10, minute: 0, second: 0, millisecond: 0 } };
const policies = { min: { date: { year: 2026, month: 8, day: 22 }, time: { hour: 9, minute: 0, second: 0, millisecond: 0 } }, max: { date: { year: 2026, month: 8, day: 24 }, time: { hour: 17, minute: 0, second: 0, millisecond: 0 } } };
</script>

<template>
  <UIDateTimePicker :default-value="initial" :policies="policies" v-slot="{ dates }">
    <UIDateTimePickerAnchor>
      <UIDateTimePickerDateTimeInput aria-label="검토 예약 일시" />
      <UIDateTimePickerTrigger aria-label="예약 날짜 선택"><CalendarDays :size="18" aria-hidden="true" /></UIDateTimePickerTrigger>
    </UIDateTimePickerAnchor>
    <UIDateTimePickerContent>
      <UIDateTimePickerGrid>
        <UIDateTimePickerCell v-for="day in dates.flat()" :key="`${day.month}-${day.day}`" :value="day">{{ day.day }}</UIDateTimePickerCell>
      </UIDateTimePickerGrid>
    </UIDateTimePickerContent>
  </UIDateTimePicker>
</template>
