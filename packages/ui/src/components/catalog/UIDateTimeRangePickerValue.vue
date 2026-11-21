<script setup lang="ts">
import { formatDateTimeValue, type DateTimeRange, type DateTimeValue } from "@sectile/temporal/date-time-field";
import { useTemporalFormatter } from "@sectile/vue/temporal/temporal-provider";
import PickerRangeValue from "./PickerRangeValue.vue";

const { value, layout = "inline", placeholder, format, startPlaceholder = "시작 일시", endPlaceholder = "종료 일시" } = defineProps<{
  value: DateTimeRange | null;
  layout?: "inline" | "stacked";
  placeholder?: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
  format?: (dateTime: DateTimeValue) => string;
}>();

const formatter = useTemporalFormatter();

function endpoint(value: DateTimeValue) {
  const datetime = formatDateTimeValue(value);
  const { second, millisecond } = value.time;
  const precision = millisecond ? "millisecond" : second ? "second" : "minute";
  const localized = formatter.value?.dateTime(value, precision);
  return { datetime, label: format?.(value) ?? (localized?.ok ? localized.value : datetime.replace("T", " ")) };
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
