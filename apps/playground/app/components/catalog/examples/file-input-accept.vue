<script setup lang="ts">
import { UIButton, UIFileInput, UIFormActions } from "@connextable/ui";
import { useTemplateRef } from "vue";

const attachment = useTemplateRef("attachment");
const policy = { accept: ".csv,text/csv" };
const csv = new File(["번호,현황\n1,완료"], "진행 현황.csv", { type: "text/csv" });
const text = new File(["진행 현황"], "진행 현황.txt", { type: "text/plain" });
</script>

<template>
  <div class="ui-field">
    <UIFileInput ref="attachment" label="CSV 파일" :policy="policy" hint="CSV 파일만 선택할 수 있습니다." />
    <UIFormActions>
      <UIButton size="sm" variant="outline" @click="attachment?.selectFiles([csv])">CSV 선택</UIButton>
      <UIButton size="sm" variant="outline" @click="attachment?.selectFiles([text])">TXT 선택</UIButton>
    </UIFormActions>
  </div>
</template>
