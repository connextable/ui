<script setup lang="ts">
import { UIReorderFeedback, UIReorderGroup, UISequenceReorder, UISequenceReorderItem, UISwitch } from "@connextable/ui";
import { computed, ref } from "vue";

const byName = ref(false);
const manualOrder = ref<readonly string[]>(["디자인", "개발", "기획"]);
const collator = new Intl.Collator("ko");
const visibleOrder = computed(() => byName.value ? [...manualOrder.value].sort(collator.compare) : manualOrder.value);
</script>

<template>
  <div class="reorder-sorted">
    <UISwitch variant="outline" v-model="byName" size="sm" label="이름순 정렬" />
    <UISequenceReorder
      :items="visibleOrder" controlled label="팀 표시 순서" :disabled="byName" keyboard-mode="preview"
      @update:items="manualOrder = $event" v-slot="{ interaction, getPreviewState }"
    >
      <UIReorderGroup as="ul" framed :interaction="interaction" :get-preview-state="getPreviewState">
        <UISequenceReorderItem v-for="id in visibleOrder" :key="id" :value="id" as="li">
          {{ id }}
        </UISequenceReorderItem>
      </UIReorderGroup>
      <UIReorderFeedback :interaction="interaction" />
    </UISequenceReorder>
  </div>
</template>

<style scoped>
.reorder-sorted {
  display: grid;
  justify-items: stretch;
  gap: var(--ui-space-sm);
}

.reorder-sorted > :first-child {
  justify-self: start;
}
</style>
