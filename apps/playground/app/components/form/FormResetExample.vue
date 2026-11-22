<script setup lang="ts">
import { UIForm, UIFormActions, UIFormField, UIFormReset, UIInput } from "@connextable/ui";
import { ref } from "vue";

const initialTitle = "회의 기록";
const title = ref(initialTitle);
</script>

<template>
  <UIForm @submit="() => undefined" @reset="title = initialTitle">
    <UIFormField name="title" label="문서 제목">
      <UIInput v-model="title" />
    </UIFormField>
    <UIFormActions>
      <UIFormReset size="sm">초기값으로 되돌리기</UIFormReset>
    </UIFormActions>
  </UIForm>
</template>
