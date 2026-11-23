<script setup lang="ts">
import { UIButton } from "@connextable/ui";
import { onScopeDispose, ref } from "vue";
import source from "./ButtonAsyncExample.vue?example-code&raw";

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
  <PlaygroundExample
    id="button-async"
    title="비동기 요청과 재시도"
    description="요청이 끝날 때까지 loading을 유지합니다. 이 예제는 첫 저장에 실패하고 재시도하면 성공합니다."
    :source="source"
  >
    <UIButton :loading="pending" @click="save">초안 저장</UIButton>
    <template v-if="message" #footer>
      <output>{{ message }}</output>
    </template>
  </PlaygroundExample>
</template>
