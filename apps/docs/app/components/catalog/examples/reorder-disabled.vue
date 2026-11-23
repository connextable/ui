<script setup lang="ts">
import { UIButton, UIReorderFeedback, UIReorderGroup, UISequenceReorder, UISequenceReorderItem } from "@connextable/ui";
import { ref } from "vue";

const locked = ref(true);
const steps = ref<readonly string[]>(["준비", "검토", "승인"]);
</script>

<template>
  <div class="lock-example">
    <UIButton size="sm" variant="outline" :aria-pressed="locked" @click="locked = !locked">순서 잠금</UIButton>
    <UISequenceReorder v-model:items="steps" :disabled="locked" label="검토 절차" keyboard-mode="preview"
      v-slot="{ interaction, getPreviewState }">
      <UIReorderGroup framed as="ol" :interaction="interaction" :get-preview-state="getPreviewState">
        <UISequenceReorderItem v-for="step in steps" :key="step" :value="step" as="li">{{ step }}</UISequenceReorderItem>
      </UIReorderGroup>
      <UIReorderFeedback :interaction="interaction" />
    </UISequenceReorder>
  </div>
</template>

<style scoped>
.lock-example {
  display: grid;
  gap: var(--ui-space-md);
}

.lock-example > button {
  justify-self: start;
}
</style>
