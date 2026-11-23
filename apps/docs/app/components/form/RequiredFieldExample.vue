<script setup lang="ts">
import { UIButton, UIForm, UIFormActions, UIFormField, UISelect } from "@connextable/ui";
import { ref } from "vue";

const options = [
  { value: "ko", label: "한국어" },
  { value: "en", label: "영어" },
];
const language = ref<string | null>(null);
const submitted = ref(false);
</script>

<template>
  <UIForm @submit="() => { submitted = true }">
    <UIFormField label="언어" name="language" required>
      <UISelect v-model="language" :options="options" placeholder="언어를 선택하세요" />
    </UIFormField>
    <UIFormActions>
      <UIButton type="submit" size="sm">제출</UIButton>
    </UIFormActions>
    <template #output>
      {{ submitted ? "제출했습니다." : "" }}
    </template>
  </UIForm>
</template>
