<script setup lang="ts">
import { UIReorderFeedback, UIReorderGroup, UITreeReorder, UITreeReorderHandle, UITreeReorderItem } from "@connextable/ui";
import { GripVertical } from "@lucide/vue";
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
  <UITreeReorder v-model:nodes="nodes" label="프로젝트 구성" handle-only keyboard-mode="preview"
    v-slot="{ nodes: currentNodes, interaction, getPreviewState }">
    <UIReorderGroup framed :tree-nodes="currentNodes" :interaction="interaction" :get-preview-state="getPreviewState">
      <template #default="{ items }">
        <UITreeReorderItem v-for="{ id, level } in items" :key="id" :value="id">
          <UITreeReorderHandle :label="`${id} 이동`"><GripVertical aria-hidden="true" /></UITreeReorderHandle>
          <span data-ui-reorder-indent :style="{ '--ui-reorder-depth': level - 1 }">{{ id }}</span>
        </UITreeReorderItem>
      </template>
      <template #preview-handle><GripVertical /></template>
      <template #preview="{ id, level }">
        <span data-ui-reorder-indent :style="{ '--ui-reorder-depth': level - 1 }">{{ id }}</span>
      </template>
    </UIReorderGroup>
    <UIReorderFeedback :interaction="interaction">
      <template #lift-handle><GripVertical /></template>
    </UIReorderFeedback>
  </UITreeReorder>
</template>
