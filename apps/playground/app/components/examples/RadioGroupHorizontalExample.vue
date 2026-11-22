<script setup lang="ts">
import { UIRadioGroup } from "@connextable/ui";
import { ref } from "vue";
const options = [
  { value: "start", label: "왼쪽" },
  { value: "center", label: "가운데" },
  { value: "end", label: "오른쪽" },
];

const selected = ref("start");
</script>

<template>
  <UIRadioGroup :options="options" label="정렬" v-model="selected" orientation="horizontal" />
</template>
