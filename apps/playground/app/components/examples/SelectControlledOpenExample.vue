<script setup lang="ts">
import { UIButton, UISelect } from "@connextable/ui";
import { ref } from "vue";

const open = ref(false);
const options = [
  { value: "day", label: "일간" },
  { value: "week", label: "주간" },
];
</script>

<template>
  <div class="example">
    <div class="actions">
      <UIButton size="sm" variant="soft" :disabled="open" @click="open = true">목록 열기</UIButton>
      <UIButton size="sm" variant="outline" :disabled="!open" @click="open = false">목록 닫기</UIButton>
    </div>
    <UISelect v-model:open="open" aria-label="보고서 주기" :options="options" />
  </div>
</template>

<style scoped>
.example {
  display: grid;
  justify-items: start;
  gap: var(--ui-space-sm);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ui-space-xs);
}
</style>
