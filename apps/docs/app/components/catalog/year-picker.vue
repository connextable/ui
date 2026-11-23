<script setup lang="ts">
import { UIYearPicker } from "@connextable/ui";
import { ref } from "vue";

const graduationYear = ref({ year: 2028, month: 1, day: 1 });
</script>

<template>
  <UIYearPicker v-model="graduationYear" />
</template>
