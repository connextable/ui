<script setup lang="ts">
import type { DateValue } from "@sectile/temporal/date-field";
import { computed } from "vue";
import { useCalendarValue, type CalendarGranularity } from "./useCalendarValue";

const { value, granularity = "day", placeholder = "날짜 선택" } = defineProps<{
  value: DateValue | null;
  granularity?: CalendarGranularity;
  placeholder?: string;
}>();

const format = useCalendarValue();
const selected = computed(() => value ? format(value, granularity) : undefined);
</script>

<template>
  <span class="ui-picker-value" role="status">
    <time v-if="selected" :datetime="selected.datetime">{{ selected.label }}</time>
    <span v-else class="ui-picker-value__placeholder">{{ placeholder }}</span>
  </span>
</template>

<style scoped>
.ui-picker-value {
  display: grid;
  min-inline-size: 0;
  min-block-size: var(--ui-control-height-small);
  align-items: center;
  padding-inline: var(--ui-space-xs);
  text-align: center;
  font-size: var(--ui-font-size-body-sm);
  font-variant-numeric: tabular-nums;
}

.ui-picker-value__placeholder { color: var(--ui-color-text-muted); }
</style>
