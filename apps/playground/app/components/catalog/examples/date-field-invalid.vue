<script setup lang="ts">
import { UIDateField } from "@connextable/ui";
import { ref } from "vue";

type DateValue = InstanceType<typeof UIDateField>["$props"]["modelValue"];
const value = ref<DateValue>({ year: 2026, month: 8, day: 22 });
</script>

<template>
  <div>
    <UIDateField v-model="value" label="서비스 시작일" />
    <output>{{ value ? `확정 날짜 ${value.year}-${value.month}-${value.day}` : "확정한 날짜 없음" }}</output>
  </div>
</template>
