<script setup lang="ts">
import { UIButton, UIForm, UIFormActions, UIFormField, UISelect } from "@connextable/ui";
import { ref } from "vue";

const options = [
  { value: "spacious", label: "여백 넓게" },
  { value: "standard", label: "기본" },
  { value: "compact", label: "촘촘하게" },
];
const density = ref<string | null>("standard");
const submitted = ref("");

function submit(formData: FormData) {
  submitted.value = String(formData.get("density") ?? "");
}
</script>

<template>
  <UIForm @submit="({ formData }) => submit(formData)">
    <UIFormField label="화면 밀도" name="density">
      <UISelect v-model="density" :options="options" />
    </UIFormField>
    <UIFormActions>
      <UIButton type="submit" size="sm">제출</UIButton>
    </UIFormActions>
    <template #output>
      <span v-if="submitted">제출한 값 <code>{{ submitted }}</code></span>
    </template>
  </UIForm>
</template>
