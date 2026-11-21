<script setup lang="ts">
import { UIDatePicker, UIDatePickerAnchor, UIDatePickerInput, UIDatePickerTrigger, UIDatePickerContent, UIDatePickerGrid, UIDatePickerCell } from "@connextable/ui";
import { CalendarDays } from "@lucide/vue";

const min = { year: 2026, month: 8, day: 20 };
const max = { year: 2026, month: 8, day: 27 };
</script>

<template>
  <UIDatePicker :default-value="{ year: 2026, month: 8, day: 22 }" :policies="{ min, max }" v-slot="{ dates }">
    <UIDatePickerAnchor>
      <UIDatePickerInput aria-label="배송 날짜" />
      <UIDatePickerTrigger aria-label="배송 날짜 선택"><CalendarDays :size="18" aria-hidden="true" /></UIDatePickerTrigger>
    </UIDatePickerAnchor>
    <UIDatePickerContent>
      <UIDatePickerGrid>
        <UIDatePickerCell v-for="day in dates.flat()" :key="`${day.year}-${day.month}-${day.day}`" :value="day">
          {{ day.day }}
        </UIDatePickerCell>
      </UIDatePickerGrid>
    </UIDatePickerContent>
  </UIDatePicker>
</template>
