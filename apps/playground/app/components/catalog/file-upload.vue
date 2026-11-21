<script setup lang="ts">
import {
  UIButton,
  UIFileInput,
  UIFileInputInput,
  UIFileInputTrigger,
  UIFileUpload,
  type UIFileUploadAdapter,
} from "@connextable/ui";
import { ChevronRight } from "@lucide/vue";

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
    <UIFileUpload :file="files[0]" :adapter="upload" auto-start>
      <template #picker="{ file }">
        <UIFileInputTrigger as-child :aria-label="file ? `${file.name} 교체` : '파일 선택'" :title="file?.name">
          <UIButton icon-only size="sm" variant="ghost">
            <template #leading><ChevronRight /></template>
          </UIButton>
        </UIFileInputTrigger>
      </template>
      <template #status="{ status }">
        <span v-if="status === 'failed'" role="alert">파일 읽기 실패</span>
        <span v-else-if="status === 'canceled'" role="status">읽기 취소됨</span>
      </template>
    </UIFileUpload>
  </UIFileInput>
</template>
