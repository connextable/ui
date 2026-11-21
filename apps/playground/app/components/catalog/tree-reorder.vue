<script setup lang="ts">
import { UIReorderFeedback, UIReorderGroup, UITreeReorder, UITreeReorderItem } from "@connextable/ui";
import { ref } from "vue";

const nodes = ref<readonly { id: string; parentID: string | null }[]>([
  { id: "디자인", parentID: null },
  { id: "토큰", parentID: "디자인" },
  { id: "테마", parentID: "토큰" },
  { id: "컴포넌트", parentID: "디자인" },
  { id: "개발", parentID: null },
]);

</script>

<template>
  <UITreeReorder v-model:nodes="nodes" label="프로젝트 구성" keyboard-mode="preview"
    v-slot="{ nodes: currentNodes, interaction, getPreviewState }">
    <UIReorderGroup framed :tree-nodes="currentNodes" :interaction="interaction" :get-preview-state="getPreviewState">
      <template #default="{ items }">
        <UITreeReorderItem v-for="{ id, level } in items" :key="id" :value="id">
          <span data-ui-reorder-indent :style="{ '--ui-reorder-depth': level - 1 }">{{ id }}</span>
        </UITreeReorderItem>
      </template>
      <template #preview="{ id, level }">
        <span data-ui-reorder-indent :style="{ '--ui-reorder-depth': level - 1 }">{{ id }}</span>
      </template>
    </UIReorderGroup>
    <UIReorderFeedback :interaction="interaction" />
  </UITreeReorder>
</template>
