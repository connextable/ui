<script setup lang="ts">
import {
  UICalendar,
  UITemporalProvider,
  type UIDateValue,
} from "@connextable/ui";
import { ref } from "vue";

const referenceDate = { year: 2026, month: 8, day: 22 };
const date = ref<UIDateValue | null>(null);
</script>

<template>
  <UITemporalProvider :reference-date="referenceDate">
    <UICalendar v-model="date" label="기준일이 있는 예약 달력" />
  </UITemporalProvider>
</template>
