<script setup lang="ts">
import { UIFileUpload, type UIFileUploadAdapter } from "@connextable/ui";

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
  <UIFileUpload :adapter="upload" auto-start />
</template>
