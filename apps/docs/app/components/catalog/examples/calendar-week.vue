<script setup lang="ts">
import { UICalendar, type UIDateValue } from "@connextable/ui";
import { ref } from "vue";

const day = ref<UIDateValue | null>({ year: 2026, month: 8, day: 24 });
</script>

<template>
  <UICalendar v-model="day" default-view="week" label="주간 일정" />
</template>
