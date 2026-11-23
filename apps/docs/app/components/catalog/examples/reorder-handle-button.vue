<script setup lang="ts">
import { UIButton, UIReorderFeedback, UIReorderGroup, UISequenceReorder, UISequenceReorderHandle, UISequenceReorderItem } from "@connextable/ui";
import { ArrowDownUp } from "@lucide/vue";
import { ref } from "vue";

const items = ref<readonly string[]>(["배송", "결제", "확인"]);
</script>

<template>
  <UISequenceReorder v-model:items="items" label="안내 단계 순서" handle-only keyboard-mode="preview" v-slot="{ interaction, getPreviewState }">
    <UIReorderGroup as="ul" framed :interaction="interaction" :get-preview-state="getPreviewState">
      <UISequenceReorderItem v-for="id in items" :key="id" :value="id" as="li" :aria-label="id">
        <UISequenceReorderHandle as-child :label="`${id} 위치 이동`">
          <UIButton size="sm" variant="ghost">
            <template #leading><ArrowDownUp /></template>
            이동
          </UIButton>
        </UISequenceReorderHandle>
        {{ id }}
      </UISequenceReorderItem>
      <template #preview-handle>
        <UIButton size="sm" variant="ghost">
          <template #leading><ArrowDownUp /></template>
          이동
        </UIButton>
      </template>
    </UIReorderGroup>
    <UIReorderFeedback :interaction="interaction">
      <template #lift-handle>
        <UIButton size="sm" variant="ghost">
          <template #leading><ArrowDownUp /></template>
          이동
        </UIButton>
      </template>
    </UIReorderFeedback>
  </UISequenceReorder>
</template>
