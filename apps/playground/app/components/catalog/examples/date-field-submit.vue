<script setup lang="ts">
import { UIForm, UIFormField, UIFormActions, UIFormSubmit, UIDateField } from "@connextable/ui";
import { ref } from "vue";

const submitted = ref("");

const selectedDate = ref({ year: 2026, month: 8, day: 22 });
</script>

<template>
  <UIForm @submit="({ formData }) => { submitted = String(formData.get('date') ?? '') }">
    <UIFormField label="업데이트 날짜" name="date" required>
      <UIDateField v-model="selectedDate" />
    </UIFormField>
    <UIFormActions><UIFormSubmit>제출</UIFormSubmit></UIFormActions>
    <template #output>{{ submitted }}</template>
  </UIForm>
</template>
