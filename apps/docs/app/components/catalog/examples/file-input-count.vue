<script setup lang="ts">
import { UIButton, UIFileInput, UIFormActions } from "@connextable/ui";
import { useTemplateRef } from "vue";

const attachments = useTemplateRef("attachments");
const policy = { multiple: true, maxFiles: 2 };

function choose(count: number) {
  const files = Array.from({ length: count }, (_, index) => new File(["첨부"], `자료 ${index + 1}.txt`, { type: "text/plain" }));
  attachments.value?.selectFiles(files);
}
</script>

<template>
  <div class="ui-field">
    <UIFileInput ref="attachments" label="최대 두 파일 선택" :policy="policy" hint="최대 2개" />
    <UIFormActions>
      <UIButton size="sm" variant="outline" @click="choose(2)">파일 2개 선택</UIButton>
      <UIButton size="sm" variant="outline" @click="choose(3)">파일 3개 선택</UIButton>
    </UIFormActions>
  </div>
</template>
