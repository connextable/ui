<script setup lang="ts">
import { UIDateTimeField, UIForm, UIFormActions, UIFormField, UIFormSubmit } from "@connextable/ui";
import { ref } from "vue";

const submitted = ref("");
const initial = ref({ date: { year: 2026, month: 8, day: 22 }, time: { hour: 13, minute: 30, second: 0, millisecond: 0 } });
</script>

<template>
  <UIForm @submit="({ formData }) => { submitted = String(formData.get('appointment') ?? '') }">
    <UIFormField label="약속 일시" name="appointment" required>
      <UIDateTimeField v-model="initial" precision="minute" />
    </UIFormField>
    <UIFormActions><UIFormSubmit>제출</UIFormSubmit></UIFormActions>
    <template #output>{{ submitted }}</template>
  </UIForm>
</template>
