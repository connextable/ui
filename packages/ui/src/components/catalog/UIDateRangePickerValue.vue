<script setup lang="ts">
import type { DateRange, DateValue } from "@sectile/temporal/date-field";
import PickerRangeValue from "./PickerRangeValue.vue";
import { useCalendarValue, type CalendarGranularity } from "./useCalendarValue";

const { value, format, granularity = "day", startPlaceholder = "시작일", endPlaceholder = "종료일" } = defineProps<{
  value: DateRange | null;
  format?: (date: DateValue) => string;
  granularity?: CalendarGranularity;
  startPlaceholder?: string;
  endPlaceholder?: string;
}>();

const endpoint = useCalendarValue();
</script>

<template>
  <PickerRangeValue
    :start="value ? endpoint(value.start, granularity, format) : undefined"
    :end="value ? endpoint(value.end, granularity, format) : undefined"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
  />
</template>
