<script setup lang="ts">
import { UIDateTimeRangePicker, type UIDateTimeRange } from "@connextable/ui";
import { ref } from "vue";

const range = ref<UIDateTimeRange | null>(null);
</script>

<template>
  <UIDateTimeRangePicker v-model="range" label="방문 일정" />
</template>
