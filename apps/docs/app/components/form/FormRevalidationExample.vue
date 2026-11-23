<script setup lang="ts">
import { UIForm, UIFormActions, UIFormField, UIFormSubmit, UIInput } from "@connextable/ui";
import { ref } from "vue";

const title = ref("");

function validate(values: Record<string, unknown>) {
  const text = typeof values.title === "string" ? values.title : "";
  return {
    issues: text.trim().length < 3
      ? [{ path: "title", message: "세 글자 이상 입력하세요." }]
      : [],
  };
}
</script>

<template>
  <UIForm :validate="validate" :validate-on="['blur']" :revalidate-on="['input']">
    <UIFormField label="제목" name="title">
      <UIInput v-model="title" />
    </UIFormField>
    <UIFormActions><UIFormSubmit>저장</UIFormSubmit></UIFormActions>
  </UIForm>
</template>
