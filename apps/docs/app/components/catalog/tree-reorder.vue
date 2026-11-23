<script setup lang="ts">
import { UIReorderFeedback, UIReorderGroup, UITreeReorder, UITreeReorderItem } from "@connextable/ui";
import { FileText, Folder } from "@lucide/vue";
import { ref } from "vue";

const folders = ["브랜드 자료", "이미지", "출시 자료"];
const nodes = ref<readonly { id: string; parentID: string | null }[]>([
  { id: "브랜드 자료", parentID: null },
  { id: "브랜드 가이드.pdf", parentID: "브랜드 자료" },
  { id: "이미지", parentID: "브랜드 자료" },
  { id: "대표 이미지.jpg", parentID: "이미지" },
  { id: "출시 자료", parentID: null },
  { id: "출시 체크리스트.pdf", parentID: "출시 자료" },
]);
const policies = {
  canMove: ({ parentID }: { parentID: string | null }) => parentID === null || folders.includes(parentID),
};
</script>

<template>
  <UITreeReorder
    v-model:nodes="nodes"
    :policies="policies"
    class="asset-tree"
    label="출시 자료실"
    keyboard-mode="preview"
    v-slot="{ nodes: currentNodes, interaction, getPreviewState }"
  >
    <UIReorderGroup framed :tree-nodes="currentNodes" :interaction="interaction" :get-preview-state="getPreviewState">
      <template #default="{ items }">
        <UITreeReorderItem v-for="{ id, level } in items" :key="id" :value="id">
          <span class="asset-tree__entry" data-ui-reorder-indent :style="{ '--ui-reorder-depth': level - 1 }">
            <component :is="folders.includes(id) ? Folder : FileText" aria-hidden="true" />
            {{ id }}
          </span>
        </UITreeReorderItem>
      </template>
      <template #preview="{ id, level }">
        <span class="asset-tree__entry" data-ui-reorder-indent :style="{ '--ui-reorder-depth': level - 1 }">
          <component :is="folders.includes(id) ? Folder : FileText" aria-hidden="true" />
          {{ id }}
        </span>
      </template>
    </UIReorderGroup>
    <UIReorderFeedback :interaction="interaction">
      <template #lift="{ id }">
        <span class="asset-tree__entry">
          <component :is="folders.includes(id) ? Folder : FileText" aria-hidden="true" />
          {{ id }}
        </span>
      </template>
    </UIReorderFeedback>
  </UITreeReorder>
</template>

<style scoped>
.asset-tree {
  inline-size: min(100%, 32rem);
  margin-inline: auto;
}

.asset-tree__entry {
  display: flex;
  align-items: center;
  gap: var(--ui-space-sm);
}

.asset-tree__entry > svg {
  inline-size: 1rem;
  block-size: 1rem;
  flex: none;
  color: var(--ui-color-text-muted);
}
</style>
