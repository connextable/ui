<script setup lang="ts">
import { UIMenu, UIMenuItem, UIMenuSeparator } from "@connextable/ui";
import { Copy, Download, Pencil } from "@lucide/vue";

const commands = [
  { id: "rename", parentID: null },
  { id: "copy", parentID: null },
  { id: "download", parentID: null },
];
</script>

<template>
  <UIMenu :items="commands" aria-label="문서 작업">
    <UIMenuItem value="rename"><Pencil :size="16" aria-hidden="true" /> 이름 바꾸기</UIMenuItem>
    <UIMenuItem value="copy"><Copy :size="16" aria-hidden="true" /> 복제</UIMenuItem>
    <UIMenuSeparator />
    <UIMenuItem value="download"><Download :size="16" aria-hidden="true" /> 다운로드</UIMenuItem>
  </UIMenu>
</template>
