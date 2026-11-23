<script setup lang="ts">
import { UICalendar, type UIDateValue } from "@connextable/ui";
import { ref } from "vue";

const selected = ref<UIDateValue | null>(null);
const initial = { year: 2026, month: 8, day: 24 };
</script>

<template>
  <UICalendar v-model="selected" :default-highlighted-value="initial" label="배포 달력" />
</template>
