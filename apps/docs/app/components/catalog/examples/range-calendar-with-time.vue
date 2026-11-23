<script setup lang="ts">
import { UIRangeCalendar, useTemporalDisplay, type UITimeValue } from "@connextable/ui";
import { ref } from "vue";

const stay = ref({ start: { year: 2026, month: 8, day: 22 }, end: { year: 2026, month: 8, day: 25 } });
const arrival = ref<UITimeValue | null>({ hour: 15, minute: 30, second: 0, millisecond: 0 });
const departure = ref<UITimeValue | null>({ hour: 11, minute: 0, second: 0, millisecond: 0 });
const display = useTemporalDisplay();
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UIRangeCalendar v-model="stay" v-model:start-time="arrival" v-model:end-time="departure" label="숙박 날짜" />
    <template #footer>
      <output>{{ display.date(stay.start) }} {{ arrival ? display.time(arrival) : '시간 미선택' }} – {{ display.date(stay.end) }} {{ departure ? display.time(departure) : '시간 미선택' }}</output>
    </template>
  </PlaygroundExample>
</template>
