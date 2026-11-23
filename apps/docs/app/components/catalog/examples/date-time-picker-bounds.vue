<script setup lang="ts">
import { UIDateTimePicker, type UIDateTimeValue } from "@connextable/ui";
import { ref } from "vue";

const date = { year: 2026, month: 8, day: 22 };
const time = { hour: 10, minute: 0, second: 0, millisecond: 0 };
const appointment = ref<UIDateTimeValue | null>({ date, time });
const policies = {
  min: { date, time: { ...time, hour: 9 } },
  max: { date: { ...date, day: 24 }, time: { ...time, hour: 17 } },
};
</script>

<template>
  <UIDateTimePicker v-model="appointment" :policies="policies" label="검토 예약 일시" time-precision="minute" />
</template>
