<script setup lang="ts">
import { UIButton, UIForm, UIFormActions, UIFormField, UIInput } from "@connextable/ui";
import { ref, useId } from "vue";

const formId = useId();
const name = ref("민지");
const submitted = ref("");
</script>

<template>
  <div class="example">
    <UIForm :id="formId" @submit="() => { submitted = name }">
      <UIFormField label="표시 이름">
        <UIInput v-model="name" />
      </UIFormField>
    </UIForm>
    <UIFormActions>
      <UIButton type="submit" :form="formId" size="sm">저장</UIButton>
    </UIFormActions>
    <output>{{ submitted ? `저장한 이름 ${submitted}` : "" }}</output>
  </div>
</template>

<style scoped>
.example {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--ui-space-md);
  inline-size: min(100%, 26rem);
}

.example output {
  min-block-size: 1lh;
  overflow-wrap: anywhere;
}
</style>
