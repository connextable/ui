<script setup lang="ts">
import { UICheckboxGroup, UICheckboxGroupItem, UICheckboxGroupIndicator, UIForm, UIFormActions, UIFormField, UIFormSubmit, type UIFormSubmitEvent } from "@connextable/ui";
import { Check } from "@lucide/vue";
import { ref } from "vue";

const channels = ["메일", "문자", "앱"];
const result = ref<string[]>([]);

function submit({ values }: UIFormSubmitEvent) {
  const { channels } = values;
  result.value = Array.isArray(channels) ? channels.map(String) : [channels].filter(value => typeof value === "string");
}
</script>

<template>
  <UIForm @submit="submit">
    <UIFormField label="알림 채널" name="channels">
      <UICheckboxGroup :items="channels">
        <UICheckboxGroupItem v-for="channel in channels" :key="channel" :value="channel">
          <UICheckboxGroupIndicator><Check aria-hidden="true" /></UICheckboxGroupIndicator>
          {{ channel }}
        </UICheckboxGroupItem>
      </UICheckboxGroup>
    </UIFormField>
    <UIFormActions><UIFormSubmit>제출</UIFormSubmit></UIFormActions>
    <template #output>{{ result.join(", ") }}</template>
  </UIForm>
</template>
