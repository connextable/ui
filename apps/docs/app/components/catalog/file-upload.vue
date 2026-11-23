<script setup lang="ts">
import { UIFileUpload, createUIFileUploadAdapter } from "@connextable/ui";

const upload = createUIFileUploadAdapter(({ file, signal }) => file.stream().pipeTo(new WritableStream(), { signal }));
</script>

<template>
  <UIFileUpload :adapter="upload" auto-start />
</template>
