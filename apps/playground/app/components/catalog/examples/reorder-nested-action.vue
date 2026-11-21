<script setup lang="ts">
import { UIButton, UIReorderFeedback, UIReorderGroup, UISequenceReorder, UISequenceReorderItem } from "@connextable/ui";
import { Star } from "@lucide/vue";
import { ref } from "vue";

const favorites = ref<string[]>([]);
const items = ref<readonly string[]>(["기획", "디자인", "개발"]);
</script>

<template>
  <UISequenceReorder v-model:items="items" label="작업 순서" keyboard-mode="preview" v-slot="{ interaction, getPreviewState }">
    <UIReorderGroup as="ul" framed :interaction="interaction" :get-preview-state="getPreviewState">
      <UISequenceReorderItem v-for="item in items" :key="item" :value="item" as="li" :aria-label="item">
        <span>{{ item }}</span>
        <UIButton class="favorite" size="sm" variant="ghost" icon-only
          :aria-label="`${item} 즐겨찾기`" :aria-pressed="favorites.includes(item)"
          @click="favorites = favorites.includes(item) ? favorites.filter((id) => id !== item) : [...favorites, item]">
          <template #leading><Star :fill="favorites.includes(item) ? 'currentColor' : 'none'" aria-hidden="true" /></template>
        </UIButton>
      </UISequenceReorderItem>
      <template #preview="{ id }">
        <span>{{ id }}</span>
        <UIButton class="favorite" size="sm" variant="ghost" icon-only :aria-pressed="favorites.includes(id)">
          <template #leading><Star :fill="favorites.includes(id) ? 'currentColor' : 'none'" aria-hidden="true" /></template>
        </UIButton>
      </template>
    </UIReorderGroup>
    <UIReorderFeedback :interaction="interaction" />
  </UISequenceReorder>
</template>

<style scoped>
.favorite {
  flex: none;
  margin-inline-start: auto;
}

.favorite[aria-pressed="true"] {
  color: var(--ui-color-accent);
}
</style>
