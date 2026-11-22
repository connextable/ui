<script setup lang="ts">
import { UIButton, UIForm, UIFormActions, UIFormField, UIRadioGroup } from "@connextable/ui";
import { ref } from "vue";

const options = [
  { value: "compact", label: "간결하게" },
  { value: "comfortable", label: "여유 있게" },
];
const submitted = ref("");

function submit(formData: FormData) {
  submitted.value = String(formData.get("density") ?? "");
}

const selected = ref("compact");
</script>

<template>
  <UIForm @submit="({ formData }) => submit(formData)">
    <UIFormField name="density">
      <UIRadioGroup label="화면 밀도" :options="options" v-model="selected" />
    </UIFormField>
    <UIFormActions>
      <UIButton type="submit" size="sm">제출</UIButton>
    </UIFormActions>
    <template #output>
      <span v-if="submitted">제출한 값 {{ submitted }}</span>
    </template>
  </UIForm>
</template>
