<script setup lang="ts">
import {
  UIButton,
  UIFileInput,
  UIForm,
  UIFormActions,
  UIFormField,
  type UIFormSubmitEvent,
} from "@connextable/ui";
import { ref, useTemplateRef } from "vue";

const input = useTemplateRef("file");
const submitted = ref("");

function selectSample() {
  input.value?.selectFiles([new File(["검토용 메모"], "review.txt", { type: "text/plain" })]);
}

function readAttachment({ values }: UIFormSubmitEvent) {
  const file = values.attachment;
  submitted.value = file instanceof File && file.name ? `제출한 파일 ${file.name}` : "첨부 없음";
}
</script>

<template>
  <UIForm @submit="readAttachment">
    <UIFormField label="검토 문서" name="attachment">
      <UIFileInput ref="file" />
    </UIFormField>
    <UIFormActions>
      <UIButton size="sm" variant="outline" @click="selectSample">샘플 파일 선택</UIButton>
      <UIButton type="submit">제출</UIButton>
    </UIFormActions>
    <template #output>{{ submitted }}</template>
  </UIForm>
</template>
