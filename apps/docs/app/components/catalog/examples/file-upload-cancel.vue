<script setup lang="ts">
import { UIFileUpload, type UIFileUploadAdapter } from "@connextable/ui";

const file = new File(["로컬 예제 파일"], "회의록.txt", { type: "text/plain" });
const adapter: UIFileUploadAdapter<File, string> = ({ file }) => {
  let timer: ReturnType<typeof setTimeout>;
  const result = new Promise<string>(resolve => {
    timer = setTimeout(() => resolve(file.name), 5000);
  });
  return { result, dispose: () => clearTimeout(timer) };
};
</script>

<template>
  <UIFileUpload :file="file" :adapter="adapter">
    <template #upload>전송 시작</template>
    <template #cancel>취소</template>
    <template #status="{ status }">
      <span v-if="status === 'canceled'" role="status">취소됨</span>
      <span v-else-if="status === 'succeeded'" role="status">완료</span>
    </template>
  </UIFileUpload>
</template>
