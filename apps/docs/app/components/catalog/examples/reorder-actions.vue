<script setup lang="ts">
import { UIButton, UIReorderFeedback, UIReorderGroup, UISelect, UITreeReorder, UITreeReorderItem } from "@connextable/ui";
import { ArrowDown, ArrowUp } from "@lucide/vue";
import { computed, ref, useTemplateRef } from "vue";

const reorder = useTemplateRef("reorder");
const nodes = ref<readonly { id: string; parentID: string | null }[]>([
  { id: "블록", parentID: null },
  { id: "제목", parentID: "블록" },
  { id: "레이아웃", parentID: "블록" },
  { id: "메모", parentID: "블록" },
]);
const options = ["제목", "레이아웃", "메모"].map((value) => ({ value, label: value }));
const selected = ref<string | null>("레이아웃");
const order = computed(() => nodes.value.filter(({ parentID }) => parentID === "블록").map(({ id }) => id));
const index = computed(() => order.value.findIndex((id) => id === selected.value));
const status = ref("");

function move(offset: -1 | 1) {
  const id = selected.value;
  const destination = index.value + offset;
  if (id === null || destination < 0 || destination >= order.value.length) return;

  const beforeID = order.value[offset < 0 ? destination : destination + 1] ?? null;
  if (reorder.value?.move(id, { parentID: "블록", beforeID })) {
    status.value = `${id} 블록이 ${destination + 1}번 위치로 이동했습니다.`;
  }
}
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <div class="reorder-actions">
      <div class="reorder-actions__controls">
        <UISelect v-model="selected" :options="options" aria-label="이동할 블록" size="sm" />
        <UIButton size="sm" variant="outline" :disabled="index <= 0" @click="move(-1)">
          <template #leading><ArrowUp /></template>
          위로
        </UIButton>
        <UIButton size="sm" variant="outline" :disabled="index < 0 || index >= order.length - 1" @click="move(1)">
          <template #leading><ArrowDown /></template>
          아래로
        </UIButton>
      </div>
      <UITreeReorder ref="reorder" v-model:nodes="nodes" layout="columns" label="문서 블록 순서" keyboard-mode="preview" v-slot="{ interaction, getPreviewState }">
        <UIReorderGroup parent-id="블록" framed :interaction="interaction" :get-preview-state="getPreviewState">
          <UITreeReorderItem v-for="id in order" :key="id" :value="id">
            {{ id }}
          </UITreeReorderItem>
        </UIReorderGroup>
        <UIReorderFeedback :interaction="interaction" />
      </UITreeReorder>
    </div>
    <template #footer>
      <output class="reorder-actions__status">{{ status }}</output>
    </template>
  </PlaygroundExample>
</template>

<style scoped>
.reorder-actions {
  display: grid;
  gap: var(--ui-space-sm);
}

.reorder-actions__controls {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ui-space-sm);
}

.reorder-actions__status {
  min-block-size: 1.5em;
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-body-sm);
}
</style>
