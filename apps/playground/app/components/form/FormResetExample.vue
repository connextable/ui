<script setup lang="ts">
import { UIForm, UIFormActions, UIFormField, UIFormReset, UIInput } from "@connextable/ui";
</script>

<template>
  <UIForm @submit="() => undefined">
    <UIFormField name="title" label="문서 제목">
      <UIInput default-value="회의 기록" />
    </UIFormField>
    <UIFormActions>
      <UIFormReset size="sm">초기값으로 되돌리기</UIFormReset>
    </UIFormActions>
  </UIForm>
</template>
