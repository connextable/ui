<script setup lang="ts">
import { UIWindowSplitter } from "@connextable/ui";
import { ref } from "vue";

const size = ref("34");
</script>

<template>
  <UIWindowSplitter v-model="size" :page-step="50" label="탐색과 본문 너비 조정">
    <template #before>탐색</template>
    <template #after>본문</template>
  </UIWindowSplitter>
</template>
