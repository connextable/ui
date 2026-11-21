<script setup lang="ts">
import { UIButton } from "@connextable/ui";
import { onScopeDispose, ref } from "vue";

const pending = ref(false);
const message = ref("");
let attempt = 0;
let timer: ReturnType<typeof setTimeout> | undefined;
onScopeDispose(() => clearTimeout(timer));

function saveDraft(attempt: number) {
  return new Promise<void>((resolve, reject) => {
    timer = setTimeout(() => {
      if (attempt === 1) reject(new Error("저장에 실패했습니다."));
      else resolve();
    }, 1500);
  });
}

async function save() {
  if (pending.value) return;
  pending.value = true;
  message.value = "저장 중…";

  try {
    await saveDraft(++attempt);
    message.value = "저장했습니다.";
  } catch {
    message.value = "저장에 실패했습니다. 다시 시도하세요.";
  } finally {
    pending.value = false;
  }
}
</script>

<template>
  <div class="example">
    <UIButton :loading="pending" @click="save">초안 저장</UIButton>
    <output>{{ message }}</output>
  </div>
</template>

<style scoped>
.example {
  display: grid;
  justify-items: center;
  gap: var(--ui-space-sm);
}

.example output {
  min-block-size: 1lh;
  color: var(--ui-color-text-muted);
}
</style>
