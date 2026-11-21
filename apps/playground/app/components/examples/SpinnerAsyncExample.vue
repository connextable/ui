<script setup lang="ts">
import { UIButton, UISpinner } from "@connextable/ui";
import { onScopeDispose, ref } from "vue";

const busy = ref(false);
const refreshed = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

function refresh() {
  busy.value = true;
  refreshed.value = false;
  timer = setTimeout(() => {
    busy.value = false;
    refreshed.value = true;
  }, 1200);
}

onScopeDispose(() => clearTimeout(timer));
</script>

<template>
  <div class="example">
    <UIButton :disabled="busy" @click="refresh">새로 고침</UIButton>
    <div class="status" role="status">
      <UISpinner v-if="busy" variant="arc" />
      {{ busy ? "목록을 불러오는 중" : refreshed ? "목록을 갱신했습니다." : "" }}
    </div>
  </div>
</template>

<style scoped>
.example, .status {
  display: flex;
  align-items: center;
  gap: var(--ui-space-sm);
}
</style>
