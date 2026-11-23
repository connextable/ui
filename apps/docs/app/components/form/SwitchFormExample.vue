<script setup lang="ts">
import { UIButton, UIForm, UIFormActions, UIFormField, UISwitch } from "@connextable/ui";
import { ref } from "vue";

const submitted = ref<boolean | null>(null);
</script>

<template>
  <UIForm @submit="({ values }) => { submitted = values.description !== undefined }">
    <UIFormField name="description">
      <UISwitch variant="outline" label="설명 표시" />
    </UIFormField>
    <UIFormActions>
      <UIButton type="submit" size="sm">제출</UIButton>
    </UIFormActions>
    <template #output>
      <span v-if="submitted !== null">제출한 설정 {{ submitted ? "켜짐" : "꺼짐" }}</span>
    </template>
  </UIForm>
</template>
