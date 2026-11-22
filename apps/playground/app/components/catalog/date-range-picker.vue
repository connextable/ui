<script setup lang="ts">
import { UIDateRangePicker } from "@connextable/ui";
import { ref } from "vue";

const range = ref({ start: { year: 2026, month: 8, day: 22 }, end: { year: 2026, month: 8, day: 25 } });
</script>

<template>
  <UIDateRangePicker v-model="range" />
</template>
