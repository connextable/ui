<script setup lang="ts">
import { UIButton, UIReorderFeedback, UIReorderGroup, UISequenceReorder, UISequenceReorderHandle, UISequenceReorderItem } from "@connextable/ui";
import { GripVertical } from "@lucide/vue";
import { ref } from "vue";

const descriptions: Record<string, string> = {
  "주요 소식": "최근 변경 사항을 확인합니다.",
  "활동 요약": "이번 주 활동을 확인합니다.",
  "내 작업": "배정된 작업을 확인합니다.",
};
const items = ref<readonly string[]>(Object.keys(descriptions));
</script>

<template>
  <UISequenceReorder v-model:items="items" label="위젯 순서" handle-only keyboard-mode="preview" v-slot="{ interaction, getPreviewState }">
    <UIReorderGroup as="ul" framed :interaction="interaction" :get-preview-state="getPreviewState">
      <UISequenceReorderItem v-for="id in items" :key="id" :value="id" as="li">
        <UISequenceReorderHandle as-child :label="`${id} 위젯 이동`">
          <UIButton size="sm" variant="ghost">
            <template #leading><GripVertical /></template>
            {{ id }}
          </UIButton>
        </UISequenceReorderHandle>
        <span>{{ descriptions[id] }}</span>
      </UISequenceReorderItem>
      <template #preview-handle="{ id }">
        <UIButton size="sm" variant="ghost">
          <template #leading><GripVertical /></template>
          {{ id }}
        </UIButton>
      </template>
      <template #preview="{ id }"><span>{{ descriptions[id] }}</span></template>
    </UIReorderGroup>
    <UIReorderFeedback :interaction="interaction">
      <template #lift-handle="{ id }">
        <UIButton size="sm" variant="ghost">
          <template #leading><GripVertical /></template>
          {{ id }}
        </UIButton>
      </template>
      <template #lift="{ id }"><span>{{ descriptions[id] }}</span></template>
    </UIReorderFeedback>
  </UISequenceReorder>
</template>
