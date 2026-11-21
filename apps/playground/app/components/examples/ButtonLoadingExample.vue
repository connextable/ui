<script setup lang="ts">
import { UIButton, UISwitch } from "@connextable/ui";
import { Check } from "@lucide/vue";
import { ref } from "vue";

const loading = ref(true);
const clicks = ref(0);
</script>

<template>
  <div class="example">
    <UIButton :loading="loading" @click="clicks++">
      <template #leading><Check /></template>
      실행
    </UIButton>
    <UISwitch v-model="loading" label="로딩 상태" size="sm" />
    <output>실행 {{ clicks }}회</output>
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
