<script setup lang="ts">
import {
  UICheckboxGroup,
  UICheckboxGroupItem,
  UICheckboxGroupIndicator,
  UIForm,
  UIFormActions,
  UIFormField,
  UIFormSubmit,
} from "@connextable/ui";
import { Check } from "@lucide/vue";
import { array, minLength, object, optional, pipe, string, transform, union } from "valibot";
import { ref } from "vue";

const channels = ["메일", "문자", "앱"];
const submitted = ref("");

const schema = object({
  channels: pipe(
    optional(union([string(), array(string())]), []),
    transform(value => typeof value === "string" ? [value] : value),
    minLength(1, "알림 채널을 하나 이상 선택하세요."),
  ),
});
</script>

<template>
  <UIForm :schema="schema" @submit="({ values }) => { submitted = values.channels.join(', ') }">
    <UIFormField name="channels" label="알림 채널">
      <UICheckboxGroup :items="channels">
        <UICheckboxGroupItem v-for="item in channels" :key="item" :value="item">
          <UICheckboxGroupIndicator><Check aria-hidden="true" /></UICheckboxGroupIndicator>
          {{ item }}
        </UICheckboxGroupItem>
      </UICheckboxGroup>
    </UIFormField>
    <UIFormActions><UIFormSubmit>제출</UIFormSubmit></UIFormActions>
    <template #output="{ submission }">
      <span v-if="submission.status === 'succeeded'">제출한 채널 {{ submitted }}</span>
    </template>
  </UIForm>
</template>
