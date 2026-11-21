<script setup lang="ts">
import { UIReorderFeedback, UIReorderGroup, UISequenceReorder, UISequenceReorderItem } from "@connextable/ui";
import { ref } from "vue";

const items = ref<readonly string[]>(["기획", "디자인", "개발"]);
</script>

<template>
  <UISequenceReorder v-model:items="items" label="작업 순서" keyboard-mode="preview" v-slot="{ interaction, getPreviewState }">
    <UIReorderGroup as="ul" framed :interaction="interaction" :get-preview-state="getPreviewState">
      <UISequenceReorderItem v-for="item in items" :key="item" :value="item" as="li">
        {{ item }}
      </UISequenceReorderItem>
    </UIReorderGroup>
    <UIReorderFeedback :interaction="interaction" />
  </UISequenceReorder>
</template>
