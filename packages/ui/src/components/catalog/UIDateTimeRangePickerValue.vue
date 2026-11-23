<script setup lang="ts">
import { formatDateTimeValue, type DateTimeRange, type DateTimeValue } from "@sectile/temporal/date-time-field";
import PickerRangeValue from "./PickerRangeValue.vue";
import { useTemporalDisplay } from "./temporal-display";

const { value, layout = "inline", placeholder, format, startPlaceholder = "시작 일시", endPlaceholder = "종료 일시" } = defineProps<{
  value: DateTimeRange | null;
  layout?: "inline" | "stacked";
  placeholder?: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
  format?: (dateTime: DateTimeValue) => string;
}>();

const display = useTemporalDisplay();

function endpoint(value: DateTimeValue) {
  return { datetime: formatDateTimeValue(value), label: format?.(value) ?? display.dateTime(value) };
}
</script>

<template>
  <PickerRangeValue
    class="ui-date-time-range-value"
    :layout="layout"
    :start="value ? endpoint(value.start) : undefined"
    :end="value ? endpoint(value.end) : undefined"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
    :placeholder="placeholder"
  />
</template>
