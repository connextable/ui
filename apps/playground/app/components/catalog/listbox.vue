<script setup lang="ts">
import { UIListbox } from "@connextable/ui";
import { ref } from "vue";

const options = [
  { value: "production", label: "운영" },
  { value: "staging", label: "검증" },
  { value: "development", label: "개발" },
];

const selected = ref("production");
</script>

<template>
  <UIListbox :options="options" v-model="selected" aria-label="실행 환경" />
</template>
