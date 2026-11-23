<script setup lang="ts">
import { UIReorderFeedback, UIReorderGroup, UITreeReorder, UITreeReorderDropTarget, UITreeReorderItem } from "@connextable/ui";
import { FileText, Image as ImageIcon } from "@lucide/vue";
import { ref, useTemplateRef } from "vue";

const columns = ["문서", "분류 전", "이미지"];
const reorder = useTemplateRef("reorder");
const types: Readonly<Record<string, string>> = { "스타일 가이드": "문서", "표지 그림": "이미지", "미리보기": "이미지" };
const nodes = ref<readonly { id: string; parentID: string | null }[]>([
  ...columns.map((id) => ({ id, parentID: null })),
  { id: "스타일 가이드", parentID: "분류 전" },
  { id: "표지 그림", parentID: "분류 전" },
  { id: "미리보기", parentID: "이미지" },
]);

const policies = {
  canMove: ({ id, parentID }: { id: string; parentID: string | null }) => parentID === "분류 전" || parentID === types[id],
};
</script>

<template>
  <UITreeReorder
    ref="reorder"
    v-model:nodes="nodes"
    :policies="policies"
    layout="columns"
    label="유형별 파일 분류"
    keyboard-mode="preview"
    v-slot="{ getChildren, interaction, getPreviewState }"
  >
    <div class="reorder-board">
      <UITreeReorderDropTarget v-for="column in columns" :key="column" :parentID="column" :label="column" class="reorder-board__lane">
        <header class="reorder-board__heading">
          <strong>{{ column }}</strong>
          <span class="reorder-board__count">{{ getChildren(column).length }}건</span>
        </header>
        <UIReorderGroup class="reorder-board__cards" :parent-id="column" framed :interaction="interaction" :get-preview-state="getPreviewState">
          <UITreeReorderItem v-for="id in getChildren(column)" :key="id" :value="id">
            <component :is="types[id] === '문서' ? FileText : ImageIcon" class="reorder-file-icon" aria-hidden="true" />
            {{ id }}
          </UITreeReorderItem>
          <template #preview="{ id }">
            <component :is="types[id] === '문서' ? FileText : ImageIcon" class="reorder-file-icon" aria-hidden="true" />
            {{ id }}
          </template>
        </UIReorderGroup>
      </UITreeReorderDropTarget>
    </div>
    <UIReorderFeedback :interaction="interaction" :focus="reorder?.focus">
      <template #lift="{ id }">
        <component :is="types[id] === '문서' ? FileText : ImageIcon" class="reorder-file-icon" aria-hidden="true" />
        {{ id }}
      </template>
    </UIReorderFeedback>
  </UITreeReorder>
</template>

<style scoped src="./reorder-board.css" />

<style scoped>
.reorder-file-icon {
  flex: none;
  inline-size: 1rem;
  block-size: 1rem;
  color: var(--ui-color-text-muted);
}
</style>
