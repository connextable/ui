<script setup lang="ts">
import { UIFileUploadQueue, createUIFileUploadAdapter } from "@connextable/ui";

const items = ["요구사항.txt", "작업 안내.txt", "점검 목록.txt"].map(name => ({
  id: name,
  file: new File(["로컬 예제"], name, { type: "text/plain" }),
}));

const adapter = createUIFileUploadAdapter(async ({ file, signal }) => {
  await new Promise<void>(resolve => setTimeout(resolve, 1200));
  signal.throwIfAborted();
  return file.name;
});
</script>

<template>
  <UIFileUploadQueue :items="items" :adapter="adapter" :concurrency="1" />
</template>
