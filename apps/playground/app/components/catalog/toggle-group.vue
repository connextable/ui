<script setup lang="ts">
import { UIToggleGroup } from "@connextable/ui";
import { ref } from "vue";

const options = [
  { value: "left", label: "왼쪽" },
  { value: "center", label: "가운데" },
  { value: "right", label: "오른쪽" },
];
const value = ref(["left"]);
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UIToggleGroup v-model="value" :options="options" label="텍스트 정렬" />
    <template #footer>
      <output>{{ options.filter(option => value.includes(option.value)).map(option => option.label).join(", ") || "선택 없음" }}</output>
    </template>
  </PlaygroundExample>
</template>
