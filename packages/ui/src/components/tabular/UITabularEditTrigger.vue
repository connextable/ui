<script setup lang="ts">
import { Pencil } from "@lucide/vue";
import { nextTick } from "vue";

const emit = defineEmits<{ click: [event: MouseEvent] }>();

async function activate(event: MouseEvent) {
  const cell = (event.currentTarget as HTMLButtonElement).closest("[data-part='cell']");
  emit("click", event);
  await nextTick();
  cell?.querySelector<HTMLElement>("[data-part='editor']:not([hidden])")?.focus();
}
</script>

<template>
  <button type="button" class="ui-tabular-edit-trigger" @click="activate" @keydown.enter.stop @keydown.space.stop>
    <span><slot /></span>
    <Pencil :size="14" aria-hidden="true" />
  </button>
</template>

<style scoped>
.ui-tabular-edit-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--ui-space-sm);
  max-inline-size: 100%;
  min-block-size: 1.75rem;
  margin-block: calc((1em * var(--ui-line-height-body) - 1.75rem) / 2);
  padding-inline: var(--ui-space-xs);
  border: 0;
  border-radius: var(--ui-radius-sm);
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: start;
  cursor: pointer;
  transition: background-color var(--ui-motion-fast) var(--ui-ease-out);
}

.ui-tabular-edit-trigger:hover {
  background: var(--ui-color-surface-active);
}

.ui-tabular-edit-trigger:focus-visible {
  outline: var(--ui-focus-ring-width) solid var(--ui-color-focus);
  outline-offset: var(--ui-focus-ring-offset);
}

.ui-tabular-edit-trigger > svg {
  flex: none;
  color: var(--ui-color-text-muted);
}
</style>
