<script setup lang="ts">
import {
  UIButton,
  UIDateTimePicker,
  UIDateTimePickerAnchor,
  UIDateTimePickerCell,
  UIDateTimePickerContent,
  UIDateTimePickerDateTimeInput,
  UIDateTimePickerGrid,
  UIDateTimePickerTrigger,
  useUITemporalDisplay,
} from "@connextable/ui";
import { CalendarDays } from "@lucide/vue";
import { ref } from "vue";

const open = ref(false);
const initial = { date: { year: 2026, month: 8, day: 22 }, time: { hour: 9, minute: 30, second: 0, millisecond: 0 } };
const display = useUITemporalDisplay();
</script>

<template>
  <div>
    <UIDateTimePicker v-model:open="open" :default-value="initial" v-slot="{ dates }">
      <UIDateTimePickerAnchor>
        <UIDateTimePickerDateTimeInput aria-label="업데이트 일시" />
        <UIDateTimePickerTrigger aria-label="업데이트 달력"><CalendarDays :size="18" aria-hidden="true" /></UIDateTimePickerTrigger>
      </UIDateTimePickerAnchor>
      <UIDateTimePickerContent>
        <UIDateTimePickerGrid>
          <UIDateTimePickerCell v-for="day in dates.flat()" :key="`${day.year}-${day.month}-${day.day}`" :value="day">
            {{ display.day(day) }}
          </UIDateTimePickerCell>
        </UIDateTimePickerGrid>
      </UIDateTimePickerContent>
    </UIDateTimePicker>
    <UIButton size="sm" variant="outline" @click="open = true">별도 버튼에서 달력 열기</UIButton>
  </div>
</template>
