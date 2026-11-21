<script setup lang="ts">
import { UIReorderFeedback, UIReorderGroup, UITreeReorder, UITreeReorderItem } from "@connextable/ui";
import { ref } from "vue";

const nodes = ref<readonly { id: string; parentID: string | null }[]>([
  { id: "디자인", parentID: null },
  { id: "공통 스타일", parentID: "디자인" },
  { id: "색상", parentID: "공통 스타일" },
  { id: "아이콘", parentID: "디자인" },
]);

</script>

<template>
  <div>
    <UITreeReorder v-model:nodes="nodes" label="디자인 파일 트리" keyboard-mode="preview"
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
    <output>색상의 현재 폴더 {{ nodes.find(node => node.id === '색상')?.parentID ?? "최상위" }}</output>
  </div>
</template>
