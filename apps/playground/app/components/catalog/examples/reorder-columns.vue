<script setup lang="ts">
import { UIReorderFeedback, UIReorderGroup, UITreeReorder, UITreeReorderDropTarget, UITreeReorderItem } from "@connextable/ui";
import { ref, useTemplateRef } from "vue";

const columns = ["할 일", "진행 중", "완료"];
const reorder = useTemplateRef("reorder");
const nodes = ref<readonly { id: string; parentID: string | null }[]>([
  ...columns.map((id) => ({ id, parentID: null })),
  { id: "배포 공지 작성", parentID: "할 일" },
  { id: "도움말 업데이트", parentID: "할 일" },
  { id: "결제 흐름 점검", parentID: "진행 중" },
]);
</script>

<template>
  <UITreeReorder ref="reorder" v-model:nodes="nodes" layout="columns" label="배포 준비 보드" keyboard-mode="preview" v-slot="{ getChildren, interaction, getPreviewState }">
    <div class="reorder-board">
      <UITreeReorderDropTarget v-for="column in columns" :key="column" :parentID="column" :label="column" class="reorder-board__lane">
        <header class="reorder-board__heading">
          <strong>{{ column }}</strong>
          <span class="reorder-board__count">{{ getChildren(column).length }}건</span>
        </header>
        <UIReorderGroup class="reorder-board__cards" :parent-id="column" framed :interaction="interaction" :get-preview-state="getPreviewState">
          <UITreeReorderItem v-for="id in getChildren(column)" :key="id" :value="id">
            {{ id }}
          </UITreeReorderItem>
        </UIReorderGroup>
      </UITreeReorderDropTarget>
    </div>
    <UIReorderFeedback :interaction="interaction" :focus="reorder?.focus" />
  </UITreeReorder>
</template>

<style scoped src="./reorder-board.css" />
