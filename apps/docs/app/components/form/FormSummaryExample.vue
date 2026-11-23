<script setup lang="ts">
import { UIForm, UIFormActions, UIFormSubmit, UIFormSummary } from "@connextable/ui";
</script>

<template>
  <UIForm @submit="() => ({ ok: false, failure: { message: '잠시 후 다시 시도해 주세요.' } })">
    <UIFormSummary />
    <UIFormActions>
      <UIFormSubmit size="sm">제출</UIFormSubmit>
    </UIFormActions>
  </UIForm>
</template>
