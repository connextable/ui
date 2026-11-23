<script setup lang="ts">
import {
  UICheckbox, UIReorderFeedback, UIReorderGroup, UITreeReorder,
  UITreeReorderDropTarget, UITreeReorderHandle, UITreeReorderItem,
} from "@connextable/ui";
import { GripVertical } from "@lucide/vue";
import { ref, useTemplateRef } from "vue";

const columns = ["할 일", "진행 중", "완료"];
const reorder = useTemplateRef("reorder");
const selected = ref<readonly string[]>([]);
const nodes = ref<readonly { id: string; parentID: string | null }[]>([
  ...columns.map((id) => ({ id, parentID: null })),
  { id: "배포 공지 작성", parentID: "할 일" },
  { id: "도움말 업데이트", parentID: "할 일" },
  { id: "결제 흐름 점검", parentID: "진행 중" },
]);
</script>

<template>
  <UITreeReorder
    ref="reorder"
    v-model:nodes="nodes"
    v-model:selected="selected"
    multiple
    handle-only
    layout="columns"
    label="배포 준비 보드"
    v-slot="{ getChildren, interaction, getPreviewState }"
  >
    <div class="reorder-board">
      <UITreeReorderDropTarget v-for="column in columns" :key="column" :parentID="column" :label="column" class="reorder-board__lane">
        <header class="reorder-board__heading">
          <strong>{{ column }}</strong>
          <span class="reorder-board__count">{{ getChildren(column).length }}건</span>
        </header>
        <UIReorderGroup class="reorder-board__cards" :parent-id="column" framed :interaction="interaction" :get-preview-state="getPreviewState">
          <UITreeReorderItem v-for="id in getChildren(column)" :key="id" :value="id" v-slot="item">
            <UITreeReorderHandle :label="`${id} 이동`"><GripVertical aria-hidden="true" /></UITreeReorderHandle>
            <UICheckbox
              size="sm"
              :label="id"
              :model-value="item.selected"
              :disabled="!item.selectable"
              @update:model-value="item.toggleSelected"
            />
          </UITreeReorderItem>
          <template #preview-handle><GripVertical aria-hidden="true" /></template>
          <template #preview="{ id }">
            <UICheckbox size="sm" :label="id" :model-value="selected.includes(id)" />
          </template>
        </UIReorderGroup>
      </UITreeReorderDropTarget>
    </div>
    <UIReorderFeedback :interaction="interaction" :focus="reorder?.focus">
      <template #lift-handle><GripVertical aria-hidden="true" /></template>
    </UIReorderFeedback>
  </UITreeReorder>
</template>

<style scoped src="./reorder-board.css" />
