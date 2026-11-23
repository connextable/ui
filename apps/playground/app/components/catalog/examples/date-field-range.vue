<script setup lang="ts">
import { UIDateField, type UIDateValue, useTemporalDisplay } from "@connextable/ui";
import { ref } from "vue";

const date = ref<UIDateValue | null>({ year: 2026, month: 8, day: 22 });
const policies = {
  min: { year: 2026, month: 8, day: 1 },
  max: { year: 2026, month: 8, day: 31 },
};
const display = useTemporalDisplay();
</script>

<template>
  <div>
    <label>8월 접수일 <UIDateField v-model="date" :policies="policies" /></label>
    <p>확정한 날짜 <output>{{ date ? display.date(date) : "없음" }}</output></p>
  </div>
</template>
