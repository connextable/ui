<script setup lang="ts">
import { UIButton, UIFileInput, UIFormActions } from "@connextable/ui";
import { useTemplateRef } from "vue";

const attachment = useTemplateRef("attachment");
const policy = { maxFileSize: 1024 };

function sample(bytes: number) {
  attachment.value?.selectFiles([new File(["a".repeat(bytes)], `메모-${bytes}B.txt`, { type: "text/plain" })]);
}
</script>

<template>
  <div class="ui-field">
    <UIFileInput ref="attachment" label="용량 제한이 있는 문서" variant="dropzone" :policy="policy" hint="파일당 최대 1 KB" />
    <UIFormActions>
      <UIButton size="sm" variant="outline" @click="sample(600)">600 B 선택</UIButton>
      <UIButton size="sm" variant="outline" @click="sample(2048)">2 KB 선택</UIButton>
    </UIFormActions>
  </div>
</template>
