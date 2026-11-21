<script setup lang="ts">
import { UIFileUpload } from "@connextable/ui";
import { createExampleUpload } from "../../../utils/example-file-upload";

const file = new File(["로컬 예제 파일"], "회의록.txt", { type: "text/plain" });
const adapter = createExampleUpload(5000);
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
