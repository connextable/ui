<script setup lang="ts">
import { UIButton, UIForm, UIFormActions } from "@connextable/ui";
import { ref } from "vue";

const submitted = ref(false);
</script>

<template>
  <UIForm @submit="() => { submitted = true }">
    <UIFormActions>
      <UIButton type="submit" size="sm">제출</UIButton>
    </UIFormActions>
    <template #output>
      {{ submitted ? "제출했습니다." : "" }}
    </template>
  </UIForm>
</template>
