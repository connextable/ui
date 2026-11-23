<script setup lang="ts">
import { UIButton, UIForm, UIFormActions, UIFormField, UINumberField } from "@connextable/ui";
import { ref } from "vue";

const result = ref("");
const value = ref<string | null>(null);
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UIForm @submit="({ values }) => { result = String(values.quantity ?? '') }">
      <UIFormField label="수량" name="quantity" required>
        <UINumberField v-model="value" unit="개" />
      </UIFormField>
      <UIFormActions><UIButton type="submit" size="sm">제출</UIButton></UIFormActions>
    </UIForm>
    <template #footer><output>제출값 · {{ result || "제출 전" }}</output></template>
  </PlaygroundExample>
</template>
