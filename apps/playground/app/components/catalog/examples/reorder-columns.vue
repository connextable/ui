<script setup lang="ts">
import { UIReorderFeedback, UIReorderGroup, UITreeReorder, UITreeReorderDropTarget, UITreeReorderItem } from "@connextable/ui";
import { ref, useTemplateRef } from "vue";

const columns = ["할 일", "진행 중", "완료"];
const reorder = useTemplateRef("reorder");
const nodes = ref<readonly { id: string; parentID: string | null }[]>([
  ...columns.map((id) => ({ id, parentID: null })),
  { id: "키보드 이동 점검", parentID: "할 일" },
  { id: "다크 모드 확인", parentID: "할 일" },
  { id: "스위치 상태 검토", parentID: "진행 중" },
]);
</script>

<template>
  <UITreeReorder ref="reorder" v-model:nodes="nodes" layout="columns" label="작업 보드" keyboard-mode="preview" v-slot="{ getChildren, interaction, getPreviewState }">
    <div class="reorder-columns">
      <UITreeReorderDropTarget v-for="column in columns" :key="column" :parentID="column" :label="column">
        <h4>{{ column }}</h4>
        <UIReorderGroup :parent-id="column" framed :min-rows="3" :interaction="interaction" :get-preview-state="getPreviewState">
          <UITreeReorderItem v-for="id in getChildren(column)" :key="id" :value="id">
            {{ id }}
          </UITreeReorderItem>
        </UIReorderGroup>
      </UITreeReorderDropTarget>
    </div>
    <UIReorderFeedback :interaction="interaction" :focus="reorder?.focus" />
  </UITreeReorder>
</template>

<style scoped>
.reorder-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 11rem), 1fr));
  gap: var(--ui-space-md);
}

.reorder-columns h4 {
  margin: 0 0 var(--ui-space-sm);
  font-size: var(--ui-font-size-body-sm);
}
</style>
