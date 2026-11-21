<script setup lang="ts">
import { UIRadioGroup } from "@connextable/ui";
const options = [
  { value: "start", label: "왼쪽" },
  { value: "center", label: "가운데" },
  { value: "end", label: "오른쪽" },
];
</script>

<template>
  <UIRadioGroup :options="options" label="정렬" default-value="start" orientation="horizontal" />
</template>
