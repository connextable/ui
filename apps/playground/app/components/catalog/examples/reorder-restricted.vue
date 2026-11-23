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
    <div class="reorder-sections">
      <UITreeReorderDropTarget v-for="column in columns" :key="column" :parentID="column" :label="column">
        <h4>{{ column }}</h4>
        <UIReorderGroup :parent-id="column" framed :min-rows="3" :interaction="interaction" :get-preview-state="getPreviewState">
          <UITreeReorderItem v-for="id in getChildren(column)" :key="id" :value="id">
            <component :is="types[id] === '문서' ? FileText : ImageIcon" aria-hidden="true" />
            {{ id }}
          </UITreeReorderItem>
          <template #preview="{ id }">
            <component :is="types[id] === '문서' ? FileText : ImageIcon" aria-hidden="true" />
            {{ id }}
          </template>
        </UIReorderGroup>
      </UITreeReorderDropTarget>
    </div>
    <UIReorderFeedback :interaction="interaction" :focus="reorder?.focus" />
  </UITreeReorder>
</template>

<style scoped>
.reorder-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 11rem), 1fr));
  gap: var(--ui-space-md);
}

.reorder-sections h4 {
  margin: 0 0 var(--ui-space-sm);
  font-size: var(--ui-font-size-body-sm);
}
</style>
