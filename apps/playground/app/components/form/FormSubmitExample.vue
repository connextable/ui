<script setup lang="ts">
import { UIForm, UIFormActions, UIFormField, UIFormReset, UIFormSubmit, UIInput } from "@connextable/ui";
import { ref } from "vue";
import source from "./FormSubmitExample.vue?example-code&raw";

const name = ref("");
const submitted = ref("");

function submit({ formData }: { formData: FormData }) {
  submitted.value = String(formData.get("name") ?? "");
}
</script>

<template>
  <PlaygroundExample
    id="form-submit"
    title="기본 제출"
    description="UIFormField에 입력을 연결합니다. 폼은 제출할 때 입력값을 FormData로 전달합니다."
    :source="source"
    :heading-level="3"
  >
    <UIForm @submit="submit" @reset="name = ''; submitted = ''">
      <UIFormField name="name" label="이름" required>
        <UIInput v-model="name" />
      </UIFormField>
      <UIFormActions>
        <UIFormReset size="sm">초기화</UIFormReset>
        <UIFormSubmit size="sm">제출</UIFormSubmit>
      </UIFormActions>
    </UIForm>
    <template #footer><output>{{ submitted ? `제출한 이름 · ${submitted}` : "제출 전" }}</output></template>
  </PlaygroundExample>
</template>
