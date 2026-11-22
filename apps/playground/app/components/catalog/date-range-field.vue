<script setup lang="ts">
import { UIDateRangeField } from "@connextable/ui";

const range = {
  start: { year: 2026, month: 8, day: 22 },
  end: { year: 2026, month: 8, day: 25 },
};
</script>

<template>
  <UIDateRangeField :default-value="range" start-label="시작일" end-label="종료일" />
</template>
