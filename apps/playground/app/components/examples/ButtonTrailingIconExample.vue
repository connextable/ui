<script setup lang="ts">
import { UIButton } from "@connextable/ui";
import { ArrowRight } from "@lucide/vue";
import { ref } from "vue";

const step = ref(1);
const lastStep = 3;
</script>

<template>
  <div class="example">
    <output>{{ step }} / {{ lastStep }} 단계</output>
    <UIButton variant="outline" :disabled="step === lastStep" @click="step++">
      다음 단계
      <template #trailing><ArrowRight /></template>
    </UIButton>
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
