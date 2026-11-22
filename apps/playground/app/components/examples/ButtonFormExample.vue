<script setup lang="ts">
import { UIButton, UIForm, UIFormField, UIInput } from "@connextable/ui";
import { ref, useId } from "vue";
import source from "./ButtonFormExample.vue?example-code&raw";

const formId = useId();
const name = ref("민지");
const submitted = ref("");

function submit() {
  submitted.value = name.value;
}
</script>

<template>
  <PlaygroundExample
    id="button-submit"
    title="폼 밖에서 제출"
    description="type이 submit인 버튼은 form 속성으로 연결한 폼을 제출합니다."
    :source="source"
    :heading-level="3"
  >
    <UIForm :id="formId" @submit="submit">
      <UIFormField label="표시 이름">
        <UIInput v-model="name" />
      </UIFormField>
    </UIForm>
    <UIButton type="submit" :form="formId" size="sm">저장</UIButton>
    <template #footer>
      <output>{{ submitted ? `저장한 이름 ${submitted}` : "" }}</output>
    </template>
  </PlaygroundExample>
</template>
