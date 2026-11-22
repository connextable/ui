<script setup lang="ts">
import { UIMonthPicker } from "@connextable/ui";
import { ref } from "vue";

const billingMonth = ref({ year: 2026, month: 8, day: 1 });
</script>

<template>
  <UIMonthPicker v-model="billingMonth" />
</template>
