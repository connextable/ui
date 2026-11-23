<script setup lang="ts">
import { UIReorderFeedback, UIReorderGroup, UITreeReorder, UITreeReorderItem } from "@connextable/ui";
import { LockKeyhole } from "@lucide/vue";
import { ref } from "vue";

const parentID = "페이지";
const locked = "시스템 블록";
const nodes = ref<readonly { id: string; parentID: string | null }[]>([
  { id: parentID, parentID: null },
  ...[locked, "소개", "자주 묻는 질문"].map((id) => ({ id, parentID })),
]);
</script>

<template>
  <UITreeReorder
    v-model:nodes="nodes" layout="columns" label="이동 권한이 있는 페이지 영역"
    keyboard-mode="preview" v-slot="{ getChildren, interaction, getPreviewState }"
  >
    <UIReorderGroup :parent-id="parentID" framed :interaction="interaction" :get-preview-state="getPreviewState">
      <UITreeReorderItem
        v-for="id in getChildren(parentID)"
        :key="id"
        :value="id"
        :disabled="id === locked"
      >
        {{ id }}
        <LockKeyhole v-if="id === locked" aria-hidden="true" />
      </UITreeReorderItem>
      <template #preview="{ id }">
        {{ id }}
        <LockKeyhole v-if="id === locked" aria-hidden="true" />
      </template>
    </UIReorderGroup>
    <UIReorderFeedback :interaction="interaction" />
  </UITreeReorder>
</template>
