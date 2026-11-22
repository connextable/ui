<script setup lang="ts">
import { UISelect } from "@connextable/ui";
import { ref } from "vue";

const options = [
  { value: "comfortable", label: "여백 넓게" },
  { value: "compact", label: "촘촘하게" },
];
const density = ref<string | null>("comfortable");
</script>

<template>
  <UISelect v-model="density" :options="options" aria-label="화면 밀도" clearable />
</template>
