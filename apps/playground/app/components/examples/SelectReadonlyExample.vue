<script setup lang="ts">
import { UISelect } from "@connextable/ui";
const options = [
  { value: "standard", label: "표준" },
  { value: "extended", label: "확장" },
];
</script>

<template>
  <UISelect aria-label="현재 요금제" :options="options" default-value="standard" readonly />
</template>
