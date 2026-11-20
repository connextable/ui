<script setup lang="ts">
import { UIButton, UIForm, UIFormActions, UISwitch } from "@connextable/ui";
import { ref } from "vue";

const submitted = ref<boolean | null>(null);

function submit(event: SubmitEvent) {
  if (!(event.currentTarget instanceof HTMLFormElement)) return;
  submitted.value = new FormData(event.currentTarget).has("description");
}
</script>

<template>
  <UIForm @submit.prevent="submit">
    <UISwitch label="설명 표시" name="description" />
    <UIFormActions>
      <UIButton type="submit" size="sm">제출</UIButton>
    </UIFormActions>
    <template #output>
      <span v-if="submitted !== null">제출한 설정 {{ submitted ? "켜짐" : "꺼짐" }}</span>
    </template>
  </UIForm>
</template>
