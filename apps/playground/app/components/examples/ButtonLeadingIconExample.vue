<script setup lang="ts">
import { UIButton } from "@connextable/ui";
import { Plus } from "@lucide/vue";
import { ref } from "vue";

const drafts = ref(0);
</script>

<template>
  <div class="example">
    <UIButton @click="drafts++">
      <template #leading><Plus /></template>
      초안 추가
    </UIButton>
    <output>초안 {{ drafts }}개</output>
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
