<script setup lang="ts">
import { UIButton, UIForm, UIFormActions, UIRadioGroup } from "@connextable/ui";
import { ref } from "vue";

const options = [
  { value: "compact", label: "간결하게" },
  { value: "comfortable", label: "여유 있게" },
];
const submitted = ref("");

function submit(event: SubmitEvent) {
  if (!(event.currentTarget instanceof HTMLFormElement)) return;
  submitted.value = String(new FormData(event.currentTarget).get("density") ?? "");
}
</script>

<template>
  <UIForm @submit.prevent="submit">
    <UIRadioGroup label="화면 밀도" name="density" :options="options" default-value="compact" />
    <UIFormActions>
      <UIButton type="submit" size="sm">제출</UIButton>
    </UIFormActions>
    <template #output>
      <span v-if="submitted">제출한 값 {{ submitted }}</span>
    </template>
  </UIForm>
</template>
