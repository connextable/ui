<script setup lang="ts">
import { UIReorderFeedback, UIReorderGridItem, UIReorderGroup, UITreeReorder } from "@connextable/ui";
import { ref } from "vue";

const photos: Record<string, string> = {
  "연분홍 꽃잎": "/lightbox/pink-flower.jpg",
  "보랏빛 꽃 무리": "/lightbox/purple-flowers.jpg",
  "꽃에 내려앉은 벌": "/lightbox/bees.jpg",
  "꽃봉오리": "/lightbox/flower-poster.jpg",
};
const nodes = ref<readonly { id: string; parentID: string | null }[]>([
  { id: "album", parentID: null },
  ...Object.keys(photos).map((id) => ({ id, parentID: "album" })),
]);
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UITreeReorder
      v-model:nodes="nodes"
      layout="columns"
      label="봄꽃 앨범 사진 순서"
      keyboard-mode="preview"
      v-slot="{ getChildren, interaction, getPreviewState }"
    >
      <UIReorderGroup parent-id="album" layout="grid" framed :interaction="interaction" :get-preview-state="getPreviewState">
        <UIReorderGridItem
          v-for="id in getChildren('album')"
          :key="id"
          :value="id"
          :items="getChildren('album')"
          parent-id="album"
          :pointer-source-id="interaction.input === 'pointer' ? interaction.sourceID : null"
        >
          <figure class="reorder-photo">
            <img :src="photos[id]" alt="" draggable="false" loading="lazy" decoding="async" />
            <figcaption>{{ id }}</figcaption>
          </figure>
        </UIReorderGridItem>
        <template #preview="{ id }">
          <figure class="reorder-photo">
            <img :src="photos[id]" alt="" draggable="false" loading="lazy" decoding="async" />
            <figcaption>{{ id }}</figcaption>
          </figure>
        </template>
      </UIReorderGroup>
      <UIReorderFeedback :interaction="interaction">
        <template #lift="{ id }">
          <figure class="reorder-photo">
            <img :src="photos[id]" alt="" draggable="false" loading="lazy" decoding="async" />
            <figcaption>{{ id }}</figcaption>
          </figure>
        </template>
      </UIReorderFeedback>
    </UITreeReorder>
    <template #footer>
      <output>앨범 대표 사진 <strong>{{ nodes.find(node => node.parentID === "album")?.id }}</strong></output>
    </template>
  </PlaygroundExample>
</template>

<style scoped>
.reorder-photo {
  display: grid;
  align-self: start;
  gap: var(--ui-space-xs);
  inline-size: 100%;
  min-inline-size: 0;
  margin: 0;
}

.reorder-photo img {
  display: block;
  inline-size: 100%;
  aspect-ratio: 4 / 3;
  border-radius: var(--ui-radius-sm);
  object-fit: cover;
}

.reorder-photo figcaption {
  font-size: var(--ui-font-size-body-sm);
}
</style>
