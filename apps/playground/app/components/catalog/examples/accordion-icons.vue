<script setup lang="ts">
import { UIAccordion } from "@connextable/ui";
import { Archive, Settings } from "@lucide/vue";
import { ref } from "vue";

const sections = [
  { value: "general", label: "일반", icon: Settings, description: "기본 언어는 한국어입니다." },
  { value: "archive", label: "보관", icon: Archive, description: "기록을 90일간 보관합니다." },
];
const opened = ref<string | readonly string[]>("general");
</script>

<template>
  <UIAccordion v-model="opened" :items="sections" type="single" collapsible />
</template>
