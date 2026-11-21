<script setup lang="ts">
import { useImage, type ImageSource, type ImageSnapshot } from "@sectile/vue/image";
import { useTemplateRef } from "vue";

defineOptions({ inheritAttrs: false });
const { alt, ...source } = defineProps<ImageSource & { alt: string }>();
defineSlots<{ fallback?(state: { snapshot: ImageSnapshot | undefined }): unknown }>();

const image = useTemplateRef<HTMLImageElement>("image");
const { snapshot, error } = useImage({ element: image, source: () => source });

function imageAttrs(attrs: Record<string, unknown>) {
  const { class: _class, style: _style, ...rest } = attrs;
  return rest;
}
</script>

<template>
  <span class="ui-image" :class="$attrs.class" :style="$attrs.style" :data-status="snapshot?.status">
    <img
      ref="image"
      class="ui-image__source"
      v-bind="{ ...imageAttrs($attrs), ...source }"
      :alt="alt"
      :hidden="snapshot?.status === 'error' || Boolean(error)"
    />
    <span v-if="snapshot?.status === 'error' || error" class="ui-image__fallback">
      <slot name="fallback" :snapshot="snapshot">{{ alt }}</slot>
    </span>
  </span>
</template>

<style scoped>
.ui-image {
  display: inline-grid;
  overflow: hidden;
  max-inline-size: 100%;
  border-radius: var(--ui-control-radius);
  background: var(--ui-color-surface-muted);
}

.ui-image__source {
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
}

.ui-image__fallback {
  display: grid;
  place-content: center;
  padding: var(--ui-space-md);
  color: var(--ui-color-text-muted);
}
</style>
