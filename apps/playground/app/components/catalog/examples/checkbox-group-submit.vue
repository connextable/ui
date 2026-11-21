<script setup lang="ts">
import { UICheckboxGroup, UICheckboxGroupItem, UICheckboxGroupIndicator, UIForm, UIFormActions, UIFormField, UIFormSubmit } from "@connextable/ui";
import { Check } from "@lucide/vue";
import { ref } from "vue";

const channels = ["메일", "문자", "앱"];
const result = ref<string[]>([]);
</script>

<template>
  <UIForm @submit="({ formData }) => { result = formData.getAll('channels').map(String) }">
    <UIFormField label="알림 채널" name="channels">
      <UICheckboxGroup :items="channels">
        <UICheckboxGroupItem v-for="channel in channels" :key="channel" :value="channel">
          <UICheckboxGroupIndicator><Check :size="16" aria-hidden="true" /></UICheckboxGroupIndicator>
          {{ channel }}
        </UICheckboxGroupItem>
      </UICheckboxGroup>
    </UIFormField>
    <UIFormActions><UIFormSubmit>제출</UIFormSubmit></UIFormActions>
    <template #output>{{ result.join(", ") }}</template>
  </UIForm>
</template>
