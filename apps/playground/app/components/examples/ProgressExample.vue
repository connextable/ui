<script setup lang="ts">
import { UIButton, UIProgress } from "@connextable/ui";
import { ref } from "vue";

const progress = ref(25);
</script>

<template>
  <div class="example">
    <UIProgress label="검사 진행률" :value="progress" show-value />
    <UIButton size="sm" :disabled="progress === 100" @click="progress += 25">검사 한 단계 완료</UIButton>
  </div>
</template>

<style scoped>
.example {
  display: grid;
  gap: var(--ui-space-sm);
  inline-size: min(100%, 20rem);
}

.example > button {
  justify-self: start;
}
</style>
