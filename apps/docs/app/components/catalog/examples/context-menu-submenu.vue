<script setup lang="ts">
import { UIContextMenu, UIContextMenuItem, UIContextMenuSubContent, UIContextMenuContent, UIContextMenuTrigger } from "@connextable/ui";
import { CircleCheck, ClipboardList, FolderInput, PencilLine } from "@lucide/vue";
import { ref } from "vue";

const items = [
  { id: "move", parentID: null },
  { id: "todo", parentID: "move" },
  { id: "doing", parentID: "move" },
  { id: "done", parentID: "move" },
];
const columns = [
  { id: "todo", label: "할 일", icon: ClipboardList },
  { id: "doing", label: "진행 중", icon: PencilLine },
  { id: "done", label: "완료", icon: CircleCheck },
];
const selected = ref("todo");
</script>

<template>
  <div class="context-board">
    <section v-for="column in columns" :key="column.id" :aria-label="column.label">
      <strong>{{ column.label }}</strong>
      <UIContextMenu v-if="selected === column.id" :items="items" :disabled-items="[selected]" label="카드 작업" @invoke="selected = $event">
        <UIContextMenuTrigger as="div" tabindex="0" class="context-board__card">온보딩 검토</UIContextMenuTrigger>
        <UIContextMenuContent>
          <UIContextMenuItem value="move" :icon="FolderInput">다른 열로 이동</UIContextMenuItem>
          <UIContextMenuSubContent for="move">
            <UIContextMenuItem v-for="destination in columns" :key="destination.id" :value="destination.id" :icon="destination.icon">
              {{ destination.label }}
            </UIContextMenuItem>
          </UIContextMenuSubContent>
        </UIContextMenuContent>
      </UIContextMenu>
    </section>
  </div>
</template>

<style scoped>
.context-board {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--ui-space-xs);
  inline-size: min(100%, 32rem);
}

.context-board section {
  min-block-size: 6rem;
  padding: var(--ui-space-xs);
  border-radius: var(--ui-radius-sm);
  background: var(--ui-color-surface-muted);
}

.context-board strong {
  display: block;
  margin-block-end: var(--ui-space-xs);
  font-size: var(--ui-font-size-metadata);
}

.context-board__card {
  padding: var(--ui-space-xs);
  border: 1px solid var(--ui-color-border);
  border-radius: var(--ui-radius-xs);
  background: var(--ui-color-surface);
  overflow-wrap: anywhere;
}
</style>
