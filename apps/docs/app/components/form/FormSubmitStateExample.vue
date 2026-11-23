<script setup lang="ts">
import { UIForm, UIFormActions, UIFormSubmit } from "@connextable/ui";

async function save() {
  await new Promise<void>((resolve) => setTimeout(resolve, 900));
}
</script>

<template>
  <UIForm @submit="save">
    <UIFormActions>
      <UIFormSubmit v-slot="{ submitting }" size="sm">
        {{ submitting ? "저장 중" : "저장" }}
      </UIFormSubmit>
    </UIFormActions>
    <template #output="{ submission }">
      {{ submission.status === "succeeded" ? "저장했습니다." : "" }}
    </template>
  </UIForm>
</template>
