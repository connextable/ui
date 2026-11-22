<script setup lang="ts">
import { FlaskConical, Server, Terminal } from "@lucide/vue";
import { UIListbox } from "@connextable/ui";
import { ref } from "vue";

const options = [
  { value: "production", label: "운영", icon: Server },
  { value: "staging", label: "검증", icon: FlaskConical },
  { value: "development", label: "개발", icon: Terminal },
];

const selected = ref("production");
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UIListbox v-model="selected" :options="options" aria-label="실행 환경" />
    <template #footer><output>{{ options.find(option => option.value === selected)?.label ?? "선택 없음" }}</output></template>
  </PlaygroundExample>
</template>
