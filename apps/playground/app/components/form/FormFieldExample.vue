<script setup lang="ts">
import { UIForm, UIFormField, UIInput } from "@connextable/ui";
import { ref } from "vue";

const name = ref("");
</script>

<template>
  <UIForm @submit="() => undefined">
    <UIFormField name="name" label="표시 이름" description="다른 사용자에게 표시되는 이름입니다.">
      <UIInput v-model="name" />
    </UIFormField>
  </UIForm>
</template>
