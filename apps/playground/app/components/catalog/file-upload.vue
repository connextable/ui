<script setup lang="ts">
import {
  UIButton,
  UIFileInput,
  UIFileInputInput,
  UIFileInputTrigger,
  UIFileUpload,
  type UIFileUploadAdapter,
} from "@connextable/ui";
import { Paperclip } from "@lucide/vue";

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
    <UIFileInputInput class="ui-file-input__native" tabindex="-1" aria-hidden="true" />
    <UIFileUpload class="upload-preview" :file="files[0] ?? sample" :adapter="upload" :auto-start="files.length > 0">
      <template #picker="{ file }">
        <UIFileInputTrigger as-child :aria-label="files.length ? `${file.name} 교체` : '파일 선택'" :title="file.name">
          <UIButton icon-only size="sm" variant="ghost">
            <template #leading><Paperclip /></template>
          </UIButton>
        </UIFileInputTrigger>
      </template>
      <template #status="{ status }">
        <span v-if="status === 'succeeded'" role="status">파일을 읽었습니다.</span>
        <span v-else-if="status === 'failed'" role="alert">파일을 읽지 못했습니다.</span>
        <span v-else-if="status === 'canceled'" role="status">파일 읽기를 취소했습니다.</span>
      </template>
    </UIFileUpload>
  </UIFileInput>
</template>

<style scoped>
.upload-preview {
  inline-size: 22rem;
  max-inline-size: 100%;
}
</style>
