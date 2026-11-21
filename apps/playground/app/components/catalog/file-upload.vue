<script setup lang="ts">
import {
  UIFileInput,
  UIFileInputInput,
  UIFileInputTrigger,
  UIFileUpload,
  type UIFileUploadAdapter,
} from "@connextable/ui";

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
    <UIFileInputTrigger>파일 선택</UIFileInputTrigger>
    <UIFileUpload v-if="files[0]" :file="files[0]" :adapter="upload" />
  </UIFileInput>
</template>
