<script setup lang="ts">
import { UIInView } from "@connextable/ui";

const photos = [
  { src: "/lightbox/pink-flower.jpg", caption: "연분홍 꽃잎", alt: "연분홍 꽃잎이 여러 겹으로 포개진 모습" },
  { src: "/lightbox/purple-flowers.jpg", caption: "보랏빛 꽃 무리", alt: "작은 보라색 꽃들이 모여 핀 모습" },
];
</script>

<template>
  <section class="photo-story ui-scrollbar" aria-label="봄꽃 사진 모음" tabindex="0">
    <header class="photo-story__intro">
      <strong>봄꽃 가까이 보기</strong>
    </header>
    <figure v-for="photo in photos" :key="photo.src">
      <UIInView v-slot="{ hasEntered }" :threshold="0.6" once fallback as-child>
        <div class="photo-story__frame" :data-revealed="hasEntered || undefined">
          <img :src="photo.src" :alt="photo.alt" />
        </div>
      </UIInView>
      <figcaption>{{ photo.caption }}</figcaption>
    </figure>
  </section>
</template>

<style scoped>
.photo-story {
  box-sizing: border-box;
  inline-size: min(100%, 26rem);
  block-size: 16rem;
  overflow: auto;
  border: 1px solid var(--ui-color-border);
  border-radius: var(--ui-radius-md);
}

.photo-story:focus-visible {
  outline: var(--ui-focus-ring-width) solid var(--ui-color-focus);
  outline-offset: calc(-1 * var(--ui-focus-ring-width));
}

.photo-story__intro {
  box-sizing: border-box;
  display: grid;
  place-items: center;
  min-block-size: 9.5rem;
  padding: var(--ui-space-md);
  background: var(--ui-color-surface);
  text-align: center;
  font-size: 1.125rem;
}

.photo-story figure {
  margin: var(--ui-space-md);
}

.photo-story figcaption {
  margin-block-start: var(--ui-space-xs);
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-body-sm);
}

.photo-story__frame {
  aspect-ratio: 16 / 10;
  min-block-size: 10rem;
  overflow: hidden;
  border-radius: var(--ui-radius-sm);
  background: var(--ui-color-surface);
}

.photo-story__frame img {
  display: block;
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
}

@media (prefers-reduced-motion: no-preference) {
  .photo-story__frame img {
    transition:
      opacity calc(var(--ui-motion-standard) * 3) var(--ui-ease-out),
      transform calc(var(--ui-motion-standard) * 3) var(--ui-ease-out);
  }

  .photo-story__frame:not([data-revealed]) img {
    opacity: 0.2;
    transform: translateY(1rem) scale(0.96);
  }
}
</style>
