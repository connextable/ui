<script setup lang="ts">
import { UIButton, UIForm, UIFormActions, UIFormField, UIInput } from "@connextable/ui";
import { ref } from "vue";

const name = ref("");
const submitted = ref(false);
</script>

<template>
  <UIForm @submit.prevent="submitted = true">
    <UIFormField v-slot="{ control }" label="이름" description="제출할 이름을 입력하세요.">
      <UIInput v-bind="control" v-model="name" required />
    </UIFormField>
    <UIFormActions>
      <UIButton type="submit" size="sm">제출</UIButton>
    </UIFormActions>
    <template #output>
      {{ submitted ? "제출했습니다." : "" }}
    </template>
  </UIForm>
</template>
