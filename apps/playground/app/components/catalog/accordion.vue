<script setup lang="ts">
import { UIAccordion } from "@connextable/ui";
import { ref } from "vue";

const openSection = ref<string | readonly string[]>("general");
const items = [
  { value: "general", label: "기본 설정", description: "기본 언어는 한국어입니다." },
  { value: "deployments", label: "배포 설정", description: "배포 브랜치는 main입니다." },
  { value: "retention", label: "보관 설정", description: "활동 기록을 90일간 보관합니다." },
];
</script>

<template>
  <UIAccordion v-model="openSection" :items="items" type="single" collapsible />
</template>
