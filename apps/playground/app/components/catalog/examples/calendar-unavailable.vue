<script setup lang="ts">
import { UICalendar, type UIDateValue } from "@connextable/ui";
import { ref } from "vue";

const selected = ref<UIDateValue | null>({ year: 2026, month: 8, day: 22 });
const policies = { unavailable: (day: UIDateValue) => day.year === 2026 && day.month === 8 && day.day === 24 };
</script>

<template>
  <UICalendar v-model="selected" :policies="policies" label="배포 일정" />
</template>
