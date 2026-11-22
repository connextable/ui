<script setup lang="ts">
import { UIForm, UIFormActions, UIFormField, UIFormSubmit, UITimePicker, type UITimeValue } from "@connextable/ui";
import { ref } from "vue";

const time = ref<UITimeValue | null>(null);
const submitted = ref("");
</script>

<template>
  <UIForm @submit="({ formData }) => { submitted = String(formData.get('arrival') ?? '') }">
    <UIFormField name="arrival" label="도착 시간" label-mode="labelledby" required>
      <UITimePicker v-model="time" inline clearable />
    </UIFormField>
    <UIFormActions><UIFormSubmit>시간 확정</UIFormSubmit></UIFormActions>
    <template #output>{{ submitted }}</template>
  </UIForm>
</template>
