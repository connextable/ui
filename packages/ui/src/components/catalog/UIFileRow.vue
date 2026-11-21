<script setup lang="ts">
import { FileText } from "@lucide/vue";
import { onMounted, ref, watchEffect } from "vue";

const props = defineProps<{ file?: File | null; preview?: boolean; size?: "sm" | "md" | "lg" }>();
const mounted = ref(false);
const image = ref("");
const number = new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 1 });

onMounted(() => { mounted.value = true; });
watchEffect((onCleanup) => {
  const file = props.file;
  if (!mounted.value || !props.preview || !file?.type.startsWith("image/")) return;
  const url = URL.createObjectURL(file);
  image.value = url;
  onCleanup(() => {
    URL.revokeObjectURL(url);
    image.value = "";
  });
});

function formatSize(bytes: number) {
  if (bytes < 1024) return `${number.format(bytes)} B`;
  if (bytes < 1024 ** 2) return `${number.format(bytes / 1024)} KB`;
  return `${number.format(bytes / 1024 ** 2)} MB`;
}
</script>

<template>
  <div
    class="ui-field-control ui-file-row"
    :data-ui-control-size="size ?? 'md'"
    :data-pickable="$slots.picker ? '' : undefined"
    :data-empty="!file || undefined"
  >
    <span class="ui-file-row__preview" aria-hidden="true">
      <img v-if="image" :src="image" alt="" @error="image = ''">
      <slot v-else name="icon"><FileText :size="18" /></slot>
    </span>
    <div class="ui-file-row__details">
      <strong :title="file?.name"><slot name="name">{{ file?.name ?? '파일 선택' }}</slot></strong>
      <small v-if="file">{{ formatSize(file.size) }}</small>
      <slot name="metadata" />
    </div>
    <div v-if="$slots.actions || $slots.picker" class="ui-file-row__actions">
      <slot name="actions" />
      <div v-if="$slots.picker" class="ui-file-row__picker"><slot name="picker" /></div>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.ui-file-row {
  --ui-file-row-action-size: min(var(--ui-control-height-small), calc(var(--ui-control-size-height) - 6px));
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  column-gap: var(--ui-space-sm);
  min-inline-size: 0;
  block-size: var(--ui-control-size-height);
  padding-block: 0;
  padding-inline: var(--ui-space-sm) var(--ui-space-2xs);
}

.ui-file-row:has(.ui-file-row__picker button:enabled:not([aria-disabled="true"]):hover) {
  background: var(--ui-color-surface-hover);
}

.ui-file-row:has(.ui-file-row__picker button:enabled:not([aria-disabled="true"]):active) {
  background: var(--ui-color-surface-active);
}

.ui-file-row:has(.ui-file-row__picker button:focus-visible) {
  outline: var(--ui-focus-ring-width) solid var(--ui-color-focus);
  outline-offset: var(--ui-focus-ring-offset);
}

.ui-file-row[data-disabled] {
  background: var(--ui-color-surface-muted);
}

.ui-file-row[data-disabled] .ui-file-row__details strong {
  color: var(--ui-color-disabled);
}

.ui-file-row__preview {
  display: grid;
  place-items: center;
  inline-size: calc(var(--ui-control-size-icon) + var(--ui-space-xs));
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: var(--ui-radius-sm);
  color: var(--ui-color-text-muted);
}

.ui-file-row__preview img {
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
}

.ui-file-row__details {
  display: flex;
  align-items: baseline;
  gap: var(--ui-space-sm);
  min-inline-size: 0;
}

.ui-file-row__details strong {
  min-inline-size: 0;
  color: var(--ui-color-text);
  font-weight: inherit;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ui-file-row__details small,
.ui-file-row__details :slotted(small) {
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-metadata);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.ui-file-row[data-empty] .ui-file-row__details strong {
  color: var(--ui-color-placeholder);
}

.ui-file-row__actions {
  display: flex;
  flex-wrap: nowrap;
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
  border-radius: var(--ui-control-size-radius);
  content: "";
}

.ui-file-row[data-pickable] .ui-file-row__actions > :deep(button) {
  position: relative;
  z-index: 1;
}

.ui-file-row__actions :deep(.ui-button) {
  min-block-size: 0;
  block-size: var(--ui-file-row-action-size);
  white-space: nowrap;
}

.ui-file-row__actions :deep(.ui-button[data-ui-control-shape="square"]) {
  inline-size: var(--ui-file-row-action-size);
  min-inline-size: 0;
}
</style>
