<script setup lang="ts">
import { UIDatePicker } from "@connextable/ui";
import { ref } from "vue";

const date = ref({ year: 2026, month: 8, day: 22 });
</script>

<template>
  <UIDatePicker v-model="date" />
</template>
