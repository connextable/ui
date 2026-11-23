<script setup lang="ts">
import { UIForm, UIFormActions, UIFormField, UIFormSubmit, UIInput, UIFormSummary } from "@connextable/ui";
import { ref } from "vue";

const firstAttempt = ref(true);

function save() {
  if (firstAttempt.value) {
    firstAttempt.value = false;
    throw new Error("저장 서비스가 응답하지 않았습니다.");
  }
}

const text = ref("릴리스 안내");
</script>

<template>
  <UIForm :map-submit-error="(error) => ({ message: error instanceof Error ? error.message : '저장 오류' })" @submit="save">
    <UIFormField label="문서 제목" name="title">
      <UIInput v-model="text" />
    </UIFormField>
    <UIFormSummary />
    <UIFormActions><UIFormSubmit>저장</UIFormSubmit></UIFormActions>
    <template #output="{ submission }">{{ submission.status === "succeeded" ? "저장했습니다." : "" }}</template>
  </UIForm>
</template>
