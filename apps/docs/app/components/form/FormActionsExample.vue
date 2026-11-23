<script setup lang="ts">
import { UIForm, UIFormActions, UIFormField, UIFormReset, UIFormSubmit, UIInput } from "@connextable/ui";
import { ref } from "vue";

const name = ref("");
const submitted = ref(false);

function reset() {
  submitted.value = false;
}
</script>

<template>
  <UIForm @submit="() => { submitted = true }" @reset="reset">
    <UIFormField label="표시 이름">
      <UIInput v-model="name" />
    </UIFormField>
    <UIFormActions>
      <UIFormReset size="sm">초기화</UIFormReset>
      <UIFormSubmit size="sm">제출</UIFormSubmit>
    </UIFormActions>
    <template #output>
      {{ submitted ? "제출했습니다." : "" }}
    </template>
  </UIForm>
</template>
