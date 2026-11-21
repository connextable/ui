<script setup lang="ts">
import { formatDateValue, type DateRange, type DateValue } from "@sectile/temporal/date-field";
import { useTemporalFormatter } from "@sectile/vue/temporal/temporal-provider";
import PickerRangeValue from "./PickerRangeValue.vue";

const { value, format, startPlaceholder = "시작일", endPlaceholder = "종료일" } = defineProps<{
  value: DateRange | null;
  format?: (date: DateValue) => string;
  startPlaceholder?: string;
  endPlaceholder?: string;
}>();

const formatter = useTemporalFormatter();

function endpoint(date: DateValue) {
  const datetime = formatDateValue(date);
  const localized = formatter.value?.date(date);
  return { datetime, label: format?.(date) ?? (localized?.ok ? localized.value : datetime) };
}
</script>

<template>
  <PickerRangeValue
    :start="value ? endpoint(value.start) : undefined"
    :end="value ? endpoint(value.end) : undefined"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
  />
</template>
