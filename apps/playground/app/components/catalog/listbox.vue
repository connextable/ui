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
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UIListbox v-model="selected" :options="options" aria-label="실행 환경" />
    <template #footer><output>{{ options.find(option => option.value === selected)?.label ?? "선택 없음" }}</output></template>
  </PlaygroundExample>
</template>
