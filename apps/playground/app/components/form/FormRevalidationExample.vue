<script setup lang="ts">
import { UIForm, UIFormActions, UIFormField, UIFormSubmit, UIInput } from "@connextable/ui";
import { minLength, object, pipe, string } from "valibot";

const schema = object({ title: pipe(string(), minLength(3, "세 글자 이상 입력하세요.")) });
</script>

<template>
  <UIForm :schema="schema" :validate-on="['blur']" :revalidate-on="['input']">
    <UIFormField label="제목" name="title">
      <UIInput />
    </UIFormField>
    <UIFormActions><UIFormSubmit>저장</UIFormSubmit></UIFormActions>
  </UIForm>
</template>
