<script setup lang="ts">
import { UIDateTimePicker } from "@connextable/ui";
import { ref } from "vue";

const initial = ref({
  date: { year: 2026, month: 8, day: 22 },
  time: { hour: 9, minute: 30, second: 0, millisecond: 0 },
});
</script>

<template>
  <UIDateTimePicker v-model="initial" />
</template>
