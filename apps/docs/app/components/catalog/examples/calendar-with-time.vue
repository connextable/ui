<script setup lang="ts">
import { UICalendar, useTemporalDisplay, type UIDateValue, type UITimeValue } from "@connextable/ui";
import { ref } from "vue";

const date = ref<UIDateValue | null>({ year: 2026, month: 8, day: 22 });
const time = ref<UITimeValue | null>(null);
const display = useTemporalDisplay();
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UICalendar v-model="date" v-model:time="time" label="방문 날짜" />
    <template #footer>
      <output>{{ date ? display.date(date) : '날짜 미선택' }} {{ time ? display.time(time) : '시간 미선택' }}</output>
    </template>
  </PlaygroundExample>
</template>
