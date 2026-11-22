<script setup lang="ts">
import { UIFileUpload, type UIFileUploadAdapter } from "@connextable/ui";

const file = new File(["로컬 예제 파일"], "검토 메모.txt", { type: "text/plain" });
let attempts = 0;
const adapter: UIFileUploadAdapter<File, string> = ({ file }) => {
  const firstAttempt = ++attempts === 1;
  let timer: ReturnType<typeof setTimeout>;
  const result = new Promise<string>((resolve, reject) => {
    timer = setTimeout(() => {
      if (firstAttempt) reject(new Error("예제 전송 실패"));
      else resolve(file.name);
    }, 1400);
  });
  return { result, dispose: () => clearTimeout(timer) };
};
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
