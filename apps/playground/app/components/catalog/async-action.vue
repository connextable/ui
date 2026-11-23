<script setup lang="ts">
import { UIAsyncAction, UIButton } from "@connextable/ui";
import { ref } from "vue";

const failOnce = ref(true);

async function createExport({ signal }: { signal: AbortSignal }) {
  await new Promise(resolve => setTimeout(resolve, 1200));
  signal.throwIfAborted();
  if (failOnce.value) {
    failOnce.value = false;
    throw new Error("내보내기 파일을 만들지 못했습니다.");
  }
  return "검토-기록.csv";
}
</script>

<template>
  <UIAsyncAction :action="createExport" v-slot="{ run, cancel, pending, status, result }">
    <div>
      <div class="ui-data-actions">
        <UIButton :loading="pending" @click="run()">{{ status === 'failed' ? '다시 시도' : '내보내기 준비' }}</UIButton>
        <UIButton v-if="pending" variant="outline" @click="cancel()">준비 취소</UIButton>
      </div>
      <p role="status">
        {{ pending ? '준비 중…' : status === 'failed' ? '준비에 실패했습니다. 다시 시도해 주세요.' : result ? `${result} 준비 완료` : '' }}
      </p>
    </div>
  </UIAsyncAction>
</template>
