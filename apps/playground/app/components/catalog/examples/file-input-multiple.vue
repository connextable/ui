<script setup lang="ts">
import { UIButton, UIFileInput, UIFormActions } from "@connextable/ui";
import { useTemplateRef } from "vue";

const attachments = useTemplateRef("attachments");
const policy = { multiple: true };

function selectSamples() {
  attachments.value?.selectFiles([
    new File(["결정 사항과 할 일"], "회의록.txt", { type: "text/plain" }),
    new File(["날짜,담당자\n11/21,디자인"], "편집 일정.csv", { type: "text/csv" }),
    new File(["# 참고 자료"], "참고 자료.md", { type: "text/markdown" }),
  ]);
}
</script>

<template>
  <div class="ui-field">
    <UIFileInput ref="attachments" label="프로젝트 첨부 파일" :policy="policy" variant="dropzone" />
    <UIFormActions>
      <UIButton size="sm" variant="outline" @click="selectSamples">예제 파일 3개 선택</UIButton>
    </UIFormActions>
  </div>
</template>
