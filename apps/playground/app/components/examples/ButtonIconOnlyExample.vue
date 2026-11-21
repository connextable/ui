<script setup lang="ts">
import { UIButton } from "@connextable/ui";
import { Plus } from "@lucide/vue";
import { ref } from "vue";

const quantity = ref(1);
</script>

<template>
  <div class="example">
    <UIButton icon-only variant="outline" aria-label="수량 늘리기" @click="quantity++">
      <template #leading><Plus /></template>
    </UIButton>
    <output>수량 {{ quantity }}</output>
  </div>
</template>

<style scoped>
.example {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--ui-space-md);
}
</style>
