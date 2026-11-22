<script setup lang="ts">
import { UISelect } from "@connextable/ui";
import { ref } from "vue";

const options = [
  { value: "draft", label: "초안" },
  { value: "archived", label: "보관됨", disabled: true },
  { value: "ready", label: "준비 완료" },
];

const selected = ref<string | null>("draft");
</script>

<template>
  <UISelect aria-label="상태" :options="options" v-model="selected" />
</template>
