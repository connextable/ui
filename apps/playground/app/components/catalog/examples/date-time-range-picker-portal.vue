<script setup lang="ts">
import { UIDateTimeRangePicker, type UIDateTimeRange } from "@connextable/ui";
import { ref } from "vue";

const range = ref<UIDateTimeRange | null>({
  start: {
    date: { year: 2026, month: 8, day: 22 },
    time: { hour: 9, minute: 30, second: 0, millisecond: 0 },
  },
  end: {
    date: { year: 2026, month: 8, day: 25 },
    time: { hour: 17, minute: 30, second: 0, millisecond: 0 },
  },
});
</script>

<template>
  <UIDateTimeRangePicker v-model="range" label="방문 일정" portal />
</template>
