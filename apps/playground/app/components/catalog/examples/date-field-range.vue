<script setup lang="ts">
import { UIDateField, type UIDateValue } from "@connextable/ui";
import { ref } from "vue";

const date = ref<UIDateValue | null>({ year: 2026, month: 8, day: 22 });
const policies = {
  min: { year: 2026, month: 8, day: 1 },
  max: { year: 2026, month: 8, day: 31 },
};
</script>

<template>
  <div>
    <label>8월 접수일 <UIDateField v-model="date" :policies="policies" /></label>
    <p>확정한 날짜 <output>{{ date ? `${date.month}월 ${date.day}일` : "없음" }}</output></p>
  </div>
</template>
