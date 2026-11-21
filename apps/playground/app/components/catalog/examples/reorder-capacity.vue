<script setup lang="ts">
import { UIReorderFeedback, UIReorderGroup, UITreeReorder, UITreeReorderDropTarget, UITreeReorderItem } from "@connextable/ui";
import { ref, useTemplateRef } from "vue";

const lanes = ["대기", "검토 중"];
const limit = 2;
const policies = { capacity: (parentID: string | null) => parentID === "검토 중" ? limit : undefined };
const reorder = useTemplateRef("reorder");
const nodes = ref<readonly { id: string; parentID: string | null }[]>([
  ...lanes.map((id) => ({ id, parentID: null })),
  { id: "공지 초안", parentID: "대기" },
  { id: "주간 보고", parentID: "검토 중" },
  { id: "업데이트 안내", parentID: "검토 중" },
]);
</script>

<template>
  <UITreeReorder
    ref="reorder" v-model:nodes="nodes" :policies="policies" layout="columns"
    label="정원이 있는 검토 보드" keyboard-mode="preview"
    v-slot="{ getChildren, interaction, getPreviewState }"
  >
    <div class="reorder-capacity">
      <UITreeReorderDropTarget v-for="lane in lanes" :key="lane" :parentID="lane" :label="lane">
        <h4>
          {{ lane }}
          <span v-if="lane === '검토 중'" class="reorder-capacity__count">{{ getChildren(lane).length }} / {{ limit }}</span>
        </h4>
        <UIReorderGroup :parent-id="lane" :min-rows="3" framed :interaction="interaction" :get-preview-state="getPreviewState">
          <UITreeReorderItem v-for="id in getChildren(lane)" :key="id" :value="id">
            {{ id }}
          </UITreeReorderItem>
        </UIReorderGroup>
      </UITreeReorderDropTarget>
    </div>
    <UIReorderFeedback :interaction="interaction" :focus="reorder?.focus" />
  </UITreeReorder>
</template>

<style scoped>
.reorder-capacity {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 11rem), 1fr));
  gap: var(--ui-space-md);
}

.reorder-capacity h4 {
  display: flex;
  justify-content: space-between;
  margin: 0 0 var(--ui-space-sm);
  font-size: var(--ui-font-size-body-sm);
}

.reorder-capacity__count {
  color: var(--ui-color-text-muted);
  font-variant-numeric: tabular-nums;
}
</style>
