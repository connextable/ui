<script setup lang="ts">
import { UIButton, UIFileInput, UIFormActions } from "@connextable/ui";
import { useTemplateRef } from "vue";

const attachments = useTemplateRef("attachments");
const policy = { multiple: true, maxTotalSize: 2048 };

function choose(each: number) {
  const files = ["원고.txt", "수정 사항.txt"].map((name) => new File(["a".repeat(each)], name, { type: "text/plain" }));
  attachments.value?.selectFiles(files);
}
</script>

<template>
  <div class="ui-field">
    <UIFileInput ref="attachments" label="전체 용량 제한" :policy="policy" hint="선택한 파일을 합해 최대 2 KB" />
    <UIFormActions>
      <UIButton size="sm" variant="outline" @click="choose(768)">합계 1.5 KB 선택</UIButton>
      <UIButton size="sm" variant="outline" @click="choose(1536)">합계 3 KB 선택</UIButton>
    </UIFormActions>
  </div>
</template>
