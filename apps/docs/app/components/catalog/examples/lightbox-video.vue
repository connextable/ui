<script setup lang="ts">
import { UIButton, UILightbox } from "@connextable/ui";
import { Play } from "@lucide/vue";
import { bunnyExcerpt } from "~/data/lightbox-media";
</script>

<template>
  <UILightbox :items="[bunnyExcerpt]" label="예고편 검토">
    <template #default="{ openAt }">
      <div class="lightbox-video-example">
        <img :src="bunnyExcerpt.poster" alt="" loading="lazy" />
        <div>
          <strong>빅 벅 버니</strong>
          <p>예고편 · 16초</p>
          <UIButton aria-haspopup="dialog" @click="openAt(0, $event)">
            <template #leading><Play /></template>
            예고편 열기
          </UIButton>
        </div>
      </div>
    </template>
  </UILightbox>
</template>

<style scoped>
.lightbox-video-example {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(8.5rem, 1fr);
  align-items: center;
  gap: var(--ui-space-md);
  inline-size: min(100%, 34rem);
  margin-inline: auto;
  border: 1px solid var(--ui-color-divider);
  border-radius: var(--ui-radius-lg);
  overflow: hidden;
}

.lightbox-video-example img {
  display: block;
  inline-size: 100%;
  block-size: 100%;
  min-block-size: 9rem;
  object-fit: cover;
}

.lightbox-video-example > div {
  padding: var(--ui-space-md) var(--ui-space-md) var(--ui-space-md) 0;
}

.lightbox-video-example p {
  margin: 0 0 var(--ui-space-md);
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-body-sm);
}
</style>
