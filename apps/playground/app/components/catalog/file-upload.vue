<script setup lang="ts">
import {
  UIFileInput,
  UIFileInputInput,
  UIFileInputTrigger,
  UIFileUpload,
  type UIFileUploadAdapter,
} from "@connextable/ui";

const sample = new File(["브라우저에서 읽는 전송 예제입니다."], "배포 메모.txt", { type: "text/plain" });

// The preview reads the selected file locally and reports its progress.
const upload: UIFileUploadAdapter<File, number> = ({ file, signal, reportProgress }) => {
  const reader = file.stream().getReader();
  const result = (async () => {
    let loaded = 0;
    while (!signal.aborted) {
      const chunk = await reader.read();
      if (chunk.done) return loaded;
      loaded += chunk.value.byteLength;
      reportProgress({ loaded, total: file.size });
    }
    return loaded;
  })();
  return { result, dispose: () => { void reader.cancel().catch(() => {}); } };
};
</script>

<template>
  <UIFileInput v-slot="{ files }">
    <UIFileInputInput aria-label="업로드할 파일" />
    <UIFileUpload :file="files[0] ?? sample" :adapter="upload">
      <template #upload>전송</template>
      <template #cancel>취소</template>
      <template #status="{ status }">
        <span v-if="status === 'succeeded'" role="status">전송을 완료했습니다.</span>
        <span v-else-if="status === 'failed'" role="alert">전송에 실패했습니다.</span>
      </template>
    </UIFileUpload>
    <UIFileInputTrigger>다른 파일 선택</UIFileInputTrigger>
  </UIFileInput>
</template>
