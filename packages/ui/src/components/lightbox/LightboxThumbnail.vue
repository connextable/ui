<script setup lang="ts">
import { Image, Play } from "@lucide/vue";
import { computed, ref, watch } from "vue";
import type { UILightboxItem } from "./lightbox-types";

const { item } = defineProps<{ item: UILightboxItem }>();
const source = computed(() => item.thumbnail ?? (item.kind === "image" ? item.src : item.poster));
const failed = ref(false);
watch(source, () => { failed.value = false; });
</script>

<template>
  <span class="ui-lightbox-thumbnail" aria-hidden="true">
    <img v-if="source && !failed" :src="source" alt="" loading="lazy" decoding="async" @error="failed = true" />
    <Image v-else-if="item.kind === 'image'" />
    <span v-if="item.kind === 'video'" class="ui-lightbox-thumbnail__play"><Play /></span>
  </span>
</template>

<style scoped>
.ui-lightbox-thumbnail {
  position: relative;
  display: grid;
  place-items: center;
  inline-size: 100%;
  block-size: 100%;
  overflow: hidden;
  border-radius: inherit;
  background: var(--ui-color-surface-muted);
  color: var(--ui-color-text-muted);
}

.ui-lightbox-thumbnail img {
  position: absolute;
  inset: 0;
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
}

.ui-lightbox-thumbnail__play {
  z-index: 1;
  display: grid;
  place-items: center;
  inline-size: 1.75rem;
  block-size: 1.75rem;
  border-radius: 50%;
  background: rgb(18 23 27 / 82%);
  color: #fff;
}

.ui-lightbox-thumbnail__play svg {
  inline-size: 0.875rem;
  block-size: 0.875rem;
  fill: currentColor;
}
</style>
