<script setup lang="ts">
import { UIButton, UIForm, UIFormActions, UIFormField, UIInput } from "@connextable/ui";
import { ref } from "vue";

const name = ref("");
const submittedName = ref("");

function submit(formData: FormData) {
  const value = formData.get("name");
  if (typeof value === "string") submittedName.value = value;
}
</script>

<template>
  <UIForm @submit="({ formData }) => submit(formData)">
    <UIFormField label="이름" name="name">
      <UIInput v-model="name" placeholder="이름을 입력하세요" />
    </UIFormField>
    <UIFormActions>
      <UIButton type="submit" size="sm">제출</UIButton>
    </UIFormActions>
    <template #output>
      <span v-if="submittedName">제출한 이름은 {{ submittedName }}입니다.</span>
    </template>
  </UIForm>
</template>
