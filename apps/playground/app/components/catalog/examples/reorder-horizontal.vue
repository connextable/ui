<script setup lang="ts">
import { UIReorderFeedback, UIReorderGroup, UISequenceReorder, UISequenceReorderItem } from "@connextable/ui";
import { ref } from "vue";

const tabs = ref<readonly string[]>(["개요", "최근 활동", "첨부 파일", "버전 기록"]);
</script>

<template>
  <UISequenceReorder
    v-model:items="tabs"
    label="탭 표시 순서"
    orientation="horizontal"
    keyboard-mode="preview"
    v-slot="{ interaction, getPreviewState }"
  >
    <UIReorderGroup as="ul" layout="horizontal" framed :min-rows="1" :interaction="interaction" :get-preview-state="getPreviewState">
      <UISequenceReorderItem v-for="tab in tabs" :key="tab" :value="tab" as="li">
        {{ tab }}
      </UISequenceReorderItem>
    </UIReorderGroup>
    <UIReorderFeedback :interaction="interaction" />
  </UISequenceReorder>
</template>
