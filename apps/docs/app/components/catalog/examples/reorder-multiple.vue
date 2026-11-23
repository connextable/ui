<script setup lang="ts">
import {
  UICheckbox, UIReorderFeedback, UIReorderGroup,
  UISequenceReorder, UISequenceReorderHandle, UISequenceReorderItem,
} from "@connextable/ui";
import { GripVertical } from "@lucide/vue";
import { ref } from "vue";

const items = ref<readonly string[]>(["제품 소개", "배송 안내", "이용 방법", "반품 안내"]);
const selected = ref<readonly string[]>([]);
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UISequenceReorder
      v-model:items="items"
      v-model:selected="selected"
      multiple
      handle-only
      label="상품 상세 페이지 섹션"
      v-slot="{ interaction, getPreviewState }"
    >
      <UIReorderGroup as="ol" framed :interaction="interaction" :get-preview-state="getPreviewState">
        <UISequenceReorderItem v-for="id in items" :key="id" :value="id" as="li" v-slot="item">
          <UISequenceReorderHandle :label="`${id} 이동`"><GripVertical aria-hidden="true" /></UISequenceReorderHandle>
          <UICheckbox
            size="sm"
            :label="id"
            :model-value="item.selected"
            :disabled="!item.selectable"
            @update:model-value="item.toggleSelected"
          />
        </UISequenceReorderItem>
        <template #preview-handle><GripVertical aria-hidden="true" /></template>
        <template #preview="{ id }">
          <UICheckbox size="sm" :label="id" :model-value="selected.includes(id)" />
        </template>
      </UIReorderGroup>
      <UIReorderFeedback :interaction="interaction">
        <template #lift-handle><GripVertical aria-hidden="true" /></template>
      </UIReorderFeedback>
    </UISequenceReorder>
    <template #footer>
      <output>선택한 섹션 {{ selected.length }}개</output>
    </template>
  </PlaygroundExample>
</template>
