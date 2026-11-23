<script setup lang="ts">
import { UIButton, UIForm, UIFormActions, UIFormFieldGroup, UIInput } from "@connextable/ui";
import { object, string } from "valibot";
import { ref } from "vue";

const schema = object({ author: object({ firstName: string(), lastName: string() }) });
const author = ref({ firstName: "", lastName: "" });
const submitted = ref("");
</script>

<template>
  <UIForm :schema="schema" @submit="({ values }) => { submitted = `${values.author.firstName} ${values.author.lastName}` }">
    <UIFormFieldGroup v-model="author" name="author" label="작성자" required v-slot="{ field }">
      <label>이름 <UIInput v-bind="field('firstName')" autocomplete="given-name" /></label>
      <label>성 <UIInput v-bind="field('lastName')" autocomplete="family-name" /></label>
    </UIFormFieldGroup>
    <UIFormActions>
      <UIButton type="submit" size="sm">제출</UIButton>
    </UIFormActions>
    <template #output>
      <span v-if="submitted">제출한 작성자 {{ submitted }}</span>
    </template>
  </UIForm>
</template>
