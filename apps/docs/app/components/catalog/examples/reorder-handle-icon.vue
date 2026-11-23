<script setup lang="ts">
import { UIReorderFeedback, UIReorderGroup, UISequenceReorder, UISequenceReorderHandle, UISequenceReorderItem } from "@connextable/ui";
import { GripVertical } from "@lucide/vue";
import { ref } from "vue";

const items = ref<readonly string[]>(["개요", "세부 정보", "변경 기록"]);
</script>

<template>
  <UISequenceReorder v-model:items="items" label="문서 섹션 순서" handle-only keyboard-mode="preview" v-slot="{ interaction, getPreviewState }">
    <UIReorderGroup as="ul" framed :interaction="interaction" :get-preview-state="getPreviewState">
      <UISequenceReorderItem v-for="id in items" :key="id" :value="id" as="li">
        <UISequenceReorderHandle :label="`${id} 이동`"><GripVertical aria-hidden="true" /></UISequenceReorderHandle>
        {{ id }}
      </UISequenceReorderItem>
      <template #preview-handle><GripVertical /></template>
    </UIReorderGroup>
    <UIReorderFeedback :interaction="interaction">
      <template #lift-handle><GripVertical /></template>
    </UIReorderFeedback>
  </UISequenceReorder>
</template>
