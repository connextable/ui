<script setup lang="ts">
import { UIInput } from "@connextable/ui";
import { ref } from "vue";

const text = ref("회의 내용을 적어보세요.");
</script>

<template>
  <UIInput v-model="text" aria-label="메모" placeholder="예: 금요일까지 초안 검토" multiline :rows="3" />
</template>
