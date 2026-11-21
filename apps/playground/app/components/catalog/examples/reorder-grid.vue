<script setup lang="ts">
import { UIReorderFeedback, UIReorderGridItem, UIReorderGroup, UITreeReorder } from "@connextable/ui";
import { ref } from "vue";

const nodes = ref<readonly { id: string; parentID: string | null }[]>([
  { id: "cards", parentID: null },
  ...["색상", "타이포그래피", "여백", "모서리", "애니메이션", "아이콘"].map((id) => ({ id, parentID: "cards" })),
]);
</script>

<template>
  <UITreeReorder
    v-model:nodes="nodes"
    layout="columns"
    label="토큰 그리드 정렬"
    keyboard-mode="preview"
    v-slot="{ getChildren, interaction, getPreviewState }"
  >
    <UIReorderGroup parent-id="cards" layout="grid" framed :interaction="interaction" :get-preview-state="getPreviewState">
      <UIReorderGridItem
        v-for="id in getChildren('cards')"
        :key="id"
        :value="id"
        :items="getChildren('cards')"
        parent-id="cards"
        :pointer-source-id="interaction.input === 'pointer' ? interaction.sourceID : null"
      >
        {{ id }}
      </UIReorderGridItem>
    </UIReorderGroup>
    <UIReorderFeedback :interaction="interaction" />
  </UITreeReorder>
</template>
