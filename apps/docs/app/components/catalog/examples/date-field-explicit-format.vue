<script setup lang="ts">
import { createUIDateFieldFormat, UIDateField, type UIDateValue } from "@connextable/ui";
import { ref } from "vue";

const date = ref<UIDateValue | null>({ year: 2026, month: 8, day: 22 });
const format = createUIDateFieldFormat({
  order: ["day", "month", "year"],
  literals: ["", "/", "/", ""],
});
</script>

<template>
  <UIDateField v-model="date" :format="format" label="출발일" />
</template>
