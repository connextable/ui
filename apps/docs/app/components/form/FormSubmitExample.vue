<script setup lang="ts">
import { UIForm, UIFormActions, UIFormField, UIFormReset, UIFormSubmit, UIInput, type UIFormSubmitEvent } from "@connextable/ui";
import { ref } from "vue";
import source from "./FormSubmitExample.vue?example-code&raw";

const name = ref("");
const submitted = ref("");

function submit({ values }: UIFormSubmitEvent) {
  submitted.value = typeof values.name === "string" ? values.name : "";
}
</script>

<template>
  <PlaygroundExample
    id="form-submit"
    title="기본 제출"
    description="UIFormField에 지정한 name이 제출 객체의 키가 됩니다. 제출 핸들러에서 values.name으로 이름을 읽습니다."
    :source="source"
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
    <template #footer><output>{{ submitted ? `${submitted} 제출 완료` : "제출 전" }}</output></template>
  </PlaygroundExample>
</template>
