<script setup lang="ts">
import { UIButton, UIForm, UIFormActions, UIFormField, UITagsInput, type UIFormSubmitEvent } from "@connextable/ui";
import { ref } from "vue";

const submitted = ref("");

function submit({ values }: UIFormSubmitEvent) {
  const { topics } = values;
  submitted.value = Array.isArray(topics) ? topics.join(", ") : String(topics ?? "");
}

const initialTags = ["프로젝트", "회의"];
const tags = ref<readonly string[]>(initialTags);
</script>

<template>
  <UIForm @submit="submit" @reset="tags = initialTags">
    <UIFormField label="문서 주제" name="topics" label-mode="labelledby" v-slot="{ labelId, describedBy }">
      <UITagsInput v-model="tags" :aria-labelledby="labelId" :aria-describedby="describedBy" />
    </UIFormField>
    <UIFormActions>
      <UIButton type="reset" size="sm" variant="outline">초기화</UIButton>
      <UIButton type="submit" size="sm">제출</UIButton>
    </UIFormActions>
    <template #output>{{ submitted }}</template>
  </UIForm>
</template>
