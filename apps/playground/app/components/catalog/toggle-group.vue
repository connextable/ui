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
  <UIToggleGroup v-model="value" :options="options" label="텍스트 정렬" />
</template>
