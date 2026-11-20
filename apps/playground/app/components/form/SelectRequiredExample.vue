<script setup lang="ts">
import { UIButton, UIForm, UIFormActions, UISelect } from "@connextable/ui";
import { ref } from "vue";

const options = [
  { value: "ko", label: "한국어" },
  { value: "en", label: "English" },
];
const language = ref<string | null>(null);
const submitted = ref(false);
</script>

<template>
  <UIForm @submit.prevent="submitted = true">
    <UISelect v-model="language" :options="options" label="언어" placeholder="언어를 선택하세요" required />
    <UIFormActions>
      <UIButton type="submit" size="sm">제출</UIButton>
    </UIFormActions>
    <template #output>
      {{ submitted ? "제출했습니다." : "" }}
    </template>
  </UIForm>
</template>
