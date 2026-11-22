<script setup lang="ts">
import { UIYearPicker } from "@connextable/ui";

const graduationYear = { year: 2028, month: 1, day: 1 };
</script>

<template>
  <UIYearPicker :default-value="graduationYear" />
</template>
