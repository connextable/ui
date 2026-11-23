<script setup lang="ts">
import { useId } from "vue";

defineProps<{ label: string }>();
const labelId = useId();
</script>

<template>
  <div class="playground-example-control">
    <span :id="labelId">{{ label }}</span>
    <slot :label-id="labelId" />
  </div>
</template>

<style scoped>
.playground-example-control {
  display: inline-flex;
  align-items: center;
  gap: var(--ui-space-xs);
  min-inline-size: 0;
  max-inline-size: 100%;
}

.playground-example-control > span {
  flex: none;
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-metadata);
  font-weight: 600;
}

.playground-example-control :deep(.ui-input) {
  inline-size: min(12rem, 100%);
  min-inline-size: 0;
}
</style>
