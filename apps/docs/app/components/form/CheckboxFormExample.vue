<script setup lang="ts">
import { UIButton, UICheckbox, UIForm, UIFormActions, UIFormField } from "@connextable/ui";
import { ref } from "vue";

const submitted = ref<string | null>(null);
</script>

<template>
  <UIForm @submit="({ values }) => { submitted = String(values.notifications ?? '없음') }">
    <UIFormField name="notifications">
      <UICheckbox label="이메일 알림" />
    </UIFormField>
    <UIFormActions>
      <UIButton type="submit" size="sm">제출</UIButton>
    </UIFormActions>
    <template #output>
      <span v-if="submitted !== null">제출한 값 {{ submitted }}</span>
    </template>
  </UIForm>
</template>
