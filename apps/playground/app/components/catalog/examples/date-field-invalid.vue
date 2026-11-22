<script setup lang="ts">
import { UIDateField, useUITemporalDisplay } from "@connextable/ui";
import { ref } from "vue";

type DateValue = InstanceType<typeof UIDateField>["$props"]["modelValue"];
const value = ref<DateValue>({ year: 2026, month: 8, day: 22 });
const display = useUITemporalDisplay();
</script>

<template>
  <div>
    <UIDateField v-model="value" label="서비스 시작일" />
    <output>{{ value ? `확정 날짜 ${display.date(value)}` : "확정한 날짜 없음" }}</output>
  </div>
</template>
