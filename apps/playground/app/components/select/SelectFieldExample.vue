<script setup lang="ts">
import { UIForm, UIFormField, UISelect } from "@connextable/ui";
import { ref } from "vue";

const languages = [
  { value: "ko", label: "한국어" },
  { value: "en", label: "영어" },
];
const language = ref<string | null>("ko");
</script>

<template>
  <UIForm>
    <UIFormField name="language" label="표시 언어" description="미리보기에 사용할 언어를 선택하세요.">
      <UISelect v-model="language" :options="languages" />
    </UIFormField>
  </UIForm>
</template>
