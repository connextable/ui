<script setup lang="ts">
import { UISelect } from "@connextable/ui";
const options = [
  { value: "csv", label: "CSV" },
  { value: "md", label: "Markdown" },
  { value: "pdf", label: "PDF" },
];
</script>

<template>
  <UISelect aria-label="파일 형식" :options="options" placeholder="형식 선택" />
</template>
