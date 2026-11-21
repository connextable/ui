<script setup lang="ts">
import { Pencil } from "@lucide/vue";
import { nextTick } from "vue";
import UIButton from "../button/UIButton.vue";

const emit = defineEmits<{ click: [event: MouseEvent] }>();

async function activate(event: MouseEvent) {
  const cell = (event.currentTarget as HTMLButtonElement).closest("[data-part='cell']");
  emit("click", event);
  await nextTick();
  cell?.querySelector<HTMLElement>("[data-part='editor']:not([hidden])")?.focus();
}
</script>

<template>
  <UIButton
    variant="ghost"
    size="sm"
    class="ui-tabular-edit-trigger"
    @click="activate"
    @keydown.enter.stop
    @keydown.space.stop
  >
    <slot />
    <template #trailing><Pencil /></template>
  </UIButton>
</template>

<style scoped>
.ui-tabular-edit-trigger {
  margin-block: calc((1em * var(--ui-line-height-body) - var(--ui-control-size-height)) / 2);
  color: inherit;
  font-weight: inherit;
  text-align: start;
}

.ui-tabular-edit-trigger :deep(.ui-button__icon) {
  color: var(--ui-color-text-muted);
}
</style>
