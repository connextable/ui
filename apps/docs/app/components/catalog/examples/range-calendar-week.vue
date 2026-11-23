<script setup lang="ts">
import { UIRangeCalendar } from "@connextable/ui";
import { ref } from "vue";

const stay = ref({
  start: { year: 2026, month: 8, day: 22 },
  end: { year: 2026, month: 8, day: 25 },
});
</script>

<template>
  <UIRangeCalendar v-model="stay" default-view="week" label="주간 숙박 일정" />
</template>
