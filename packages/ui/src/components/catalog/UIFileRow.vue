<script setup lang="ts">
import { FileText } from "@lucide/vue";
import { onMounted, ref, watchEffect } from "vue";

const props = defineProps<{ file: File; preview?: boolean }>();
const mounted = ref(false);
const image = ref("");
const size = new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 1 });

onMounted(() => { mounted.value = true; });
watchEffect((onCleanup) => {
  const file = props.file;
  if (!mounted.value || !props.preview || !file.type.startsWith("image/")) return;
  const url = URL.createObjectURL(file);
  image.value = url;
  onCleanup(() => {
    URL.revokeObjectURL(url);
    image.value = "";
  });
});

function formatSize(bytes: number) {
  if (bytes < 1024) return `${size.format(bytes)} B`;
  if (bytes < 1024 ** 2) return `${size.format(bytes / 1024)} KB`;
  return `${size.format(bytes / 1024 ** 2)} MB`;
}
</script>

<template>
  <div class="ui-file-row" :data-pickable="$slots.picker ? '' : undefined">
    <span class="ui-file-row__preview" aria-hidden="true">
      <img v-if="image" :src="image" alt="" @error="image = ''">
      <FileText v-else :size="18" />
    </span>
    <div class="ui-file-row__body">
      <div class="ui-file-row__details">
        <strong :title="file.name"><slot name="name">{{ file.name }}</slot></strong>
        <small>{{ formatSize(file.size) }}</small>
      </div>
      <slot />
    </div>
    <div v-if="$slots.actions || $slots.picker" class="ui-file-row__actions">
      <div v-if="$slots.picker" class="ui-file-row__picker"><slot name="picker" /></div>
      <slot name="actions" />
    </div>
  </div>
</template>

<style scoped>
.ui-file-row {
  --ui-file-row-padding: var(--ui-space-sm);
  --ui-file-row-radius: var(--ui-radius-lg);
  --ui-file-row-inner-radius: calc(var(--ui-file-row-radius) - var(--ui-file-row-padding) - 1px);
  box-sizing: border-box;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--ui-space-sm);
  min-inline-size: 0;
  padding: var(--ui-file-row-padding);
  border: 1px solid var(--ui-color-border);
  border-radius: var(--ui-file-row-radius);
  background: var(--ui-color-surface);
}

.ui-file-row[data-pickable] {
  position: relative;
  transition: background-color var(--ui-motion-fast) var(--ui-ease-out);
}

.ui-file-row:has(.ui-file-row__picker button:enabled:hover) {
  background: var(--ui-color-surface-hover);
}

.ui-file-row:has(.ui-file-row__picker button:enabled:active) {
  background: var(--ui-color-surface-active);
}

.ui-file-row:has(.ui-file-row__picker button:focus-visible) {
  outline: var(--ui-focus-ring-width) solid var(--ui-color-focus);
  outline-offset: var(--ui-focus-ring-offset);
}

.ui-file-row__preview {
  display: grid;
  place-items: center;
  inline-size: var(--ui-control-height-small);
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: var(--ui-file-row-inner-radius);
  color: var(--ui-color-accent);
  background: var(--ui-color-accent-soft);
}

.ui-file-row__preview img {
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
}

.ui-file-row__body {
  display: grid;
  gap: var(--ui-space-xs);
  min-inline-size: 0;
}

.ui-file-row__details {
  display: grid;
  min-inline-size: 0;
  line-height: 1.4;
}

.ui-file-row__details strong {
  min-inline-size: 0;
  color: var(--ui-color-text);
  font-size: var(--ui-font-size-body-sm);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ui-file-row__details small {
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-metadata);
  font-variant-numeric: tabular-nums;
}

.ui-file-row__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  gap: var(--ui-space-xs);
}

.ui-file-row__picker :deep(button) {
  position: static;
  --ui-button-hover: transparent;
  --ui-button-pressed: transparent;
}

.ui-file-row__picker :deep(button:focus-visible) {
  outline: none;
}

.ui-file-row__picker :deep(button)::after {
  position: absolute;
  inset: 0;
  border-radius: var(--ui-file-row-radius);
  content: "";
}

.ui-file-row[data-pickable] .ui-file-row__actions > :deep(button) {
  position: relative;
  z-index: 1;
}

.ui-file-row__actions :deep(.ui-button[data-ui-control-shape="square"]) {
  border-radius: var(--ui-file-row-inner-radius);
}
</style>
