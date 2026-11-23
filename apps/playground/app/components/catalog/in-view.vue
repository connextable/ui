<script setup lang="ts">
import { UIInView } from "@connextable/ui";
import { ref, useTemplateRef } from "vue";

const viewport = useTemplateRef<HTMLElement>("viewport");
const videoSrc = "/lightbox-media/bunny-excerpt";
const showPlayer = ref(false);
</script>

<template>
  <div class="film-preview">
    <output class="film-preview__status" :data-shown="showPlayer || undefined">
      {{ showPlayer ? "플레이어 표시됨" : "플레이어 대기 중" }}
    </output>
    <article ref="viewport" class="film-preview__article ui-scrollbar" aria-label="빅 벅 버니 영상 소개" tabindex="0">
      <header class="film-preview__intro">
        <strong>빅 벅 버니</strong>
        <p>숲속에 사는 커다란 토끼 버니의 이야기입니다. Blender Foundation이 2008년에 공개한 단편 애니메이션입니다.</p>
      </header>
      <figure class="film-preview__figure">
        <UIInView :root="viewport" :threshold="0.5" once as-child @enter="showPlayer = true">
          <div class="film-preview__media">
            <video
              v-if="showPlayer"
              :src="videoSrc"
              poster="/lightbox/bunny-poster.jpg"
              aria-label="빅 벅 버니 예고편"
              preload="metadata"
              controls
              playsinline
            >
              <track kind="captions" src="/lightbox/bunny.ko.vtt" srclang="ko" label="한국어" />
            </video>
            <span v-else>예고편</span>
          </div>
        </UIInView>
        <figcaption>빅 벅 버니 예고편 일부 · © 2008 Blender Foundation · CC BY 3.0</figcaption>
      </figure>
    </article>
  </div>
</template>

<style scoped>
.film-preview {
  inline-size: min(100%, 26rem);
  overflow: hidden;
  border: 1px solid var(--ui-color-border);
  border-radius: var(--ui-radius-md);
}

.film-preview__article {
  block-size: 15rem;
  overflow: auto;
  padding-inline: var(--ui-space-md);
}

.film-preview__article:focus-visible {
  outline: var(--ui-focus-ring-width) solid var(--ui-color-focus);
  outline-offset: -2px;
}

.film-preview__intro {
  box-sizing: border-box;
  min-block-size: 12.5rem;
  padding-block: 1.5rem var(--ui-space-md);
}

.film-preview__intro strong {
  font-size: 1.25rem;
}

.film-preview__intro p {
  margin-block: var(--ui-space-sm) 0;
  color: var(--ui-color-text-muted);
}

.film-preview__figure {
  margin: 0 0 var(--ui-space-md);
}

.film-preview__media {
  display: grid;
  place-items: start center;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: var(--ui-radius-sm);
  background: var(--ui-color-surface-muted);
  color: var(--ui-color-text-muted);
}

.film-preview__media video {
  inline-size: 100%;
  block-size: 100%;
}

.film-preview__media span {
  padding-block-start: var(--ui-space-sm);
}

.film-preview__figure figcaption {
  margin-block-start: var(--ui-space-sm);
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-metadata);
}

.film-preview__status {
  display: block;
  padding: var(--ui-space-sm) var(--ui-space-md);
  border-block-end: 1px solid var(--ui-color-border);
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-body-sm);
}

.film-preview__status[data-shown] {
  background: var(--ui-color-accent-soft);
  color: var(--ui-color-accent);
  font-weight: 650;
}
</style>
