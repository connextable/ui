<script setup lang="ts">
import { UIButton, UIFileUpload, type UIFileUploadAdapter } from "@connextable/ui";
import { shallowRef } from "vue";

const file = shallowRef<File>();
let attempts = 0;


function prepareFile() {
  file.value = new File(["로컬 예제 파일"], "example.txt", { type: "text/plain" });
}

const adapter: UIFileUploadAdapter<File, string> = ({ file, reportProgress }) => {
  let step = 0;
  const shouldFail = ++attempts === 1;
  let timer: ReturnType<typeof setInterval>;
  const result = new Promise<string>((resolve, reject) => {
    timer = setInterval(() => {
      step++;
      reportProgress({ loaded: Math.trunc(file.size * step / 5), total: file.size });
      if (step < 5) return;
      clearInterval(timer);
      if (shouldFail) reject(new Error("예제 전송 실패"));
      else resolve(file.name);
    }, 400);
  });
  return { result, dispose: () => clearInterval(timer) };
};
</script>

<template>
  <div class="example">
    <UIButton v-if="!file" @click="prepareFile">예제 파일 준비</UIButton>
    <UIFileUpload v-else :file="file" :adapter="adapter">
      <template #upload>전송 시작</template>
      <template #cancel>전송 취소</template>
      <template #status="{ status }">
        <span v-if="status === 'succeeded'" role="status">전송을 완료했습니다.</span>
        <span v-if="status === 'failed'" role="alert">다시 시도할 수 있습니다.</span>
        <span v-if="status === 'canceled'" role="status">전송을 취소했습니다.</span>
      </template>
    </UIFileUpload>
  </div>
</template>

<style scoped>
.example {
  display: grid;
  gap: var(--ui-space-sm);
}
</style>
