<script setup lang="ts">
import { UIRangeCalendar } from "@connextable/ui";
import { ref } from "vue";

const stay = ref({
  start: { year: 2026, month: 8, day: 22 },
  end: { year: 2026, month: 8, day: 25 },
});
</script>

<template>
  <UIRangeCalendar v-model="stay" label="숙박 달력" />
</template>
