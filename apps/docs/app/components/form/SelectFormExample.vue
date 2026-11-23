<script setup lang="ts">
import { UIButton, UIForm, UIFormActions, UIFormField, UIFormReset, UISelect } from "@connextable/ui";
import { ref } from "vue";

const options = [
  { value: "spacious", label: "여백 넓게" },
  { value: "standard", label: "기본" },
  { value: "compact", label: "촘촘하게" },
];
const submitted = ref("");
const initialDensity = "standard";
const density = ref<string | null>(initialDensity);
</script>

<template>
  <UIForm @submit="({ values }) => { submitted = String(values.density || '미선택') }" @reset="density = initialDensity">
    <UIFormField label="화면 밀도" name="density">
      <UISelect v-model="density" :options="options" clearable />
    </UIFormField>
    <UIFormActions>
      <UIButton type="submit" size="sm">제출</UIButton>
      <UIFormReset size="sm">초기화</UIFormReset>
    </UIFormActions>
    <template #output>
      <span v-if="submitted">제출한 값 <code>{{ submitted }}</code></span>
    </template>
  </UIForm>
</template>
