<script setup lang="ts">
import {
  UIButton, UIContextMenu, UIContextMenuContent, UIContextMenuItem,
  UIContextMenuSeparator, UIContextMenuTrigger,
} from "@connextable/ui";
import { Copy, Globe, Pin, PinOff, X } from "@lucide/vue";
import { computed, ref } from "vue";

const initialTabs = [
  { id: 1, label: "팀 문서", pinned: false },
  { id: 2, label: "릴리스 노트", pinned: false },
  { id: 3, label: "이슈 목록", pinned: false },
];
const commands = [
  { id: "pin", parentID: null },
  { id: "duplicate", parentID: null },
  { id: "close", parentID: null },
];
const tabs = ref(initialTabs.map(tab => ({ ...tab })));
const orderedTabs = computed(() => tabs.value.toSorted((a, b) => Number(b.pinned) - Number(a.pinned)));
let nextID = 4;

function invoke(command: string, tab: typeof initialTabs[number]) {
  if (command === "pin") tab.pinned = !tab.pinned;
  if (command === "duplicate") tabs.value.push({ ...tab, id: nextID++, label: `${tab.label} 사본`, pinned: false });
  if (command === "close") tabs.value = tabs.value.filter(entry => entry.id !== tab.id);
}
</script>

<template>
  <ul class="example-tabs" aria-label="예제 문서 탭">
    <li v-for="tab in orderedTabs" :key="tab.id">
      <UIContextMenu :items="commands" :label="`${tab.label} 탭 작업`" @invoke="invoke($event, tab)">
        <UIContextMenuTrigger as="div" tabindex="0" class="example-tab" :data-pinned="tab.pinned || undefined">
          <component :is="tab.pinned ? Pin : Globe" aria-hidden="true" />
          {{ tab.label }}<span v-if="tab.pinned" class="example-tab__badge">고정됨</span>
        </UIContextMenuTrigger>
        <UIContextMenuContent>
          <UIContextMenuItem value="pin" :icon="tab.pinned ? PinOff : Pin">{{ tab.pinned ? "탭 고정 해제" : "탭 고정" }}</UIContextMenuItem>
          <UIContextMenuItem value="duplicate" :icon="Copy">탭 복제</UIContextMenuItem>
          <UIContextMenuSeparator />
          <UIContextMenuItem value="close" :icon="X">탭 닫기</UIContextMenuItem>
        </UIContextMenuContent>
      </UIContextMenu>
    </li>
  </ul>
  <UIButton v-if="!tabs.length" size="sm" variant="outline" @click="tabs = initialTabs.map(tab => ({ ...tab }))">탭 복원</UIButton>
</template>

<style scoped>
.example-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ui-space-xs);
  margin: 0;
  padding: 0;
  list-style: none;
}

.example-tab {
  display: flex;
  align-items: center;
  gap: var(--ui-space-xs);
  padding: var(--ui-space-xs) var(--ui-space-sm);
  border: 1px solid var(--ui-color-border);
  border-radius: var(--ui-radius-sm);
  background: var(--ui-color-surface);
}

.example-tab[data-pinned] {
  color: var(--ui-color-accent);
  background: var(--ui-color-accent-soft);
}

.example-tab__badge {
  font-size: var(--ui-font-size-metadata);
}
</style>
