<script setup lang="ts">
import {
  UIContextMenu,
  UIContextMenuContent,
  UIContextMenuItem,
  UIContextMenuTrigger,
} from "@connextable/ui";
import { ref } from "vue";

const items = [{ id: "rename", parentID: null }, { id: "duplicate", parentID: null }];
const labels: Record<string, string> = { rename: "이름 변경", duplicate: "복제" };
const selected = ref("");
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UIContextMenu :items="items" @invoke="selected = $event">
      <UIContextMenuTrigger as="div" tabindex="0" aria-keyshortcuts="Shift+F10">키보드 메뉴 대상</UIContextMenuTrigger>
      <UIContextMenuContent>
        <UIContextMenuItem v-for="{ id } in items" :key="id" :value="id">
          {{ labels[id] }}
        </UIContextMenuItem>
      </UIContextMenuContent>
    </UIContextMenu>
    <template #footer v-if="selected">
      <output>{{ labels[selected] }}</output>
    </template>
  </PlaygroundExample>
</template>
