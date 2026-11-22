<script setup lang="ts">
import { UISelect } from "@connextable/ui";
import { ref } from "vue";
const options = [
  { value: "standard", label: "표준" },
  { value: "extended", label: "확장" },
];

const selected = ref<string | null>("standard");
</script>

<template>
  <UISelect aria-label="현재 요금제" :options="options" v-model="selected" readonly />
</template>
