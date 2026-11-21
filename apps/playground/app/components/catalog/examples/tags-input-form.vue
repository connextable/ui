<script setup lang="ts">
import { UIButton, UIForm, UIFormActions, UIFormField, UITagsInput } from "@connextable/ui";
import { ref } from "vue";

const submitted = ref("");

function submit({ formData }: { formData: FormData }) {
  submitted.value = formData.getAll("topics").join(" · ");
}
</script>

<template>
  <UIForm @submit="submit">
    <UIFormField label="문서 주제" name="topics" label-mode="labelledby" v-slot="{ labelId, describedBy }">
      <UITagsInput :default-value="['프로젝트', '회의']" :aria-labelledby="labelId" :aria-describedby="describedBy" />
    </UIFormField>
    <UIFormActions>
      <UIButton type="reset" size="sm" variant="outline">초기화</UIButton>
      <UIButton type="submit" size="sm">제출</UIButton>
    </UIFormActions>
    <template #output>{{ submitted }}</template>
  </UIForm>
</template>
