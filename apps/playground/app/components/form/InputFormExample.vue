<script setup lang="ts">
import { UIButton, UIForm, UIFormActions, UIFormField, UIInput } from "@connextable/ui";
import { ref } from "vue";

const name = ref("");
const submittedName = ref("");

function submit(event: SubmitEvent) {
  if (!(event.currentTarget instanceof HTMLFormElement)) return;
  const value = new FormData(event.currentTarget).get("name");
  if (typeof value === "string") submittedName.value = value;
}
</script>

<template>
  <UIForm @submit.prevent="submit">
    <UIFormField v-slot="{ control }" label="이름">
      <UIInput v-bind="control" v-model="name" name="name" placeholder="이름을 입력하세요" />
    </UIFormField>
    <UIFormActions>
      <UIButton type="submit" size="sm">제출</UIButton>
    </UIFormActions>
    <template #output>
      <span v-if="submittedName">제출한 이름은 {{ submittedName }}입니다.</span>
    </template>
  </UIForm>
</template>
