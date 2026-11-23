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
    <UIMenuItem value="rename"><Pencil aria-hidden="true" /> 이름 바꾸기</UIMenuItem>
    <UIMenuItem value="copy"><Copy aria-hidden="true" /> 복제</UIMenuItem>
    <UIMenuSeparator />
    <UIMenuItem value="download"><Download aria-hidden="true" /> 다운로드</UIMenuItem>
  </UIMenu>
</template>
