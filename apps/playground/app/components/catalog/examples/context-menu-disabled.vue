<script setup lang="ts">
import { UIContextMenu, UIContextMenuContent, UIContextMenuItem, UIContextMenuTrigger } from "@connextable/ui";
import { ref } from "vue";

const commands = [
  { id: "copy", parentID: null },
  { id: "delete", parentID: null },
];
const copied = ref(false);
</script>

<template>
  <div>
    <UIContextMenu :items="commands" :disabled-items="['delete']" @invoke="id => { copied = id === 'copy' }">
      <UIContextMenuTrigger as="div" tabindex="0">삭제가 잠긴 문서</UIContextMenuTrigger>
      <UIContextMenuContent>
        <UIContextMenuItem value="copy">복제</UIContextMenuItem>
        <UIContextMenuItem value="delete">삭제</UIContextMenuItem>
      </UIContextMenuContent>
    </UIContextMenu>
    <output v-if="copied">문서를 복제했습니다.</output>
  </div>
</template>
