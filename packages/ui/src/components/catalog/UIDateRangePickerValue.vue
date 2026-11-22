<script setup lang="ts">
import type { DateRange, DateValue } from "@sectile/temporal/date-field";
import { computed } from "vue";
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
const end = computed(() => {
  if (!value) return undefined;
  const sameYear = value.start.year === value.end.year;
  const endFormat = granularity === "month" && sameYear ? "month-without-year" : granularity;
  return endpoint(value.end, endFormat, format);
});
</script>

<template>
  <PickerRangeValue
    :start="value ? endpoint(value.start, granularity, format) : undefined"
    :end="end"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
  />
</template>
