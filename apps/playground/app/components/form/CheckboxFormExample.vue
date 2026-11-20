<script setup lang="ts">
import { UIButton, UICheckbox, UIForm, UIFormActions } from "@connextable/ui";
import { ref } from "vue";

const submitted = ref<string | null>(null);

function submit(event: SubmitEvent) {
  if (!(event.currentTarget instanceof HTMLFormElement)) return;
  const value = new FormData(event.currentTarget).get("notifications");
  submitted.value = typeof value === "string" ? value : "없음";
}
</script>

<template>
  <UIForm @submit.prevent="submit">
    <UICheckbox label="이메일 알림" name="notifications" value="email" />
    <UIFormActions>
      <UIButton type="submit" size="sm">제출</UIButton>
    </UIFormActions>
    <template #output>
      <span v-if="submitted !== null">제출한 값 {{ submitted }}</span>
    </template>
  </UIForm>
</template>
