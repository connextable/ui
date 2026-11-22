<script setup lang="ts">
import { UIYearPicker, type UIDateValue } from "@connextable/ui";
import { ref } from "vue";

const graduationYear = ref<UIDateValue | null>({ year: 2028, month: 1, day: 1 });
const policies = {
  min: { year: 2025, month: 1, day: 1 },
  max: { year: 2030, month: 12, day: 31 },
};
</script>

<template>
  <UIYearPicker v-model="graduationYear" :policies="policies" label="졸업 연도" editable />
</template>
