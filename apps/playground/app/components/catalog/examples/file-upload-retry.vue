<script setup lang="ts">
import { UIFileUpload, createUIFileUploadAdapter } from "@connextable/ui";

const file = new File(["로컬 예제 파일"], "검토 메모.txt", { type: "text/plain" });
let attempts = 0;
const adapter = createUIFileUploadAdapter(async ({ file, signal }) => {
  const firstAttempt = ++attempts === 1;
  await new Promise<void>(resolve => setTimeout(resolve, 1400));
  signal.throwIfAborted();
  if (firstAttempt) throw new Error("예제 전송 실패");
  return file.name;
});
</script>

<template>
  <UIFileUpload :file="file" :adapter="adapter">
    <template #upload="{ status }">{{ status === 'failed' ? '다시 시도' : '전송 시작' }}</template>
    <template #cancel>취소</template>
    <template #status="{ status }">
      <span v-if="status === 'failed'" role="alert">실패</span>
      <span v-else-if="status === 'canceled'" role="status">취소됨</span>
      <span v-else-if="status === 'succeeded'" role="status">완료</span>
    </template>
  </UIFileUpload>
</template>
