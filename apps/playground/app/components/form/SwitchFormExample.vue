<script setup lang="ts">
import { UIButton, UIForm, UIFormActions, UIFormField, UISwitch } from "@connextable/ui";
import { ref } from "vue";

const submitted = ref<boolean | null>(null);

function submit(formData: FormData) {
  submitted.value = formData.has("description");
}
</script>

<template>
  <UIForm @submit="({ formData }) => submit(formData)">
    <UIFormField name="description">
      <UISwitch label="설명 표시" />
    </UIFormField>
    <UIFormActions>
      <UIButton type="submit" size="sm">제출</UIButton>
    </UIFormActions>
    <template #output>
      <span v-if="submitted !== null">제출한 설정 {{ submitted ? "켜짐" : "꺼짐" }}</span>
    </template>
  </UIForm>
</template>
