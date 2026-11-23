<script setup lang="ts">
import { createUIAsyncAction, UIAsyncAction, UIButton } from "@connextable/ui";
import { Check, Download } from "@lucide/vue";
import { ref } from "vue";

const failOnce = ref(true);

const createExport = createUIAsyncAction(async ({ signal }) => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  signal.throwIfAborted();
  if (failOnce.value) {
    failOnce.value = false;
    throw new Error("내보내기 파일을 만들지 못했습니다.");
  }
  return "검토-기록.csv";
});
</script>

<template>
  <UIAsyncAction :action="createExport" v-slot="{ run, cancel, pending, status, result }">
    <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
      <div class="ui-data-actions">
        <UIButton :loading="pending" @click="run()">
          <template #leading>
            <Check v-if="status === 'succeeded'" aria-hidden="true" />
            <Download v-else aria-hidden="true" />
          </template>
          내보내기 준비
        </UIButton>
        <UIButton :disabled="!pending" variant="outline" @click="cancel()">준비 취소</UIButton>
      </div>
      <template #footer>
        <output>
          {{ pending ? '준비 중…' : status === 'failed' ? '준비에 실패했습니다. 다시 시도해 주세요.' : result ? `${result} 준비 완료` : '내보내기 대기 중' }}
        </output>
      </template>
    </PlaygroundExample>
  </UIAsyncAction>
</template>
