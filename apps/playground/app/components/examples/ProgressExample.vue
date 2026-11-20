<script setup lang="ts">
import { UIButton, UIProgress } from "@connextable/ui";
import { ref } from "vue";

const total = 4;
const completed = ref(1);
</script>

<template>
  <div class="progress-example">
    <output>{{ completed }} / {{ total }} 완료</output>
    <UIProgress label="검사 진행률" :value="completed" :max="total" />
    <div class="progress-example__actions">
      <UIButton size="sm" :disabled="completed === total" @click="completed++">한 항목 완료</UIButton>
      <UIButton size="sm" variant="outline" :disabled="completed === 0" @click="completed = 0">초기화</UIButton>
    </div>
  </div>
</template>

<style scoped>
.progress-example {
  display: grid;
  gap: 0.875rem;
  inline-size: min(100%, 26rem);
}

.progress-example__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
