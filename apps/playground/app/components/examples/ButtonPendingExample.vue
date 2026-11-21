<script setup lang="ts">
import { UIButton } from "@connextable/ui";
import { onScopeDispose, ref } from "vue";

const pending = ref(false);
const completed = ref(0);
let timer: ReturnType<typeof setTimeout> | undefined;

function save() {
  pending.value = true;
  timer = setTimeout(() => {
    completed.value++;
    pending.value = false;
  }, 1200);
}

onScopeDispose(() => clearTimeout(timer));
</script>

<template>
  <div class="example">
    <UIButton :loading="pending" @click="save">저장</UIButton>
    <output>완료된 요청 {{ completed }}건</output>
  </div>
</template>

<style scoped>
.example {
  display: grid;
  justify-items: center;
  gap: var(--ui-space-sm);
}
</style>
