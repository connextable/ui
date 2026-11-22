<script setup lang="ts">
import { UIDateTimeField } from "@connextable/ui";
import { ref } from "vue";

const min = { date: { year: 2026, month: 8, day: 22 }, time: { hour: 9, minute: 0, second: 0, millisecond: 0 } };
const max = { date: { year: 2026, month: 8, day: 22 }, time: { hour: 18, minute: 0, second: 0, millisecond: 0 } };
const initial = ref({ date: { year: 2026, month: 8, day: 22 }, time: { hour: 13, minute: 0, second: 0, millisecond: 0 } });
</script>

<template>
  <UIDateTimeField label="예약 일시" v-model="initial" :policies="{ min, max }" precision="minute" />
</template>
