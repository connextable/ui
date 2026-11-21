<script setup lang="ts">
import {
  UIContextMenu,
  UIContextMenuContent,
  UIContextMenuItem,
  UIContextMenuSeparator,
  UIContextMenuTrigger,
} from "@connextable/ui";

const commands = [
  { id: "edit", parentID: null },
  { id: "copy", parentID: null },
  { id: "download", parentID: null },
];
</script>

<template>
  <UIContextMenu :items="commands">
    <UIContextMenuTrigger as="div" tabindex="0">검토 문서</UIContextMenuTrigger>
    <UIContextMenuContent>
      <UIContextMenuItem value="edit">이름 보기</UIContextMenuItem>
      <UIContextMenuItem value="copy">복제</UIContextMenuItem>
      <UIContextMenuSeparator />
      <UIContextMenuItem value="download">다운로드</UIContextMenuItem>
    </UIContextMenuContent>
  </UIContextMenu>
</template>
