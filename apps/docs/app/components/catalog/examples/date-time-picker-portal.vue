<script setup lang="ts">
import { UIDateTimePicker, type UIDateTimeValue } from "@connextable/ui";
import { ref } from "vue";

const appointment = ref<UIDateTimeValue | null>({
  date: { year: 2026, month: 8, day: 22 },
  time: { hour: 9, minute: 30, second: 0, millisecond: 0 },
});
</script>

<template>
  <UIDateTimePicker v-model="appointment" label="예약 일시" portal />
</template>
