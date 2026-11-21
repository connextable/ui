<script setup lang="ts">
import { UIContextMenu, UIContextMenuItem, UIContextMenuSubContent, UIContextMenuContent, UIContextMenuTrigger } from "@connextable/ui";
import { ref } from "vue";

const items = [
  { id: "export", parentID: null },
  { id: "pdf", parentID: "export" },
  { id: "text", parentID: "export" },
];
const selected = ref("");
</script>

<template>
  <UIContextMenu :items="items" label="내보내기 명령" @invoke="selected = $event">
    <UIContextMenuTrigger as="div" tabindex="0">내보내기 영역에서 우클릭</UIContextMenuTrigger>
    <UIContextMenuContent>
      <UIContextMenuItem value="export">내보내기</UIContextMenuItem>
      <UIContextMenuSubContent for="export">
        <UIContextMenuItem value="pdf">PDF 내보내기</UIContextMenuItem>
        <UIContextMenuItem value="text">텍스트 내보내기</UIContextMenuItem>
      </UIContextMenuSubContent>
    </UIContextMenuContent>
  </UIContextMenu>
  <output v-if="selected">선택한 파일 형식 {{ selected }}</output>
</template>
