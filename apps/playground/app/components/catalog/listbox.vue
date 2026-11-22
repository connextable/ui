<script setup lang="ts">
import { UIListbox } from "@connextable/ui";

const options = [
  { value: "production", label: "운영" },
  { value: "staging", label: "검증" },
  { value: "development", label: "개발" },
];
</script>

<template>
  <UIListbox :options="options" default-value="production" aria-label="실행 환경" />
</template>
